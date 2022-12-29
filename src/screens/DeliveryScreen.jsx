import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import React from "react";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";
import { selectrestaurant } from "../features/restaurantSlice";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectrestaurant);

  return (
    <View className='flex-1 bg-[#00CCBB] pt-10'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between items-center p-4'>
          <Pressable
            onPress={() => navigation.navigate("Home")}
            className='active:opacity-50'
          >
            <XMarkIcon color='white' size={30} />
          </Pressable>
          <Text className='text-white font-light text-lg'>Order help</Text>
        </View>
        <View className='bg-white rounded-lg m-4 p-6 shadow-md'>
          <View className='flex-row justify-between'>
            <View>
              <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
              <Text className='text-3xl font-bold'>45-55 minutes</Text>
            </View>
            <Image
              source={{ uri: "https://links.papareact.com/fls" }}
              className='h-20 w-20'
            />
          </View>
          <Progress.Bar indeterminate color='#00CCBB' />
          <Text className='text-gray-400 pt-2'>
            Your order at {restaurant?.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        className='flex-1 -mt-10 z-0'
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType='mutedStandard'
      >
        <Marker
          coordinate={{ latitude: restaurant.lat, longitude: restaurant.lng }}
          title={restaurant.title}
          description={restaurant.short_description}
          pinColor='#00CCBB'
        />
      </MapView>
      <SafeAreaView className='bg-white'>
        <View className=' flex-row space-x-4 items-center p-4'>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/3.jpg" }}
            className='h-10 w-10 rounded-full'
          />
          <View className='flex-1'>
            <Text className='text-md'>Jonathan Surle</Text>
            <Text className='text-gray-400'>Your rider</Text>
          </View>
          <Pressable className='active:opacity-50'>
            <Text className='text-[#00CCBB]'>Call</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
