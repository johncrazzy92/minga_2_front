import { useDispatch } from "react-redux";
import actions from "../../redux/actions/mangas.js";

const { deleteManga } = actions;

const AlertDelete = ({ setShowDelete, manga }) => {
  const dispatch = useDispatch();

  const handleConfirmDelete = () => {
    if (manga && manga._id) {
      dispatch(deleteManga(manga._id));
    }
    setShowDelete(false);
  };

  return (
    <div className="drop-shadow-md fixed z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl border max-w-sm w-11/12">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xl font-bold">
          ⚠️
        </div>
        <h3 className="font-bold text-gray-800 text-lg">Are you sure?</h3>
        <p className="text-sm text-gray-500">
          This will permanently delete <span className="font-semibold text-gray-700">&quot;{manga?.title}&quot;</span> and all its associated chapters.
        </p>

        <div className="flex gap-3 w-full mt-2">
          <button
            type="button"
            onClick={() => setShowDelete(false)}
            className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-sm transition shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDelete;
