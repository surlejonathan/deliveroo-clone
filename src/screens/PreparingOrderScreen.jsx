import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const redirectionTimer = setTimeout(
      () => navigation.navigate("Delivery"),
      5000
    );

    return () => clearTimeout(redirectionTimer);
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-[#00CCBB] justify-center items-center pt-10 px-4'>
      <Animatable.Image
        source={require("../../assets/order.gif")}
        className='h-60 w-11/12 rounded-lg'
        animation='slideInUp'
        iterationCount={1}
      />

      <Animatable.Text
        className='my-6 text-white font-bold'
        animation='slideInUp'
        iterationCount={1}
      >
        Waiting for the restaurant to accept your order...
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate color='white' />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
