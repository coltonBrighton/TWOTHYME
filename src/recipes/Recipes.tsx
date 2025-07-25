import { useEffect, useState } from "react";
import type { recipe } from "../../types";
import RecipeViewModal from "./RecipeModal/RecipeViewModal";
import RecipeViewCard from "./RecipeViewCard";
import Sidebar from "./Sidebar.tsx/Sidebar";

export default function Recipes() {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<recipe | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/recipe");
        if (!response.ok) {
          throw new Error("failed to fetch recipes");
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "an error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/recipe/${id}`, { method: "DELETE" });
    setRecipe((prevRecipes) => prevRecipes.filter((item) => item.id !== id));
  };

  const handleAddRecipe = (newRecipe: recipe) => {
    setRecipe([...recipe, newRecipe]);
  };

  const updatedRecipe = async (updatedRecipe: recipe) => {
    try {
      const response = await fetch(
        `http://localhost:3000/recipe/${updatedRecipe.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRecipe),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      setRecipe((prevRecipes) =>
        prevRecipes.map((r) =>
          r.id === updatedRecipe.id ? updatedRecipe : r
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleButtonClick = (recipe: recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeRecipeModal = () => setShowModal(false);

  return (
    <div className="bg-blue-950 text-white min-h-screen flex">
      <div className="w-full md:w-1/4">
        <Sidebar handleAddRecipe={handleAddRecipe} />
      </div>
      <div className="w-full md:w-3/4 p-4">
        {loading && (
          <div className="flex justify-center my-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {error && (
          <div className="bg-red-600 text-white text-center py-3 rounded mb-4">
            Error: Recipes Not Found!
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipe?.map((recipeItem) => (
            <div key={recipeItem.id} className="flex justify-center">
              <RecipeViewCard
                recipe={recipeItem}
                handleButtonClick={handleButtonClick}
                handleDelete={() => handleDelete(recipeItem.id)}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedRecipe && (
        <RecipeViewModal
          showModal={showModal}
          selectedRecipe={selectedRecipe}
          closeRecipeModal={closeRecipeModal}
          updateRecipe={updatedRecipe}
        />
      )}
    </div>
  );
}
