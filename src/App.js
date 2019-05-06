import React, { Component } from "react";

import "./App.css";

import logo from "./images/logo.png";

function CharacterCard(props) {
  const { character } = props;

  return (
    <div
      className="CharacterCard"
      style={{ backgroundImage: `url(${character.image})` }}
    >
      <div className="CharacterCard__name-container text-truncate">
        {character.name}
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPage: 1,
      loading: true,
      error: null,
      data: {
        results: []
      }
    };
  }

  componentDidMount() {
    console.log("componentDidMount()");
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${this.state.nextPage}`
      );
      const data = await response.json();

      this.setState({
        loading: false,
        error: null,
        nextPage: this.state.nextPage + 1,
        data: {
          ...this,
          results: [].concat(this.state.data.results, data.results)
        }
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  componentDidUpdate() {
    console.log("componentDidUpdate()");
  }
  render() {
    console.log("render()");

    if (this.state.error) {
      return `Error: ${this.state.error.message}`;
    }

    return (
      <div className="container">
        <div className="App">
          <img className="Logo" src={logo} alt="Rick y Morty" />

          <ul className="row">
            {this.state.data.results.map(character => (
              <li className="col-6 col-md-3" key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>

          {this.state.loading && (
            <div className="loader">
              {this.state.loading && <p className="text-center">Loading...</p>}
            </div>
          )}

          {!this.state.loading && (
            <button onClick={() => this.fetchCharacters()}>Load More</button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
