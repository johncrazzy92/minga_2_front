import { useState, useEffect } from "react";
import NavBar from "../layouts/NavBar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import NewManga from "../components/NewManga";
import EditModal from "../components/EditModal";
import AlertDelete from "../components/componentesMangas/AlertDelete.jsx";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions/mangas.js";

const { mymangas } = actions;

const MyMangas = () => {
  const dispatch = useDispatch();
  const [manga, setManga] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const mangasList = useSelector((store) => store.myMangasReducer?.mangas) || [];
  const loading = useSelector((store) => store.myMangasReducer?.loading);

  useEffect(() => {
    dispatch(mymangas());
  }, [dispatch]);

  return (
    <>
      <img
        className="absolute max-h-[35vh] w-full object-cover rounded-b-2xl"
        src="/img/image 15.jpg"
        alt="Banner"
      />
      <NavBar />
      <div className="flex flex-col justify-center items-center w-full min-h-screen pt-12">
        <h1 className="text-4xl md:text-6xl py-24 z-30 text-white font-bold">
          My Mangas
        </h1>

        <div className="flex min-h-[50vh] flex-wrap justify-center items-center gap-6 px-4 py-8 max-w-6xl w-full">
          <NewManga />

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Loading your mangas...</p>
            </div>
          ) : mangasList.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm text-center max-w-md">
              <span className="text-4xl mb-3">📚</span>
              <h3 className="text-lg font-bold text-gray-800">No mangas published yet</h3>
              <p className="text-gray-500 text-sm mt-1">
                You haven&apos;t created any manga titles. Click the card on the left to publish your first manga!
              </p>
            </div>
          ) : (
            mangasList.map((item) => (
              <div
                className="bg-white relative w-[290px] h-[160px] lg:w-[400px] lg:h-[200px] flex justify-between items-center rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
                key={item._id}
              >
                <div
                  className="h-full w-2.5 flex-shrink-0"
                  style={{ background: item.category_id?.color || "#f97316" }}
                ></div>

                <div className="flex flex-col justify-between p-4 flex-grow h-full">
                  <div className="flex gap-3 items-center">
                    <Link
                      to={"/chapter-form/" + item._id}
                      className="p-1.5 bg-orange-50 hover:bg-orange-100 rounded-lg text-sm transition"
                      title="Add Chapter"
                    >
                      ➕ Add Chapter
                    </Link>
                    <Link
                      to={"/edit/" + item._id}
                      className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm transition"
                      title="Manage Chapters"
                    >
                      📑 Chapters
                    </Link>
                  </div>

                  <div>
                    <h3 className="text-base lg:text-lg font-bold text-gray-800 line-clamp-1">
                      {item.title}
                    </h3>
                    <p
                      className="text-xs font-semibold mt-0.5"
                      style={{ color: item.category_id?.color || "#f97316" }}
                    >
                      {item.category_id?.name || "Manga"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setManga(item);
                        setIsOpen(true);
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs py-1.5 px-4 rounded-full transition shadow-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setManga(item);
                        setShowDelete(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold text-xs py-1.5 px-4 rounded-full transition shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="w-28 lg:w-36 h-full flex-shrink-0">
                  <img
                    className="h-full w-full object-cover rounded-l-2xl"
                    src={item.cover_photo || "/img/image 15.jpg"}
                    alt={item.title}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />

      {isOpen && (
        <EditModal
          manga={manga}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      )}

      {showDelete && (
        <AlertDelete
          setShowDelete={setShowDelete}
          manga={manga}
        />
      )}
    </>
  );
};

export default MyMangas;