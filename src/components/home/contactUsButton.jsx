import { Text, TouchableOpacity, View } from "react-native"; 
import { StyleSheet } from "react-native";

const handlePress = (navigation)=>{
    navigation.navigate('Contact');
}

export const ContactUsButton = ({navigation}) => {
return(
    <View>
    <TouchableOpacity onPress={()=>{navigation?.navigate('Contact')}} style={styles.button}>
        <Text style={styles.text}>Click Here To Send Mail</Text>
    </TouchableOpacity>
</View>
)
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        height: 60,
        borderWidth: 2,
        borderColor: 'white',
    },
    text: {
        color: 'white'
    },
});