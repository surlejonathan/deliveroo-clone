import { View, Text, Image } from "react-native";
import React from "react";
import { urlFor } from "../sanity/sanity";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <View className='relative mr-2 '>
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className='w-20 h-20 rounded'
        resizeMode='cover'
      />
      <Text className='absolute bottom-1 left-1 text-white font-bold '>
        {title}
      </Text>
    </View>
  );
};

export default CategoryCard;
