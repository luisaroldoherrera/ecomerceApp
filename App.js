//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo } from 'react';
import {Text } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import AuthScreen from "./src/screens/Auth";
import AuthContext from "./src/context/AuthContext";
import { setTokenApi , getTokenApi} from "./src/api/token";


export default function App() {
  const [auth, setAuth] = useState(undefined);
  
  useEffect( () => {
    (async()=>{
      const token = await getTokenApi();
      if(token){
        console.log("Estoy logueado")
        console.log(token);
        // setAuth("hola")
      }else{
        setAuth(null);
      }
    })();
  }, [] );

  const login = (user) => {
     // console.log(user);
    //almacenamos los datos del usuario en nuestro localstorage
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user._id,
    });
  };

  /*
  Use memo, lo que hace es que compara el dato que recibe, si es igual ovia si no entonces cambia el dato
  */
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => null,
    }),
    /** Cuando queremos comparar esos datos? cuando se actualicen. Eso hace [auth] */
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
        {auth ? <Text> Zona de usuarios </Text> : <AuthScreen/>}      
      </PaperProvider>
    </AuthContext.Provider>    
  );
}


