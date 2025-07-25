import type { recipe, mealplan } from "../../types";
import { useState } from "react";

type Props = {
  recipe: recipe;
  handleButtonClick: (recipe: recipe) => void;
  handleDelete: (recipeId: number) => void;
};

export default function RecipeViewCard({
  recipe,
  handleButtonClick,
  handleDelete,
}: Props) {
  const [mealPlan, setMealPlan] = useState<mealplan[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // <-- new state

  const handleAddToMealPlan = async (recipe: recipe, day: string) => {
    try {
      const mealplanData = {
        recipeId: recipe.id,
        day: day,
      };

      const response = await fetch("http://localhost:3000/mealplan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealplanData),
      });

      if (response.ok) {
        const newRecipe = await response.json();
        const newMealPlan = [...mealPlan, newRecipe];
        setMealPlan(newMealPlan);
        setSelectedDay(null);
        setDropdownOpen(false); // close dropdown after adding
      } else {
        throw new Error("Failed to add recipe");
      }
    } catch (error) {
      throw new Error("Failed to add recipe");
    }
  };

  return (
    <div className="bg-slate-800 rounded-4xl shadow-md my-3 w-72 min-h-[400px] flex flex-col">
      <div className="p-4 flex-1">
        <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
        <p className="text-gray-400">{recipe.description}</p>
      </div>
      <div className="flex flex-col mt-auto px-4 pb-4">
        <button
          className="mb-3 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition"
          onClick={() => handleButtonClick(recipe)}
        >
          View Recipe
        </button>
        <div className="relative mb-3">
          <button
            className="w-full px-4 py-2 border border-green-500 text-green-600 rounded hover:bg-green-50 transition justify-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            type="button"
            tabIndex={0}
          >
            {selectedDay || "Select a Day"}
            <svg
              className={`w-4 h-4 inline-block transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-slate-800 border border-slate-400 rounded shadow z-10">
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day) => (
                <button
                  key={day}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  onClick={() => {
                    setSelectedDay(day);
                    setDropdownOpen(false);
                  }}
                  type="button"
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          className="mb-3 px-4 py-2 border border-green-500 text-green-600 rounded hover:bg-green-50 transition"
          onClick={() => handleAddToMealPlan(recipe, selectedDay || "")}
          disabled={!selectedDay} // disable if no day selected
        >
          Add to Meal Plan
        </button>
        <button
          className="mb-3 px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-50 transition"
          onClick={() => handleDelete(recipe.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
