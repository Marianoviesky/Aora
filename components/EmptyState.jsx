import {Image, Text, View } from 'react-native'
import images from '../constants/images';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
const EmptyState = ({title,substitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image 
      source={images.empty}
      className="w-[270px] h-[215px]"
      resizeMode="contain"
      />
            <Text className="text-xl font-psemibold text-white text-center mt-2">
              {title}
            </Text>      
            <Text className="font-medium text-sm text-gray-100">
                {substitle}
            </Text>
            
            <CustomButton
            title="Create video"
            handlePress={()=>router.push('/create')}
            containerStyles="w-full my-5"
            />
    </View>
  )
}

export default EmptyState
