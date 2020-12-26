import Link from 'next/link'

const NotAuth = () => {
    return ( 
        <div className="notAuth">
           <div className="authNotif">
            <h1>Not authorized to view this app</h1>
            <p>But dont worry, try creating a new account on out register page. <br/> and start catching Pokemons</p>
            <Link href="/login">Register Now</Link>
            </div> 
        </div>
     );
}
 
export default NotAuth;