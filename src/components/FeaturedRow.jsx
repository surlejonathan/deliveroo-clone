import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity/sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await sanityClient.fetch(
        `*[_type == "featured" && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          genre ->  {
            title
            },
          dishes [] ->{
            ...
          }
        }
      }[0]`,
        { id }
      );
      setRestaurants(data?.restaurants);
    };
    fetchRestaurants();
  }, [id]);

  return (
    <View className='pb-4'>
      <View className='px-4'>
        <View className='flex-row justify-between items-center'>
          <Text className='font-bold'>{title}</Text>
          <ArrowRightIcon color='#00CCBB' size={20} />
        </View>
        <Text className='text-xs text-gray-500'>{description}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
      >
        {restaurants?.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.imgUrl}
              title={restaurant.title}
              rating={restaurant.rating}
              genre={restaurant.genre.title}
              address={restaurant.address}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              lng={restaurant.lng}
              lat={restaurant.lat}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
