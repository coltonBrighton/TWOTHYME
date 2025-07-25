type Props = {
  closeRecipeModal: () => void;
  handleSaveClick: () => void;
  handleEditClick: () => void;
  isEditMode: boolean;
};

export default function ModalButtons({
  closeRecipeModal,
  handleSaveClick,
  handleEditClick,
  isEditMode,
}: Props) {
  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={closeRecipeModal}
        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition duration-200"
      >
        Close
      </button>
      {isEditMode ? (
        <button
          onClick={handleSaveClick}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={handleEditClick}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition duration-200"
        >
          Edit
        </button>
      )}
    </div>
  );
}
