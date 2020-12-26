import Head from 'next/head'
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useAppContext } from '../context/appContext';
import Loader from '../components/loader'
import PokeCard from '../components/pokemonCard'
import PageHeader from '../components/head'
import NotAuth from '../auth/notAuth'

export default function Home() {

  const {pokemonsInfo, setPokeinfo, user, mainLoad} = useAppContext();
  const [pokemons, setPokemons] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
     axios.get('https://pokeapi.co/api/v2/pokemon?limit=150').then(resp => {
     setPokemons(resp.data.results) 
     
    });
  
  }, []);
  
 useEffect(() => {
  pokemons.map((pokemon, i)=> {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(resp => {
       const newPokemon = {
         theName: pokemon.name,
         types: resp.data.types,
         image: resp.data.sprites.other.dream_world.front_default, 
      }
        setPokeinfo((pokemonsInfo) => [...pokemonsInfo, newPokemon])
        setLoading(false)
        
    }) 
  })

 }, [pokemons]);

 const handleChange = e => setSearchTerm(e.target.value);

 useEffect(() => {
   const results = pokemonsInfo.filter(o => o.theName.includes(searchTerm));
   setSearchResults(results);

 }, [searchTerm]);

  
  return (
    <>
 
      <Head>
        <title>Pokemon Catcher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
 {mainLoad ? <Loader></Loader> : 
  <div className="main">    
   {!user ? <NotAuth/> : 
    <div className="wholeApp">

      <PageHeader></PageHeader>

    <div className="inputSearch">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="search"
      />
     </div> 
   
   
   {isLoading ? <Loader/> : 
    <div className="container">
    <div className="pokeGrid">    
    
   {searchTerm === '' ? 
      pokemonsInfo.map((pokemon, i)=>{ 
          return (
            <PokeCard i={i} name={pokemon.theName} image={pokemon.image} type={pokemon.types[0].type.name} catch={true} key={i}></PokeCard>
                )
               }) :   
      searchResults && searchResults.map((pokemon, i)=>{ 
        return (
             <PokeCard i={i} name={pokemon.theName} image={pokemon.image} type={pokemon.types[0].type.name} catch={true} key={i}></PokeCard>
        )
       }) }
        
    </div>   
        
          
    </div>}

    </div> }
    
    </div> }
    </>
  )
}
