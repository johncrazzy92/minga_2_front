import { useEffect, useRef, useState } from "react";
import Alert from "../components/componentesMangas/Alert";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../services/apiClient.js";
import { postOneManga } from "../../src/redux/actions/mangaAction.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MangaForm = () => {
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState([]);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [imgUp, setImgUp] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authorId = useSelector((store) => store.me_authorsReducer?.user?.author);

  const titleInput = useRef();
  const categoryInput = useRef();
  const imageInput = useRef();
  const descriptionInput = useRef();

  async function postManga(event) {
    event.preventDefault();

    const title = titleInput.current?.value?.trim();
    const category = categoryInput.current?.value;
    const description = descriptionInput.current?.value?.trim();
    const coverPhoto = imageInput.current?.value?.trim() || image;

    if (!title || !category || !description) {
      setAlert(["Title, category, and description are required."]);
      setShow(true);
      return;
    }

    setLoading(true);
    const formData = new FormData();

    const mangaToPost = {
      author_id: authorId,
      title: title,
      category_id: category,
      cover_photo: coverPhoto || "https://placehold.co/400x600?text=Manga+Cover",
      description: description,
    };

    formData.append("manga", JSON.stringify(mangaToPost));
    if (imgUp) {
      formData.append("file", imgUp);
    }

    try {
      const response = await apiClient.post("/mangas", formData);
      const createdManga = response.data?.response;
      if (createdManga) {
        dispatch(postOneManga(createdManga));
      }

      Swal.fire({
        icon: "success",
        title: "Manga Created!",
        text: "Your new manga has been successfully registered.",
      }).then(() => {
        navigate("/mymangas");
      });
    } catch (err) {
      console.error("Error creating manga:", err);
      const rawMsg = err.response?.data?.message || "Failed to create manga.";
      setAlert(Array.isArray(rawMsg) ? rawMsg : [rawMsg]);
      setShow(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    apiClient
      .get("/categories")
      .then((res) => {
        setCategories(res.data.response || []);
      })
      .catch((err) => {
        console.error("Error loading categories:", err);
      });
  }, []);

  return (
    <>
      {show && <Alert alert={alert} setShow={setShow} show={show} />}
      <div className="w-full min-h-screen flex justify-center items-center py-24 px-4 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-12 max-w-4xl w-full bg-white p-8 sm:p-12 rounded-3xl shadow-md">
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="font-bold text-3xl sm:text-4xl text-gray-800 mb-6">New Manga</h1>
            <form onSubmit={postManga} className="flex flex-col gap-4" encType="multipart/form-data">
              <div>
                <label className="text-xs font-semibold text-gray-600">Title</label>
                <input
                  ref={titleInput}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500 mt-1"
                  type="text"
                  placeholder="Insert title"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">Category</label>
                <select
                  ref={categoryInput}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500 bg-white mt-1"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id || cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">Cover Photo URL</label>
                <input
                  ref={imageInput}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500 mt-1"
                  type="url"
                  placeholder="https://example.com/cover.jpg"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition">
                  Upload file
                  <input
                    type="file"
                    accept=".png,.jpeg,.jpg,.webp"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImgUp(e.target.files[0]);
                        setImage(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </label>
                <span className="text-xs text-gray-500 truncate max-w-xs">
                  {imgUp ? imgUp.name : "No file chosen"}
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">Description</label>
                <textarea
                  ref={descriptionInput}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500 mt-1"
                  rows="4"
                  placeholder="Insert manga description"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full mt-4 transition shadow disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Create Manga"}
              </button>
            </form>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center border-l lg:pl-12">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">Cover Preview</h3>
            <div className="w-56 h-80 rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center bg-gray-100 shadow-inner">
              {image ? (
                <img className="w-full h-full object-cover" src={image} alt="Preview" />
              ) : (
                <span className="text-gray-400 text-xs text-center px-4">
                  Image preview will appear here
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MangaForm;
