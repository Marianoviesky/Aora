import {FlatList, ImageBackground, Text, TouchableOpacity, View ,Image} from 'react-native'
import {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { Video,ResizeMode} from 'expo-av';

const ZoomIn ={
  0: {
    scale : 0.9

  },
  1:{
    scale:1.1
  }
}

const ZoomOut ={
  0: {
    scale : 1

  },
  1:{
    scale:0.9
  }
}


const TrendingItem = ({activeItem,item})=>{

  const [play, setPlay] = useState(false)

  return (
    <Animatable.View
    className="mr-5"
    animation={activeItem === item.$id ? ZoomIn : ZoomOut}
    duration={500}
    >
      {play ? (
        <Video
        source={{uri: item.video}}
        className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls={true}
        shouldPlay
        onPlaybackStatusUpdate={(status)=>{
          if (status.didJustFinish) {
            setPlay(false);
          }
        }}
        />
        
        
        
       
      ):(
        <TouchableOpacity
        className="relative justify-center items-center"
        activeOpacity={0.7}
        onPress={() => setPlay(true)}
        >
          <ImageBackground
          source={{
            uri: item.thumbnail
          }}
          className="w-52 h-72 rounded-[35px] my-5
          overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
          />
          <Image 
          source={icons.play}
          className="absolute h-12 w-12"
          resizeMode="contain"
          />
        </TouchableOpacity>
      )
      }
    </Animatable.View>
  )
}

const Trending = ({posts}) => {

  const [activeItem, setActiveItem] = useState(posts[0])

  const viewableItemChanges = ({viewableItems})=>{
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
   <FlatList
   data={posts}
   keyExtractor={(item)=>item.$id}
   renderItem={({item})=>{
    return(
    <TrendingItem activeItem={activeItem} item={item}/>
    )
  }}

  onViewableItemsChanged={viewableItemChanges}
  viewabilityConfig={
    {
      itemVisiblePercentThreshold : 70
    }
  }
  contentOffset={{x : 170}}
  horizontal
   />
  )
}

export default Trending
