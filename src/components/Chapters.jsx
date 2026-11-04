import { useEffect, useState } from "react";
import NavBar from "../layouts/NavBar";
import apiClient from "../services/apiClient.js";
import { Link, useParams } from "react-router-dom";
import ListComments from "./ListComment";

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterId, setChapterId] = useState('');
  const { id } = useParams();

  async function getChapters() {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.get(`/chapters?manga_id=${id}`);
      setChapters(Array.isArray(data) ? data : (data.response || []));
    } catch (err) {
      console.error("Error loading chapters:", err);
      setError("Failed to load chapters for this manga");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getChapters();
    }
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="bg-gray-200 pt-28 w-full min-h-screen">
        <div className="flex flex-col w-full mb-2 ps-4 pe-4 max-w-4xl mx-auto">
          <p className="text-center mb-4 text-2xl font-bold text-gray-800">Chapters</p>
          <div className="flex">
            <Link
              to={"/manga/" + id}
              className="w-1/2 h-8 bg-gray-200 rounded-full text-gray-700 text-center flex items-center justify-center border border-slate-300 hover:border-black font-medium"
            >
              Manga
            </Link>
            <Link
              to="#"
              className="h-8 w-1/2 bg-orange-500 rounded-full text-white text-center flex items-center justify-center border hover:border-black font-medium"
            >
              Chapters
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading chapters...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500 font-medium">
            <p>{error}</p>
            <button
              onClick={getChapters}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              Retry
            </button>
          </div>
        ) : chapters.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No chapters available for this manga yet.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto flex flex-col gap-3 pb-12">
            {chapters.map((chapter) => (
              <div
                key={chapter?._id}
                className="flex justify-between items-center bg-white mx-4 p-3 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl"
                    src={chapter?.cover_photo || "/img/image 15.jpg"}
                    alt={chapter?.title}
                  />
                  <div>
                    <p className="font-bold text-gray-800">{chapter?.title}</p>
                    <p className="text-sm text-gray-500">Chapter #{chapter?.order}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setChapterId(chapter._id);
                      setChapterTitle(chapter.title);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    title="Comments"
                  >
                    <img src="../img/puntos.png" alt="Options" className="w-5 h-5" />
                  </button>
                  <Link
                    to={`/chapterPage/${chapter._id}/1`}
                    className="bg-orange-500 hover:bg-orange-600 w-20 md:w-24 h-10 rounded-full text-white font-bold justify-center items-center flex transition"
                  >
                    Read
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {open && (
          <ListComments
            open={open}
            setOpen={setOpen}
            chapter_id={chapterId}
            chapterName={chapterTitle}
          />
        )}
      </div>
    </>
  );
};

export default Chapters;
