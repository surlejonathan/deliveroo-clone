import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { urlFor } from "../sanity/sanity";
import {
  ArrowLeftIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import {
  QuestionMarkCircleIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import BasketToast from "../components/BasketToast";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = ({ navigation, route }) => {
  const {
    params: { data },
  } = route;

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
  } = data;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, [dispatch]);

  return (
    <>
      <BasketToast />
      <ScrollView>
        {/* IMAGE BANNER */}
        <View className='relative'>
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className='w-full h-60 bg-slate-300'
          />
          <Pressable
            className='absolute top-14 left-4 bg-gray-100 p-2 rounded-full active:opacity-50'
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={20} color='#00CCBB' />
          </Pressable>
        </View>

        {/* RESTAURANT DETAILS */}
        <View className='bg-white'>
          <View className='p-4'>
            <Text className='text-3xl font-bold pb-2'>{title}</Text>
            <View className='flex-row space-x-2'>
              <View className='flex-row items-center space-x-1'>
                <StarIcon color='#00CCBB' size={20} />
                <Text className='text-xs text-teal-400'>
                  {rating}
                  <Text className='text-gray-500'>
                    <Text className='m-4 '> &#903; </Text>
                    {genre}
                  </Text>
                </Text>
              </View>
              <View className='flex-row items-center space-x-1'>
                <MapPinIcon color='#00CCBB' size={20} />
                <Text className='text-xs text-gray-500 w-10/12 '>
                  Nearby &#903; {address}
                </Text>
              </View>
            </View>
            <Text className='text-gray-500 pt-2'>{short_description}</Text>
          </View>
          <Pressable className='flex-row items-center  p-4 space-x-4 border-y border-gray-200 active:opacity-50'>
            <QuestionMarkCircleIcon size={20} color='#ccc' />
            <Text className='font-bold flex-1 '>Have a food allergy ?</Text>
            <ChevronRightIcon color='#00CCBB' />
          </Pressable>
        </View>

        {/* MENU */}
        <View className='pb-36'>
          <Text className='px-4 pt-4 pb-2 text-xl font-bold'>Menu</Text>

          {/* Dishes */}
          <View>
            {!!dishes?.length ? (
              dishes?.map((dish) => (
                <DishRow
                  key={dish._id}
                  id={dish._id}
                  name={dish.name}
                  description={dish.short_description}
                  image={dish?.imgUrl}
                  price={dish.price}
                />
              ))
            ) : (
              <Text>No dishes added yet</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
