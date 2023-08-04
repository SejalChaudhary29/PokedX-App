import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonLists.css';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function downloadpokemons() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const pokemonResults = response.data.results;
    const pokemonresultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const PokemonData = await axios.all(pokemonresultPromise);
    console.log(PokemonData);
    const res =(PokemonData.map((pokeData) =>{
      const pokemon = pokeData.data;
      return { name: pokemon.name ,
         image: (pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
          types: pokemon.types}
    }));
    console.log(res)
    setPokemonList(res)
    setIsLoading(false);
  }

  useEffect(() => {
    downloadpokemons();
  }, []);

  return (
    <div className='pokemon-list-wrapper'>
      <div>PokemonList</div>
      {isLoading ? 'loadingggg' : 'Data downloaded'}
    </div>
  );
}

export default PokemonList;
