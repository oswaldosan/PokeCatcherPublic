import Head from 'next/head'
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useAppContext } from '../context/appContext';
import Loader from '../components/loader'
import PokeCard from '../components/pokemonCard'
import PageHeader from '../components/head'
import NotAuth from '../auth/notAuth'

import firebaseClient from "../auth/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function Mypokes() {
  const {user, mainLoad, dbPokemons, setDbpokemons, remove} = useAppContext();
  const [pokemons, setPokemons] = useState([])
  const [isLoading, setLoading] = useState(true)
    
  useEffect(() => {
    const db = firebase.firestore();
    db.collection(user.email).doc('MyPokemons').collection('all').get().then(function(querySnapshot) {
       const array = querySnapshot.docs.map(doc => doc.data());
       setPokemons(array)
       setLoading(false)
    });
}, [remove]);

let totalPokemons = pokemons.length 

console.log(totalPokemons)
 
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

    <br/><br/>
    <h1 className="totalpokemons">Tienes un total de: {totalPokemons} Pokemons</h1>
   {isLoading ? <Loader/> : 
    <div className="container">
    <div className="pokeGrid">    
    
    {pokemons.map((pokemon, i)=>{ 
          return (
            <PokeCard i={i} name={pokemon.theName} image={pokemon.image} type={pokemon.type} key={i} catch={false}></PokeCard>
                )
               }) }        
    </div>   
         
          
    </div>}

    </div> }
    
    </div> }
    </>
  )
}

