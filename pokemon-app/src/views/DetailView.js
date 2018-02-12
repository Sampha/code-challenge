import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory/'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const httpLink = new HttpLink({ uri: 'https://graphql-pokemon.now.sh/' });

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export default class DetailView extends React.Component {
  constructor(props) {
   super(props);
   this.state = { pokemon: [] };
  }

  fetchPokemon() {
    client.query({ query: gql`
      query{
        pokemon(id:"${this.props.location.state.pokemon}") {
      		name
          image
          weight {
            minimum
            maximum
          }
          evolutions {
            id
            name
            image
          }
          evolutionRequirements {
            amount
            name
          }
        }
      }
    ` }).then(data => {
      this.setState({pokemon: data.data.pokemon});
    });
  };

    render() {
      if(this.state.pokemon.name){
        return (
            <div>
                <h1>{this.state.pokemon.name}</h1>
                <img src={this.state.pokemon.image}></img>
                <p>Minimum weight: {this.state.pokemon.weight.minimum},
                 maximum weight: {this.state.pokemon.weight.maximum}</p>
            </div>
        );
      } else {
        this.fetchPokemon();
        return(
          <div>
            <h1>Pokemon</h1>
            <p>'Loading'</p>
          </div>
      );
      }
    }
}
