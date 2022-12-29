import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity/sanity";
import Currency from "react-currency-formatter";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);

  const dispatch = useDispatch();

  const items = useSelector((state) => selectBasketItemsWithId(state, id));

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!!items.length) dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <Pressable
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white p-4 border-b border-gray-200 flex-row items-center active:opacity-50 space-x-2  ${
          isPressed && "border-b-0"
        }`}
      >
        <View className='flex-1'>
          <Text className='text-base mb-1'>{name}</Text>
          <Text className='text-gray-400 mb-2'>{description}</Text>
          <Text className='text-gray-400'>
            <Currency quantity={price} currency='EUR' />
          </Text>
        </View>
        <View className='w-20 h-20 bg-gray-300 rounded-md shadow'>
          <Image
            source={{ uri: image ? urlFor(image).url() : null }}
            className='w-20 h-20'
            resizeMode='cover'
          />
        </View>
      </Pressable>
      {isPressed && (
        <View className='px-4 pt-1 pb-3 bg-white border-b border-gray-200'>
          <View className='flex-row items-center space-x-2'>
            <Pressable
              disabled={!items.length}
              className='active:opacity-50'
              onPress={removeItemFromBasket}
            >
              <MinusCircleIcon
                size={30}
                color={!!items.length ? "#00CCBB" : "gray"}
              />
            </Pressable>
            <Text>{items?.length}</Text>
            <Pressable className='active:opacity-50' onPress={addItemToBasket}>
              <PlusCircleIcon size={30} color='#00CCBB' />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
