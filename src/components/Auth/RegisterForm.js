import React , {useState}  from 'react';
import { View}                      from 'react-native';
import { useField, useFormik}       from "formik";
import { TextInput, Button }        from "react-native-paper";
import * as Yup                     from "yup"; 
import Toast from "react-native-root-toast"
import {registerApi} from "../../api/user.js"
import {formStyle}                  from "../../styles"

export default function RegisterForm(props) {
    const { changeForm } = props; 
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),

        onSubmit: async (formData) => {
            // console.log("ok");
            setLoading(true);
           try {
               await registerApi(formData);
               changeForm();
            //    console.log("Ok");
           } catch (error) {
            //    console.log("error");
                setLoading(false);
               Toast.show("Error al registrar el usuario"),{
                   position: Toast.positions.CENTER,
               }
           }
        }
    })

    return (
        <View>
         
           <TextInput 
            label="Usuario" 
            style={formStyle.input}
            onChangeText={(text) => formik.setFieldValue("username", text)}
            value={formik.values.username}
            error={formik.errors.username}
            />
           <TextInput 
           label="Email" 
           style={formStyle.input}
           onChangeText={(text) => formik.setFieldValue("email", text)}
           value={formik.values.email}
           error={formik.errors.email}
           />
           <TextInput 
           label="Contraseña" 
           style={formStyle.input} 
           secureTextEntry
           onChangeText={(text) => formik.setFieldValue("password", text)}
           value={formik.values.password}
           error={formik.errors.password}
           />
           <TextInput 
           label="Repetir Contraseña" 
           style={formStyle.input} 
           secureTextEntry
           onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
           value={formik.values.repeatPassword}
           error={formik.errors.repeatPassword}
           />
           <Button 
            mode="contained" 
            style={formStyle.btnSucces} 
            onPress={formik.handleSubmit}
            loading={loading}
            >
               Registrese
            </Button>
           <Button mode="text" style={formStyle.btnText} labelStyle={formStyle.btnTextLabel} onPress={changeForm}>Iniciar sesión</Button>
        </View>
    );
}


function initialValues(){
    return{
        email: "",
        username: "",
        password: "",
        repeatPassword:"",
    };
}

function validationSchema(){
    return{        
        username:       Yup.string().required(true),
        email:          Yup.string().email(true).required(true),
        password:       Yup.string().required(true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")], true)
    };
}


    