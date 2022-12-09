import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import "./index.css";
import { colors } from "./colors";

const POKEMON_API = "https://pokeapi.co/api/v2/pokemon/";

const PokemonCard = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [imgUrl, setImageUrl] = useState("");
  const [color, setColor] = useState("");
  useEffect(() => {
    getPokemonDetails();
  }, []);
  const getPokemonDetails = () => {
    const id = Math.floor(Math.random() * 150) + 1;
    axios.get(POKEMON_API + id).then((response) => {
      setPokemonData(response.data);
      console.log(response.data);
      setImageUrl(response.data.sprites.other.dream_world.front_default);
      getRandomColor();
    });
  };
  const getRandomColor = () => {
    const keys = Object.keys(colors);
    const key = Math.floor(Math.random() * 16);
    setColor(colors[keys[key]]);
  };
  return (
    <>
      {pokemonData && (
        <div className="pokemon">
          <div className="pokemon-section">
            <div className="pokemon-card">
              <div
                className="circle-section"
                style={{ background: color }}
              ></div>
              <div className="pokemon-data">
                <div className="pokemon-image">
                  <img className="pokemon-img" src={imgUrl} alt="any" />
                </div>
                <p className="pokemon-name">{_.startCase(pokemonData.name)}</p>
                <div className="stats">
                  <button className="type" style={{ background: color }}>
                    {pokemonData.types[0].type.name}
                  </button>
                </div>
              </div>
              <div className="pokemon-attack">
                <div className="attack">
                  <p className="pokemon-action-type">
                    {pokemonData.stats[1].stat.name}
                  </p>
                  <p className="pokemon-action-basic-stat">
                    {pokemonData.stats[1].base_stat}
                  </p>
                </div>
                <div className="attack">
                  <p className="pokemon-action-type">
                    {pokemonData.stats[2].stat.name}
                  </p>
                  <p className="pokemon-action-basic-stat">
                    {pokemonData.stats[2].base_stat}
                  </p>
                </div>
                <div className="attack">
                  <p className="pokemon-action-type">
                    {pokemonData.stats[3].stat.name}
                  </p>
                  <p className="pokemon-action-basic-stat">
                    {pokemonData.stats[3].base_stat}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="genrate">
            <button
              className="generate-btn"
              style={{ background: color }}
              onClick={() => getPokemonDetails()}
            >
              Generate
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonCard;
