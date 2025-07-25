import { FormEvent, useState } from "react";

type Props = {
  handleAddRecipe: (newRecipe: any) => void;
};

export default function RecipeAddForm({ handleAddRecipe }: Props) {
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const recipeData = {
      name: recipeName,
      description: recipeDescription,
      ingredients: recipeIngredients,
      instructions: recipeInstructions,
    };

    try {
      const response = await fetch("http://localhost:3000/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        const newRecipe = await response.json();
        handleAddRecipe(newRecipe);
        setRecipeName("");
        setRecipeDescription("");
        setRecipeIngredients("");
        setRecipeInstructions("");
      } else {
        throw new Error("Failed to add recipe");
      }
    } catch (error) {
      throw new Error("Failed to add recipe");
    }
  };

  return (
    <div className="m-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">
            Recipe Name:
          </label>
          <input
            type="text"
            aria-label="input recipe name"
            placeholder="Recipe Name"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Brief Recipe Description:
          </label>
          <textarea
            aria-label="textarea for recipe description input"
            placeholder="Recipe Description"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={recipeDescription}
            onChange={(e) => setRecipeDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Recipe Ingredients:
          </label>
          <textarea
            aria-label="textarea for recipe ingredient input"
            placeholder="Recipe Ingredients"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={recipeIngredients}
            onChange={(e) => setRecipeIngredients(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Recipe Instructions:
          </label>
          <textarea
            aria-label="textarea for recipe instruction input"
            placeholder="Recipe Instructions"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={recipeInstructions}
            onChange={(e) => setRecipeInstructions(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-3 w-full bg-blue-700 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
