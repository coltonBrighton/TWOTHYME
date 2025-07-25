import type { recipe, mealplan } from "../../types";
import { useEffect, useState } from "react";

import MealPlannerViewModal from "./daily-recipies/MealPlannerViewModal";
import MealPlannerDetails from "./daily-recipies/MealPlannerDetails";

export default function MealPlanner({}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<mealplan[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<recipe | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mealPlanResponse, recipeResponse] = await Promise.all([
          fetch("http://localhost:3000/mealplan"),
          fetch("http://localhost:3000/recipe"),
        ]);

        if (!mealPlanResponse.ok) {
          throw new Error("Failed to fetch Meal Plans");
        }
        if (!recipeResponse.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const [mealPlanData, recipeData] = await Promise.all([
          mealPlanResponse.json(),
          recipeResponse.json(),
        ]);

        setMealPlan(mealPlanData);
        setRecipe(recipeData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRecipeById = (recipeId: number) => {
    return recipe.find((r) => recipeId === r.id);
  };

  // grab mealplan item by id and filter it out to delete it
  const handleDelete = async (id: number | undefined) => {
    await fetch(`http://localhost:3000/mealplan/${id}`, { method: "DELETE" });
    setMealPlan((prevMeal) => prevMeal.filter((item) => item.id !== id));
  };

  // Prepare mealPlan data with the associated recipes
  const mealPlanWithRecipes = mealPlan.map((meal) => {
    const mealRecipe = getRecipeById(meal.recipeId); // Find the recipe by recipeId
    return {
      ...meal,
      mealRecipe, // Add the found recipe to the mealPlan object
    };
  });

  const handleButtonClick = (recipe: recipe | undefined) => {
    // Open Modal, set selected recipe
    setSelectedRecipe(recipe);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false); // close modal
  return (
    <div className="bg-blue-950 min-h-screen">
      <div className="container mx-auto">
        {loading && (
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}

        {error && (
          <div className="bg-red-600 text-white text-center py-3 rounded mb-4">
            {error}
          </div>
        )}
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Sunday"}
        />
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Monday"}
        />
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Tuesday"}
        />
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Wednesday"}
        />
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Thursday"}
        />
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Friday"}
        />
        <MealPlannerDetails
          handleDelete={handleDelete}
          mealPlanWithRecipes={mealPlanWithRecipes}
          handleButtonClick={handleButtonClick}
          dayOfTheWeek={"Saturday"}
        />
        {selectedRecipe && (
          <MealPlannerViewModal
            showModal={showModal}
            selectedRecipe={selectedRecipe}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
}
