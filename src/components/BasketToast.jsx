import { View, Text, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import Currency from "react-currency-formatter";
import { useNavigation } from "@react-navigation/native";

const BasketToast = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  const navigation = useNavigation();

  if (!items.length) return;

  return (
    <View className='absolute bottom-10  w-full z-10'>
      <Pressable
        onPress={() => navigation.navigate("Basket")}
        className='bg-[#00CCBB] mx-5 p-4 flex-row items-center rounded-lg space-x-1 active:opacity-50'
      >
        <Text className='text-white font-extrabold text-lg bg-[#01A296] py-1 px-2'>
          {items.length}
        </Text>
        <Text className='flex-1 text-center text-white font-extrabold text-lg'>
          View Basket
        </Text>
        <Text className='text-lg font-bold text-white'>
          <Currency currency='EUR' quantity={basketTotal} />
        </Text>
      </Pressable>
    </View>
  );
};

export default BasketToast;
