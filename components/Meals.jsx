import { useState } from "react";
import { useEffect } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
// "id","name" "price" "description" "image"
const requestConfig = {}
export default function Meals() {
  const {data:loadedMeals,isLoading} = useHttp('http://localhost:3000/meals',requestConfig,[])
  
  if (isLoading){
    return <p>Fetching Data...</p>
  }

  return <ul id="meals">{loadedMeals.map(loadedMeal => < MealItem key={loadedMeal.id} meal={loadedMeal}/>)}</ul>;
}
