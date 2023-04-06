/**
 * 
 * @returns create four input field name,Mobile Number ,Email and message
 * create a submit button
 * when submit button is pressed then all the data should be sent to (info@redpositive.in as an email) 
 */
import * as Progress from 'react-native-progress';
import { AlertContext } from "../context/alert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useContext, useState } from "react";
import { ScrollView,Dimensions,TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity,StyleSheet, Text, SafeAreaView, View } from "react-native";

export const ContactUsScreen = ({navigation}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMEssage] = useState("");
    const [nameError,setNameError]=useState({
        state:false,
        message:""
    });
    const [emailError,setEmailError]=useState({
        state:false,
        message:""
    })
    const [phoneError,setPhoneError]=useState({
        state:false,
        message:""
    })
    const [messageError,setMessageError]=useState({
        state:false,
        message:""
    })
    const data = useContext(AlertContext);
    
    const handleSubmit = async () => {
        console.log(name, email, phone, message);
        if(!name){
            setNameError({state:true,message:"Please enter a name"});
        }
        else if(!email){
            setEmailError({state:true,message:"Please enter a email"});
        }
        else if(!phone){
            setPhoneError({state:true,message:"Please enter a phone"});
        }
        else if(!message){
            setMessageError({state:true,message:"Please enter a message"});
        }
        else{
            const mess = {
                name,
                email,
                phone,
                message,
            };
    try {
        setNameError({state:false});
        setEmailError({state:false});
        setPhoneError({state:false});
        setMessageError({state:false});
        const send = fetch("http://192.168.1.70:8000/api/v1/sending-mail",{
            method:"POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(mess),
        }).then((response)=>response.json()).then((result)=>{
            if(result.status === "success"){
                navigation.navigate("Home");
            }
        }).catch((error)=>{console.log(error)})
            
    
    } catch (error) {
        console.log(error);
    }
        
        }
       
    }

    return (
        <SafeAreaView>
          <KeyboardAwareScrollView enableOnAndroid={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inputContainer}>
                <Text style={styles.heading}>Welcome to Contact Us Page</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => { setName(text) }} keyboardAppearance="dark" placeholder="name" />
                {nameError.state?<Text style={styles.error}>{nameError.message}</Text>:""}
                <TextInput style={styles.textInput} onChangeText={(text) => { setEmail(text) }} keyboardAppearance="dark" keyboardType="email-address" placeholder="email" />
                {emailError.state?<Text style={styles.error}>{emailError.message}</Text>:""}
                <TextInput style={styles.textInput} onChangeText={(text) => { setPhone(text) }} maxLength={10} keyboardAppearance="dark" keyboardType="phone-pad" placeholder="phone number" />
                {phoneError.state?<Text style={styles.error}>{phoneError.message}</Text>:""}
                <TextInput style={styles.message} onChangeText={(text) => { setMEssage(text) }} multiline={true} keyboardAppearance="dark" placeholder="message" />
                {messageError.state?<Text style={styles.error}>{messageError.message}</Text>:""}
                <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                    <Text>submit</Text>
                </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
          </SafeAreaView>
        )
};

const styles = StyleSheet.create({
    inputContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height,
    },
    heading:{
        fontSize:20,
        fontWeight:"800",
        marginBottom:30,
    },
    textInput: {
        borderWidth: 2,
        margin: 10,
        borderColor: "grey",
        width: 250,
        height: 50,
    },
    message: {
        borderWidth: 2,
        margin: 10,
        borderColor: "grey",
        width: 250,
        height: 120,
    },
    btn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 30,
        borderWidth: 2,
        borderColor: "black",
    },
    error:{
        color:"red",
        fontSize:15,
        fontWeight:"300",
    }
});