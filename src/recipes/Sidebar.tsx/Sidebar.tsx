import RecipeAddForm from "./RecipeAddForm";
import { recipe } from "../../../types";

type Props = {
  handleAddRecipe: (newRecipe: recipe) => void;
};

export default function Sidebar({ handleAddRecipe }: Props) {
  return (
    <div
      className="w-full max-w-md rounded-4xl bg-slate-800 text-white shadow-lg p-4 overflow-y-auto z-40
        md:w-[20rem] md:fixed md:top-34 md:left-5"
    >
      <h4 className="text-center font-semibold text-lg mb-4">
        Add A New Recipe:
      </h4>
      <RecipeAddForm handleAddRecipe={handleAddRecipe} />
    </div>
  );
}
