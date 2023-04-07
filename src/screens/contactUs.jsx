/**
 * 
 * @returns create four input field name,Mobile Number ,Email and message
 * create a submit button
 * when submit button is pressed then all the data should be sent to (info@redpositive.in as an email) 
 */
import { ActivityIndicator } from "react-native-paper";
import { AlertContext } from "../context/alert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useContext, useState } from "react";
import { Dimensions,TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity,StyleSheet, Text, SafeAreaView, View, Alert, Platform } from "react-native";

export const ContactUsScreen = ({navigation}) => {
    const [notLoading,setLoading] = useState(true);
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

    const emailValidator=()=>{
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if(!email){
            setEmailError({state:true,message:"Please enter a email"});
        }
        else if(!regEmail.test(email)){
            setEmailError({state:true,message:"Please enter a valid email"});
        }
        else{
            setEmailError({state:false});
        }
    }
    const nameValidator=()=>{
        if(!name || name.length<4){
            setNameError({state:true,message:"Please enter a valid name"});
        }else{
            setNameError({state:false});
        }
    }
    const phoneValidator=()=>{
        if(!phone || phone.length<10 ){
            setPhoneError({state:true,message:"Please enter a valid phone"});
        }else{
            setPhoneError({state:false});
        }
    }
    const messageValidator=()=>{
        if(!message || message.length<8){
            setMessageError({state:true,message:"Please enter a message with atleast 5 words"});
        }else{
            setMessageError({state:false});
        }
    }
    const handleSubmit = async () => {
        console.log((!name && !email && !phone && !message));
        if((name&&email&&phone&&message) && (!nameError.state && !phoneError.state && !emailError.state && !messageError.state)){
            setLoading(false);
            const mess = {
                name,
                email,
                phone,
                message,
            };
    try {
        const send = fetch("http://192.168.1.70:8000/api/v1/sending-mail",{
            method:"POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(mess),
        }).then((response)=>response.json()).then((result)=>{
            if(result.status === "success"){
                
                setTimeout(() => {
                   data.setAlert(false);
                }, 6000);
                
                setTimeout(() => {
                    data.setAlert(true);
                    setLoading(true);
                    navigation.navigate("Home");
                }, 3000);
            }
        }).catch((error)=>{console.log(error)})
    } catch (error) {
        console.log(error);
    }
        }else{
            Alert.alert("error","All fields are required");
        }
    }
    return (
        <SafeAreaView>
          <KeyboardAwareScrollView extraScrollHeight={20} enableAutomaticScroll={true} enableOnAndroid={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inputContainer}>
                <Text style={styles.heading}>Welcome to Contact Us Page</Text>
                <TextInput style={styles.textInput} onBlur={()=>nameValidator()} onChangeText={(text) => { setName(text) }} keyboardAppearance="dark" placeholder="name" />
                {nameError.state?<Text style={styles.error}>{nameError.message}</Text>:""}
                <TextInput style={styles.textInput} onBlur={()=>emailValidator()} onChangeText={(text) => { setEmail(text) }} keyboardAppearance="dark" keyboardType="email-address" placeholder="email" />
                {emailError.state?<Text style={styles.error}>{emailError.message}</Text>:""}
                <TextInput style={styles.textInput} onBlur={()=>phoneValidator()} onChangeText={(text) => { setPhone(text) }} maxLength={10} keyboardAppearance="dark" keyboardType="phone-pad" placeholder="phone number" />
                {phoneError.state?<Text style={styles.error}>{phoneError.message}</Text>:""}
                <TextInput style={styles.message} onBlur={()=>messageValidator()} onChangeText={(text) => { setMEssage(text) }} multiline={true} keyboardAppearance="dark" placeholder="message" />
                {messageError.state?<Text style={styles.error}>{messageError.message}</Text>:""}
                {notLoading?<TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                    <Text>submit</Text>
                </TouchableOpacity>
                :<ActivityIndicator size={30}/>}
                
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
        fontSize:15,
        fontWeight:"800",
        marginBottom:15,
    },
    textInput: {
        borderWidth: 1,
        margin:5,
        borderColor: "grey",
        width: 250,
        height: 50,
    },
    message: {
        borderWidth: 1,
        margin: 5,
        borderColor: "grey",
        width: 250,
        height: 100,
    },
    btn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:5,
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