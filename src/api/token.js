import AsyncStorage from "@react-native-async-storage/async-storage";
import {TOKEN} from "../utils/constants";


export async function setTokenApi(token) {
    try {
        /**La llave token la manejaremos desde el archivo constantes.js, import {TOKEN} from "../utils/constants";, para no equivocarnos */
        await AsyncStorage.setItem(TOKEN, token);
        return true;
    } catch (error) {
        return null;
    }
} 

export async function getTokenApi(){
    try {
        const token = await AsyncStorage.getItem(TOKEN);
        return token;
    } catch (error) {
        return null;
    }
}