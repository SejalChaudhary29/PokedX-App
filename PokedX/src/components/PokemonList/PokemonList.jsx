import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonLists.css';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const [pokedexUrl , setpokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
const [nextUrl , setNextUrl]= useState('')
const [prevUrl , setPrevUrl]= useState('')



  async function downloadpokemons() {
    setIsLoading(true);
    const response = await axios.get(pokedexUrl);
    const pokemonResults = response.data.results;
    console.log(response.data)
    setNextUrl(response.data.next)
    setPrevUrl(response.data.previous)
    const pokemonresultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const PokemonData = await axios.all(pokemonresultPromise);
    console.log(PokemonData);
    const res =(PokemonData.map((pokeData) =>{
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,        
        name: pokemon.name ,
         image: (pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
          types: pokemon.types}
    }));
    console.log(res)
    setPokemonList(res)
    setIsLoading(false);
  }

  useEffect(() => {
   
    downloadpokemons();
  }, [pokedexUrl]);

  return (
    <div className='pokemon-list-wrapper'>
    
      <div className='pokemon-wrapper'>
        {isLoading ? 'loadingggg' : pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
        </div>
        <div className='controlls'>
          <button disabled= {prevUrl== null} onClick={() => setpokedexUrl(prevUrl)} >Prev</button>
          <button disabled= {nextUrl== null} onClick={() => setpokedexUrl(nextUrl)}>Next</button>
        </div>
    </div>
  );
}

export default PokemonList;
