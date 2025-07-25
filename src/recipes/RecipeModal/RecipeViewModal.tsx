import { recipe } from "../../../types";
import { ChangeEvent, useEffect, useState } from "react";
import ModalButtons from "./ModalButtons";
import ModalForm from "./ModalForm";

type Props = {
  showModal: boolean;
  selectedRecipe: recipe;
  closeRecipeModal: () => void;
  updateRecipe: (updatedRecipe: recipe) => void;
};

export default function RecipeViewModal({
  showModal,
  selectedRecipe,
  closeRecipeModal,
  updateRecipe,
}: Props) {
  const [editedRecipe, setEditedRecipe] = useState<recipe>(selectedRecipe);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedRecipe({
      ...editedRecipe,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    updateRecipe(editedRecipe);
    setIsEditMode(false);
    closeRecipeModal();
  };

  useEffect(() => {
    setEditedRecipe(selectedRecipe);
  }, [selectedRecipe]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-slate-800 w-full max-w-xl rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedRecipe.name}
          </h2>
          <button
            onClick={closeRecipeModal}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-4 bg-gray-900 text-white">
          {isEditMode ? (
            <ModalForm
              handleChange={handleChange}
              editedRecipe={editedRecipe}
            />
          ) : (
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-blue-400">Ingredients:</h5>
                <p className="text-sm text-gray-200">{selectedRecipe.ingredients}</p>
              </div>
              <div>
                <h5 className="font-semibold text-blue-400">Instructions:</h5>
                <p className="text-sm text-gray-200">{selectedRecipe.instructions}</p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-800 border-t border-gray-200 flex justify-end">
          <ModalButtons
            isEditMode={isEditMode}
            closeRecipeModal={closeRecipeModal}
            handleSaveClick={handleSaveClick}
            handleEditClick={handleEditClick}
          />
        </div>
      </div>
    </div>
  );
}
