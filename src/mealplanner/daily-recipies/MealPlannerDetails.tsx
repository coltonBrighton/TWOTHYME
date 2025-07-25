import type { recipe } from "../../../types";
import MealPlannerCard from "../MealPlannerCard";
import { useState } from "react";
type Props = {
  handleDelete: (id: number | undefined) => void;
  mealPlanWithRecipes: {
    mealRecipe: recipe | undefined;
    id: number;
    recipeId: number;
    day: string;
  }[];
  handleButtonClick: (recipe: recipe | undefined) => void
  dayOfTheWeek: string
};

export default function MealPlannerDetails({
  handleDelete,
  mealPlanWithRecipes,
  handleButtonClick,
  dayOfTheWeek
}: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prevState) => !prevState);
  };
  return (
    <div className="text-white">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-4xl font-display mx-3 mt-3">{dayOfTheWeek}</h3>
        <button
          type="button"
          className="border border-white text-white bg-indigo-950 mt-4 px-4 py-2 rounded overflow-hidden hover:bg-blue-900 hover:text-white transition"
          onClick={toggleCollapse}
        >
          {collapsed ? "Show Meals" : "Hide Meals"}
        </button>
      </div>
      <hr className="my-4 border-white/30" />
      <div className="flex flex-wrap">
        {!collapsed &&
          mealPlanWithRecipes
            .filter((meal) => meal.day === dayOfTheWeek)
            .map((meal) => (
              <div
                key={meal.id}
                className="flex justify-center w-full md:w-2/3 lg:w-1/3 mb-4"
              >
                <MealPlannerCard
                  handleDelete={handleDelete}
                  recipe={meal.mealRecipe}
                  mealPlan={meal}
                  handleButtonClick={handleButtonClick}
                />
              </div>
            ))}
      </div>
    </div>
  );
}
