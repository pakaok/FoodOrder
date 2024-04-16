import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
// "id","name" "price" "description" "image"
const requestConfig = {}
export default function Meals() {
  const {data:loadedMeals,isLoading,error} = useHttp('http://localhost:3000/meals',requestConfig,[])
  
  if (isLoading){
    return <p className="center">Fetching Data...</p>
  }
  if(error){
    return <Error title='Failed to fetch data' message={error} />
  }
  return <ul id="meals">{loadedMeals.map(loadedMeal => < MealItem key={loadedMeal.id} meal={loadedMeal}/>)}</ul>;
}
