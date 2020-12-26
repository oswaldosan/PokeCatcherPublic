import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { useAppContext } from '../context/appContext';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"
  import { useDisclosure } from "@chakra-ui/react"


const PokeCard = (props) => {
    const {pokeballs, setPokeballs, user, usrPokemon,setUsrpokemon, writeUserData, removePokemon} = useAppContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
 
    let actualBalls = pokeballs.length

    function catchpokemon () {
       let actualBalls = pokeballs.length
          if(actualBalls === 0) {
              alert('Ya no tienes pokebolas, espera a Mañana para recargar o compra en nuestra Tienda por tan solo 0.5 usd cada pokeball')
          } else {
            const MyNewPokemon = {
               theName: props.name,
               type: props.type,
               image: props.image
            }       
   
           
             setUsrpokemon((usrPokemon) => [...usrPokemon, MyNewPokemon])
             setPokeballs(pokeballs.filter((e)=>(e !== `${actualBalls}`)))
             onOpen()
             writeUserData(MyNewPokemon) 
          }
     }

     function removePOke () {
          removePokemon(props.name)
     }


    return ( 
        <div className="pokeCard">
            <div className={props.type + ' pokeHeader'}>
               {props.i} - {props.name}
            </div>
            <div className="thePoekmonBackground">
            <Image src={props.image} width={250} height={200} layout="responsive"></Image>
            </div>

            <div className="cardBody">

            <h1>{props.name}</h1>

            <p>type: {props.type}</p>
             {props.catch ? 
              <div className="catchButton" onClick={catchpokemon}>Catch Now!</div> :
              <div className="freepoke" onClick={removePOke}>Free Pokemon</div>
            }
            </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Felicidades!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="themodal">
            <h1> Felicidades! </h1>
               <img src={props.image} width="50px"></img>
              <p>atrapaste un {props.name}</p> 
              <p>lo hemos agregado a la lista de tus pokemons</p>
              <strong>te quedan {actualBalls} Pokeballs</strong>

            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
         
          </ModalFooter>
        </ModalContent>
      </Modal>

       </div>
     );
}
 
export default PokeCard;