import { ScrollView, Text, View ,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import {images} from '../../constants';
import React,{useState} from 'react';
import CustomButtom from '../../components/CustomButton';
import { Link,router } from 'expo-router';
import {createUser} from '../../lib/appwrite';


const Signup = () => {

  const [form,setForm] = useState({
    username:'',
    email:'',
    password:'',
  })


  const [isSubmitting, setisSubmitting] = useState(false);


  const submit = async ()=>{
    if(!form.username || !form.email || !form.password){
      // alert('Error','Please fill in all the field')
      alert(`${form.email}`)
    }

    setisSubmitting(true)
    try {
      const result = await createUser(form.email, form.password, form.username)

      // Set it to global state...

      router.replace('/home')
    } catch (error) {
      alert('Une erreur',error.message)
    }finally{
      setisSubmitting(false)
    }
  }



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
          Sign up to Aora
        </Text>


        <FormField
        title="Username"
        value={form.username}
        handleChangeText={(e)=>setForm({...form,
          username:e,
        })}
        otherStyles="mt-10"
        />

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
        title="Sign up"
        handlePress={submit}
        containerStyles="mt-7"
        isLoading={isSubmitting}
        />


        <View className="justify-center pt-5 flex-row gap-2 items-center">

          <Text className="text-gray-100 text-lg font-pregular">
            Have an account already?
          </Text>

          <Link href='/sign-in'
          className="text-secondary font-psemibold text-lg" 
          >
         Sign in
          </Link>
        </View>

      </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default Signup
