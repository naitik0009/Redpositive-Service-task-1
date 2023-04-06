import {HomeScreen} from "../screens/homeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ContactUsScreen } from "../screens/contactUs";
const Stack = createNativeStackNavigator();

export const Authenticated = ()=>{
    return(
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
         <Stack.Screen name='Home' component={HomeScreen}/>
         <Stack.Screen name='Contact' component={ContactUsScreen} />
        </Stack.Navigator>
         </NavigationContainer>
    )


}