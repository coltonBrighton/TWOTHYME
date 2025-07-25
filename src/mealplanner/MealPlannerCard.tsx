import { recipe, mealplan } from "../../types";

type Props = {
  handleDelete: (id: number | undefined) => void;
  recipe: recipe | undefined;
  mealPlan: mealplan;
  handleButtonClick: (recipe: recipe | undefined) => void;
};

export default function MealPlannerCard({
  handleDelete,
  recipe,
  mealPlan,
  handleButtonClick,
}: Props) {
  return (
    <div>
      <div
        className="bg-slate-800 rounded-4xl shadow-md my-3 w-72 min-h-[400px] flex flex-col"
        key={mealPlan?.id}
      >
        <div className="p-4 flex-1">
          <h2 className="text-xl font-semibold mb-2">{recipe?.name}</h2>
          <p className="text-gray-400">{recipe?.description}</p>
        </div>
        <div className="flex flex-col mt-auto px-4 pb-4">
          <button
            className="mb-3 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition"
            onClick={() => handleButtonClick(recipe)}
          >
            View Recipe
          </button>
          <button
            className="mb-3 px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-50 transition"
            onClick={() => handleDelete(mealPlan?.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
