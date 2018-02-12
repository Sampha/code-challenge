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

export default class ListView extends React.Component {
  constructor(props) {
   super(props);
   this.state = { pokemon: [] };
  }

  fetchAllPokemon() {
    client.query({ query: gql`
    query{
      pokemons(first:151) {
        id
        name
        image
        attacks{
          special{
            name
            type
          }
        }
        types
        evolutions {
          id
          name
        }
      }
    }
    ` }).then(data => {
      this.setState({pokemon: data.data.pokemons.map(f => {
        return <li>
                  <p>{f.name}</p>
                  <img src={f.image}></img>
                  <Link to={{
                    pathname: `/pokemon/${f.id}`,
                    state: {pokemon: f.id}
                   }}>Details</Link>
                </li>;
      })});
    });
  };

    render() {
      if(this.state.pokemon.length > 0){
        return (
            <div>
                <h1>Pokemon</h1>
                <ul>
                  {this.state.pokemon}
                </ul>
            </div>
        );
      } else {
        this.fetchAllPokemon();
        return(
          <div>
            <h1>Pokemon</h1>
            <p>'Loading'</p>
          </div>
      );
      }
    }
}
