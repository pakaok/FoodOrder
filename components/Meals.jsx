import { useState } from "react";
import { useEffect } from "react";
import MealItem from "./MealItem";

// "id","name" "price" "description" "image"

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  
  useEffect(() => {
    async function fetchMeals(){
        try{
            const response = await fetch('http://localhost:3000/meals')
            if(!response.ok){
                console.log('Error')
            }
            const meals = await response.json()
            setLoadedMeals(meals)
        }catch(err){
            console.log(err.message)
        }
      }
    fetchMeals()
  },[]);

  return <ul id="meals">{loadedMeals.map(loadedMeal => < MealItem key={loadedMeal.id} meal={loadedMeal}/>)}</ul>;
}
