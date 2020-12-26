import { AppContextProvider } from "../context/appContext";
import { AuthProvider } from "../auth/auth";
import { ChakraProvider } from "@chakra-ui/react"
import '../style/global.css'


function MyApp({ Component, pageProps }) {


    return (
     <ChakraProvider>
   
       <AppContextProvider>
          <Component {...pageProps} /> 
       </AppContextProvider>
    
    </ChakraProvider>
       )
  }

  
  export default MyApp