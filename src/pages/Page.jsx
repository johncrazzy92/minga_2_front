import { useEffect, useState } from "react";
import PageComments from "../components/PageComment";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient.js";
import flechaManga from "../../public/img/FlechaManga.svg";
import NavBar from "../layouts/NavBar";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from 'react-redux';
import { saveChapter } from '../redux/actions/chapters';

const Page = () => {
  const [chapter, setChapter] = useState(null);
  const [next, setNext] = useState("");
  const [loading, setLoading] = useState(true);
  const { id, page } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, number } = useSelector((store) => store.chapter);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiClient
      .get(`/chapters/${id}`)
      .then((res) => {
        const chapterData = res.data.all || res.data.response || res.data.chapter;
        setChapter(chapterData);
        setNext(res.data.next || "");
        if (chapterData) {
          dispatch(saveChapter(chapterData));
        }
      })
      .catch((err) => {
        console.error("Error loading chapter page:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, dispatch]);

  const currentPageNum = Number(page) || 1;
  const totalPages = chapter?.pages?.length || 0;

  const handleNext = () => {
    if (!chapter || !chapter.pages) return;
    if (currentPageNum >= totalPages) {
      if (next) {
        navigate(`/chapterPage/${next}/1`);
      } else {
        navigate(`/manga/${chapter.manga_id}`);
      }
    } else {
      navigate(`/chapterPage/${id}/${currentPageNum + 1}`);
    }
  };

  const handlePrev = () => {
    if (!chapter) return;
    if (currentPageNum <= 1) {
      navigate(`/manga/${chapter.manga_id}`);
    } else {
      navigate(`/chapterPage/${id}/${currentPageNum - 1}`);
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen bg-gray-50 flex flex-col justify-between">
        <div>
          <div className="w-full h-28 bg-gradient-to-t from-orange-500 to-orange-600 text-center flex flex-col justify-center items-center shadow-sm">
            <p className="text-white text-xs font-semibold uppercase tracking-wider">
              Chapter #{Number(number) || chapter?.order || ""} — Page {currentPageNum} of {totalPages}
            </p>
            <h1 className="text-white text-lg font-bold mt-1">{title || chapter?.title || ""}</h1>
          </div>

          {loading ? (
            <div className="w-full py-32 flex flex-col justify-center items-center">
              <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500 text-sm">Loading page...</p>
            </div>
          ) : !chapter || !chapter.pages || chapter.pages.length === 0 ? (
            <div className="w-full py-32 flex flex-col justify-center items-center text-center px-4">
              <p className="text-gray-600 text-lg">No pages available for this chapter.</p>
              <button
                onClick={() => navigate(-1)}
                className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition"
              >
                Go Back
              </button>
            </div>
          ) : (
            <div className="w-full mt-6 flex items-center justify-center relative px-4 max-w-4xl mx-auto">
              <div onClick={handlePrev} className="cursor-pointer z-10" title="Previous page">
                <img
                  className="bg-white rounded-full p-3 shadow-md hover:scale-105 transition opacity-80 hover:opacity-100"
                  src={flechaManga}
                  alt="Previous"
                />
              </div>

              <div className="flex-1 flex justify-center items-center px-4">
                <img
                  className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg border"
                  src={chapter?.pages[currentPageNum - 1]}
                  alt={`Page ${currentPageNum}`}
                />
              </div>

              <div onClick={handleNext} className="cursor-pointer z-10" title="Next page">
                <img
                  className="rotate-180 bg-white rounded-full p-3 shadow-md hover:scale-105 transition opacity-80 hover:opacity-100"
                  src={flechaManga}
                  alt="Next"
                />
              </div>
            </div>
          )}

          <PageComments />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
