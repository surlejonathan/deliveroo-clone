import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient from "../sanity/sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await sanityClient.fetch(`*[_type == "category"]`);
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingVertical: 20,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories?.map((category) => {
        return (
          <CategoryCard
            key={category._id}
            imgUrl={category.imgUrl}
            title={category.title}
          />
        );
      })}
    </ScrollView>
  );
};

export default Categories;
