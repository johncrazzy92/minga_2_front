import { useEffect, useState } from "react";
import NavBar from "../layouts/NavBar";
import apiClient from "../services/apiClient.js";
import { Link, useParams } from "react-router-dom";

const MangaDetails = () => {
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  async function getManga() {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.get(`/mangas/${id}`);
      setManga(data.manga || data.response || null);
    } catch (err) {
      console.error("Error fetching manga:", err);
      setError("Failed to load manga details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getManga();
    }
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen flex flex-col bg-gray-100 pt-20">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-[70vh]">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading manga details...</p>
          </div>
        ) : error || !manga ? (
          <div className="flex flex-col justify-center items-center h-[70vh] text-center px-4">
            <h2 className="text-2xl font-bold text-gray-800">Manga not found</h2>
            <p className="text-gray-500 mt-2">{error || "The requested manga does not exist or was removed."}</p>
            <Link
              to="/mangas"
              className="mt-6 px-6 py-2.5 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition"
            >
              Browse Mangas
            </Link>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center px-4 pb-16">
            <img
              className="w-64 h-88 object-cover p-2 rounded-3xl shadow-lg mt-6"
              src={manga?.cover_photo || "/img/image 15.jpg"}
              alt={manga?.title}
            />
            <h1 className="m-4 text-3xl md:text-4xl font-bold text-center text-gray-800">
              {manga?.title}
            </h1>
            <span className="px-4 py-1.5 rounded-xl bg-orange-100 text-orange-600 text-sm font-semibold">
              {manga?.category_id?.name || "Manga"}
            </span>

            <div className="flex w-full max-w-sm justify-evenly gap-2 my-6">
              <span className="text-2xl" role="img" aria-label="like">👍</span>
              <span className="text-2xl" role="img" aria-label="love">❤️</span>
              <span className="text-2xl" role="img" aria-label="wow">😮</span>
              <span className="text-2xl" role="img" aria-label="fire">🔥</span>
            </div>

            <div className="flex w-11/12 max-w-md h-16 justify-around items-center text-center bg-white rounded-2xl shadow-sm m-2 p-2">
              <div className="flex flex-col w-1/3 border-r">
                <p className="text-lg font-bold text-gray-800">4.5/5</p>
                <p className="text-xs text-gray-400">Rating</p>
              </div>
              <div className="flex flex-col w-1/3 border-r">
                <p className="text-lg font-bold text-gray-800">
                  {manga?.author_id?.name || "Author"}
                </p>
                <p className="text-xs text-gray-400">Author</p>
              </div>
              <div className="flex flex-col w-1/3">
                <p className="text-lg font-bold text-gray-800">Manga</p>
                <p className="text-xs text-gray-400">Type</p>
              </div>
            </div>

            <div className="w-11/12 max-w-xl bg-white p-6 rounded-2xl shadow-sm my-4">
              <h3 className="font-bold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {manga?.description || "No description provided."}
              </p>
            </div>

            <div className="flex gap-4 mt-4 w-full max-w-md px-4">
              <Link
                to={`/chapters/${manga?._id}`}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full text-center transition shadow"
              >
                View Chapters
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MangaDetails;
