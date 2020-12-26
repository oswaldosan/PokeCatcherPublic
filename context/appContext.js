import React, { useContext, createContext, useState, useEffect } from 'react';
import nookies from "nookies";
import firebaseClient from "../auth/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//Context
export const AppContext = createContext(null);

//Provider
export const AppContextProvider = ({ children }) => {

  firebaseClient();
   const [user, setUser] = useState(null);
   const [pokemonsInfo, setPokeinfo] = useState([])
   const [pokeballs, setPokeballs] = useState(['1','2','3','4','5'])
   const [mainLoad, setMainLoad] = useState(true)
   const [usrPokemon, setUsrpokemon] = useState([])
   const [dbPokemons, setDbpokemons] = useState({})
   const [remove, setRemove] = useState(false)
 
   function userLogOut() {
    firebase.auth().signOut().then(function() {
    console.log('user Logged out')
    window.location.href = "/login";
    setUser(null)
    }).catch(function(error) {
    console.log(error)
   });
  }

   function writeUserData(MyNewPokemon) {          
       const pokemonName = MyNewPokemon.theName
       const db = firebase.firestore();
        // Add a new document in collection "cities"
        db.collection(user.email).doc('MyPokemons').collection('all').doc(pokemonName).set(MyNewPokemon)
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
       }
  
   function removePokemon(pokemonName) {
    const db = firebase.firestore();  
        db.collection(user.email).doc('MyPokemons').collection('all').doc(pokemonName).delete().then(function() {
          console.log("Document successfully deleted!");
          setRemove(true)
          setRemove(false)
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });

   } 
       
   useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      console.log("auth changed");
      setMainLoad(false)
     
       if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {});
        setMainLoad(false)
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, "token", token, {});
      const db = firebase.firestore();
      db.collection(user.email).doc('MyPokemons').collection('all').get().then(function(querySnapshot) {
         const array = querySnapshot.docs.map(doc => doc.data());
         setDbpokemons(array)
    });
    });
  }, [user]);
  

  const values = React.useMemo(() => (
    { mainLoad,
      user,      // States que seran visibles en el contexto.
      setUser,
      pokemonsInfo,
      setPokeinfo,
      pokeballs, 
      setPokeballs,
      userLogOut,
      setUsrpokemon,
      usrPokemon,
      writeUserData,
      dbPokemons, 
      setDbpokemons,
      removePokemon,
      remove
      // Funciones que son exportadas para manejo externo.
    }), 
    [ 
        user, pokemonsInfo, pokeballs, mainLoad, dbPokemons, remove ]);   // States que serán visibles en el contexto.

  // Interface donde será expuesto como proveedor y envolverá la App.
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

//
export function useAppContext() {
  const context = useContext(AppContext);

  if(!context){
    console.error('Error deploying App Context!!!');
  }

  return context;
}

export default useAppContext;