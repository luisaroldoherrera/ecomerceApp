import React, { useState } from 'react'
import {StyleSheet, View, Text, Image, KeyboardAvoidingView, Platform } from 'react-native'
import logo from "../../assets/LOGO-GSISTEC.png"
import RegisterForm from "../components/Auth/RegisterForm"
import LoginForm from "../components/Auth/LoginForm"
import {layoutStyle} from "../styles";

export default function Auth() {
    const [showLogin, setShowLogin ] = useState(false);
    const changeForm = () => setShowLogin (!showLogin);
    
    return (
        <View style = {layoutStyle.container}>
            <Image style={styles.logo} source={logo} />
            <Text >GlobalPOS</Text>
            
            <KeyboardAvoidingView behavior={Platform.OS ==="android" ? "height" : "padding"}>
                {showLogin ? (
                <LoginForm changeForm={changeForm}/>
                )
                : 
                (
                <RegisterForm changeForm={changeForm}/>
                )}           
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 50,
        resizeMode: "contain",
        marginBottom: 20,
    },
})
