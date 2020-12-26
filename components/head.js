import Link from 'next/link'
import { useAppContext } from '../context/appContext';
import {useSpring, animated} from 'react-spring'
import { useState } from 'react';

const PageHeader = () => {
    
    const {pokeballs, userLogOut, user} = useAppContext()
    const [showMobile, setMobile] = useState(false)


   const initAnimation = useSpring({ 
        from: { opacity: 0, }, 
        to: {opacity: showMobile ? 1:0, margin: showMobile ? 0: -1500}, 
        config: { duration: 400 } })



   function showMobileMenu () {
       setMobile(!showMobile)
   }     



    return ( 
        <div className="pageHeader">
             <div className="logoName">PokeCatcher</div>
              <div className="pokeballsContainer">
              <div className="mypokeball"> 
                  <h4>Available Pokeballs</h4>
                 
                 
                   {pokeballs.map((ball, i)=>{
                       return (
                          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png" width="40px" key={i}></img>
                       
                       )
 
                   })}
                   </div>
              </div>
             <div className="navigation">
                  <Link href="/">Home</Link>
                  <Link href="/my-pokemons">My Pokemons</Link>
                  <div className="headlinks" onClick={userLogOut}>Logout</div>
              </div>


             <div className="mobileMenu" onClick={showMobileMenu}>
                 <div className="menuBar1"></div>
                 <div className="menuBar1"></div>
                 <div className="menuBar2"></div>
             </div>

              <animated.div style={initAnimation} className="MobileNavigation">
                  <Link href="/">Home</Link>
                  <Link href="/my-pokemons">My Pokemons</Link>
                  <div className="headlinks" onClick={userLogOut}>Logout</div>
              </animated.div>              

             {!user ? '' : 
              <div className="userWelcome">
                  Welcome: {user.email}
              </div>
              }
        </div>
     );
}
 
export default PageHeader;