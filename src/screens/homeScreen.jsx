import { useContext, useEffect } from "react";
import { SafeAreaView,Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { ContactUsButton } from "../components/home/contactUsButton";
import { AlertContext } from "../context/alert";

export const HomeScreen = ({navigation})=>{
    const data = useContext(AlertContext);
    console.log(data);
    useEffect(()=>{
        
    },[data.alert]);

    return (
        <SafeAreaView style={styles.container}>
            {data.alert?<View style={styles.alertContainer}><Text style={styles.alertText}>Hey Mail was sent</Text></View>:""}
            <ContactUsButton navigation={navigation} />
            <StatusBar style="light" />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      color:'white',
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    alertContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        margin:30,
        width:300,
        height:80,
        borderWidth:2,
        backgroundColor:"#32cd32",
    },
    alertText:{
        fontSize:20,
        color:"white",
        fontWeight:"800",
    },
  });

