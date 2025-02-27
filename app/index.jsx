import { ScrollView, Text, View,Image } from 'react-native';
import { Redirect,router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../context/GlobalProvider';



const App = () => {

  const {isLoading,isloggedIn} = useGlobalContext();

  if(!isLoading && isloggedIn) return <Redirect href="/home" />
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height:'100%',}}>


        <View className="w-full justify-center min-h-[85vh] items-center px-4">
          <Image 
          source={images.logo}
          className="w-[130px] h-[84px]"
          resizeMode="contain"
          />

         <Image 
          source={images.cards}
          className="max-w-[380px] w-full h-[300px]"
          resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with {' '}
              <Text className="text-secondary-200">
                Aora
              </Text>

            </Text>
            <Image 
            source={images.path}
            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            resizeMode="contain"
            />
          </View>
          <Text className="text-gray-100 text-sm mt-7 font-pregular text-center">
            Where creativity meets innovation : embark on journey of limitless exploration with Aora 
          </Text>

          <CustomButton 
          title="Continue with Email"
          handlePress={()=>router.push('/sign-in')}
          containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar 
      backgroundColor='#161622'
      style='lignt'
      />
    </SafeAreaView>
  )
}

export default App

