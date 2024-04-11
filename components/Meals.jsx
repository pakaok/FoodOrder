import { useState } from "react";
import { useEffect } from "react";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then((res) => res.json())
      .then(res=>console.log(res));
  },[]);

  return <ul id="meals"></ul>;
}
