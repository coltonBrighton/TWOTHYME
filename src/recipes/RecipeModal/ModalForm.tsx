import { ChangeEvent } from "react";
import { recipe } from "../../../types";

type Props = {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  editedRecipe: recipe;
};

export default function ModalForm({
  handleChange,
  editedRecipe,
}: Props) {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="recipeName" className="block text-sm font-medium text-white mb-1">
          Recipe Name:
        </label>
        <input
          type="text"
          id="recipeName"
          name="name"
          value={editedRecipe.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="recipeDescription" className="block text-sm font-medium text-white mb-1">
          Description:
        </label>
        <textarea
          id="recipeDescription"
          name="description"
          rows={3}
          value={editedRecipe.description}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="recipeIngredients" className="block text-sm font-medium text-white mb-1">
          Ingredients:
        </label>
        <textarea
          id="recipeIngredients"
          name="ingredients"
          rows={3}
          value={editedRecipe.ingredients}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="recipeInstructions" className="block text-sm font-medium text-white mb-1">
          Instructions:
        </label>
        <textarea
          id="recipeInstructions"
          name="instructions"
          rows={5}
          value={editedRecipe.instructions}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}
