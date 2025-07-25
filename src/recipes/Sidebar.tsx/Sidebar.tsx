import RecipeAddForm from "./RecipeAddForm";
import { recipe } from "../../../types";

type Props = {
  handleAddRecipe: (newRecipe: recipe) => void;
};

export default function Sidebar({ handleAddRecipe }: Props) {
  return (
    <div className="fixed top-34 left-5 w-[20rem] rounded-4xl bg-slate-800 text-white shadow-lg p-4 overflow-y-auto z-40">
      <h4 className="text-center font-semibold text-lg mb-4">Add A New Recipe:</h4>
      <RecipeAddForm handleAddRecipe={handleAddRecipe} />
    </div>
  );
}
