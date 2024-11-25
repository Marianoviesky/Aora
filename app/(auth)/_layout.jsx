import { StyleSheet, Text, View } from 'react-native'
import {Stack} from 'expo-router';

const Authlayout = () => {
  return (
   <>
   <Stack>
    <Stack.Screen name="sign-in" 
    options={{
      headerShown:false,
    }}
    />
    <Stack.Screen name="sign-up" 
    options={{
      headerShown:false,
    }}
    />
    
    
   </Stack>
   </>
  )
}

export default Authlayout

const styles = StyleSheet.create({})