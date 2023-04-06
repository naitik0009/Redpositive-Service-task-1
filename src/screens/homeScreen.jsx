import { SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { ContactUsButton } from "../components/home/contactUsButton";

export const HomeScreen = ({navigation})=>{
    return (
        <SafeAreaView style={styles.container}>
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
  });

