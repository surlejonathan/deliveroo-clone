import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity/sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = (props) => {
  const {
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    lng,
    lat,
  } = props;

  const navigate = useNavigation();

  return (
    <Pressable
      className='w-64 mt-2 mr-2 rounded shadow bg-white active:opacity-50'
      onPress={() => navigate.navigate("Restaurant", { data: props })}
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className='w-64 h-36 rounded rounded-b-none '
        resizeMode='cover'
      />
      <View className='py-3 px-2 '>
        <Text className='text-lg font-bold'>{title}</Text>
        <View className='flex-row items-center space-x-1 '>
          <StarIcon color='#00CCBB' size={20} />
          <Text className='text-xs text-teal-400'>
            {rating}
            <Text className='text-gray-500'> &#903; {genre}</Text>
          </Text>
        </View>
        <View className='flex-row items-center space-x-1'>
          <MapPinIcon color='#00CCBB' size={20} />
          <Text className='text-xs text-gray-500 w-11/12 '>
            Nearby &#903; {address}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantCard;
