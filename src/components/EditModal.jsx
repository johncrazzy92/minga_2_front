import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import apiClient from "../services/apiClient.js";
import actions from "../../src/redux/actions/mangas.js";

const { updateManga } = actions;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1.25rem',
    border: 'none',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '2rem',
    maxWidth: '450px',
    width: '90%',
  },
};

Modal.setAppElement('#root');

const EditModal = ({ setIsOpen, isOpen, manga, setShow }) => {
  const dispatch = useDispatch();
  const titleInput = useRef();
  const categoryInput = useRef();
  const imageInput = useRef();
  const descriptionInput = useRef();

  const [categories, setCategories] = useState([]);

  const onCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    apiClient
      .get("/categories")
      .then((response) => {
        setCategories(response.data.response || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCloseModal();
    if (setShow) setShow(true);

    const selectedCategoryName = categoryInput.current?.value;
    const matchedCategory = categories.find((c) => c.name === selectedCategoryName);
    const category_id = matchedCategory?._id || manga.category_id?._id || manga.category_id;
    const title = titleInput.current?.value || manga.title;
    const cover_photo = imageInput.current?.value || manga.cover_photo;
    const description = descriptionInput.current?.value || manga.description;
    const id = manga._id;

    dispatch(updateManga({ id, title, cover_photo, description, category_id }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">{manga?.title || "Edit Manga"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">Title</label>
          <input
            className="border rounded-lg p-2 text-sm focus:outline-none focus:border-orange-500"
            defaultValue={manga?.title || ""}
            ref={titleInput}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">Cover photo URL</label>
          <input
            className="border rounded-lg p-2 text-sm focus:outline-none focus:border-orange-500"
            defaultValue={manga?.cover_photo || ""}
            ref={imageInput}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">Category</label>
          <select
            ref={categoryInput}
            className="border rounded-lg p-2 text-sm focus:outline-none focus:border-orange-500 bg-white"
            defaultValue={manga?.category_id?.name || ""}
          >
            <option value="" disabled>
              {manga?.category_id?.name || "Select Category"}
            </option>
            {categories.map((cat) => (
              <option key={cat._id || cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">Description</label>
          <textarea
            className="border rounded-lg p-2 text-sm focus:outline-none focus:border-orange-500"
            defaultValue={manga?.description || ""}
            rows="4"
            ref={descriptionInput}
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onCloseModal}
            className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition shadow-sm"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;