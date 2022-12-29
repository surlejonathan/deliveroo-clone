import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectrestaurant } from "../features/restaurantSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { urlFor } from "../sanity/sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const restaurant = useSelector(selectrestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className='flex-1 pt-10'>
      <View className='bg-gray-100'>
        {/* HEADER */}
        <View className='relative bg-white p-4 border-b border-[#00CCBB] shadow'>
          <Text className='text-lg font-extrabold text-center'>Basket</Text>
          <Text className='text-gray-400 text-center'>{restaurant.title}</Text>
          <Pressable
            onPress={() => navigation.goBack()}
            className='absolute top-3 right-3 rounded-full bg-gray-100 active:opacity-50'
          >
            <XCircleIcon color='#00CCBB' height={50} width={50} />
          </Pressable>
        </View>

        {/* DELIVERY INFORMATION */}
        <View className='flex-row items-center bg-white my-5 px-4 py-3 space-x-4'>
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className='bg-gray-300 rounded-full w-7 h-7 '
          />

          <Text className='font-bold text-xs text-gray-400 flex-1'>
            Deliver in 50-75 min
          </Text>
          <Pressable className='active:opacity-50'>
            <Text className='font-bold text-xs text-[#00CCBB]'>Change</Text>
          </Pressable>
        </View>

        {/* ORDER */}
        <ScrollView className='divide-y divide-gray-200 '>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className='flex-row space-x-4 items-center bg-white py-2 px-4'
            >
              <Text className='text-[#00CCBB]'>{items.length} x</Text>
              <View className=' w-10 h-10 '>
                <Image
                  source={{
                    uri: items[0]?.image && urlFor(items[0]?.image).url(),
                  }}
                  className='w-full h-full'
                  resizeMode='cover'
                />
              </View>

              <Text className='flex-1'>{items[0]?.name}</Text>
              <Text className='text-gray-400'>
                <Currency quantity={items[0]?.price} currency='EUR' />
              </Text>

              <Pressable
                onPress={() => dispatch(removeFromBasket({ id: key }))}
                className='active:opacity-50'
              >
                <Text className='text-[#00CCBB] text-xs'>Remove</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* TOTAL */}
      <View className='bg-white p-4 mt-5 space-y-4 absolute bottom-0 w-full pb-12'>
        <View className='flex-row justify-between'>
          <Text className='text-gray-400'>Subtotal</Text>
          <Text className='text-gray-400'>
            <Currency quantity={basketTotal} currency='EUR' />
          </Text>
        </View>
        <View className='flex-row justify-between'>
          <Text className='text-gray-400'>Delivery fee</Text>
          <Text className='text-gray-400'>
            <Currency quantity={5.99} currency='EUR' />
          </Text>
        </View>
        <View className='flex-row justify-between'>
          <Text>Order total</Text>
          <Text className='font-extrabold'>
            <Currency quantity={basketTotal + 5.99} currency='EUR' />
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("PreparingOrder")}
          className='p-4 bg-[#00CCBB] rounded-lg items-center active:opacity-50'
        >
          <Text className='font-bold text-white text-lg'>Place order</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
