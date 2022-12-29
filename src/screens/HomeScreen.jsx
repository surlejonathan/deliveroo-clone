import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity/sanity";

const HomeScreen = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await sanityClient.fetch(`*[_type == "featured"] {
        ...,
        restaurants[]->
      }`);
      setFeaturedCategories(data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className={`bg-white flex-1 pt-10 `}>
      {/* HEADER */}
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <View className='bg-white z-10 shadow-sm pt-3'>
        <View className='flex-row items-center gap-3 px-4'>
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className='bg-gray-300 rounded-full w-10 h-10 '
          />
          <View className='flex-1'>
            <Text className='font-bold text-xs text-gray-400'>
              Deliver now !
            </Text>
            <View className='flex-row items-center space-x-2'>
              <Text className='font-bold text-xl'>Current location</Text>
              <ChevronDownIcon size={24} color='#00CCBB' />
            </View>
          </View>
          <UserIcon size={30} color='#00CCBB' />
        </View>

        {/* SEARCH */}

        <View className='flex-row  gap-3 p-4 items-center'>
          <View className='flex-row flex-1 space-x-2 bg-gray-100 p-3 '>
            <MagnifyingGlassIcon color='#00CCBB' />
            <TextInput placeholder='Restaurants' />
          </View>
          <AdjustmentsVerticalIcon color='#00CCBB' />
        </View>
      </View>
      <View />

      {/* BODY */}

      <ScrollView className='bg-gray-100'>
        {/* CATEGORIES */}
        <Categories />
        {/* FEATURED ROW */}
        {featuredCategories?.map((category) => {
          return (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
