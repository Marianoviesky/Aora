import { ScrollView, Text, View ,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import {images} from '../../constants';
import React,{useState} from 'react';
import CustomButtom from '../../components/CustomButton'
import { Link } from 'expo-router';
import { signIn } from '../../lib/appwrite';
import { router } from 'expo-router';
import { Alert } from 'react-native';
const Signin = () => {

  const [form,setForm] = useState({
    email:'',
    password:'',
  })

 
  const submit = async ()=>{
    if(!form.email || !form.password){
      // alert('Error','Please fill in all the field')
      Alert.alert("Error")
    }

    setisSubmitting(true)
    try {
      const result = await signIn(form.email, form.password)

      // Set it to global state...

      router.replace('/home')
    } catch (error) {
      console.log(error);
      Alert.alert('Une erreur',error.message)
    }finally{
      setisSubmitting(false)
    }
  }


  const [isSubmitting, setisSubmitting] = useState(false)


  return (
   <SafeAreaView className="bg-primary h-full">
    <ScrollView>
      <View className="w-full justify-center min-h-[83vh] px-4 mt-6">
        <Image 
        source={images.logo}
        resizeMode="contain"
        className="w-[115px] h-[35px]"
        />
        <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
          Log in to Aora
        </Text>


        <FormField
        title="Email"
        value={form.email}
        handleChangeText={(e)=>setForm({...form,
          email:e,
        })}
        otherStyles="mt-7"
        keyboardType="email-adress"
        />

        <FormField
        title="Password"
        value={form.password}
        handleChangeText={(e)=>setForm({...form,
          password:e,
        })}
        otherStyles="mt-7"
        />

        <CustomButtom 
        title="Sign in"
        handlePress={submit}
        containerStyles="mt-7"
        isLoading={isSubmitting}
        />


        <View className="justify-center pt-5 flex-row gap-2 items-center">

          <Text className="text-gray-100 text-lg font-pregular">
            Don't have an account?
          </Text>

          <Link href='/sign-up'
          className="text-secondary font-psemibold text-lg" 
          >
         Sign up
          </Link>
          <Link href='/home'
          className="text-secondary font-psemibold text-lg" 
          >
         useful
          </Link>
        </View>

      </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default Signin
