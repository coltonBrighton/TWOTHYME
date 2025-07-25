import type { recipe } from "../../../types";

type Props = {
  showModal: boolean;
  closeModal: () => void;
  selectedRecipe: recipe;
};

export default function MealPlannerViewModal({
  showModal,
  closeModal,
  selectedRecipe,
}: Props) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-slate-800 rounded-4xl shadow-md w-full max-w-md">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">{selectedRecipe.name}</h2>
          <button
            className="text-gray-400 hover:text-gray-200"
            onClick={closeModal}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="px-4 py-3 text-gray-300">
          <h5 className="font-medium mb-1">Ingredients:</h5>
          <p className="mb-3">{selectedRecipe.ingredients}</p>
          <h5 className="font-medium mb-1">Instructions:</h5>
          <p>{selectedRecipe.instructions}</p>
        </div>
        <div className="flex justify-end px-4 py-3 border-t border-slate-700">
          <button
            className="px-4 py-2 rounded border border-blue-500 text-blue-500 hover:bg-blue-50 transition"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
