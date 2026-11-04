import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import apiClient from '../services/apiClient.js';
import NavBar from '../layouts/NavBar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { filters } from "../redux/actions/mangasActions.js";

const Mangas = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [mangas, setMangas] = useState([]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const { page } = useParams();
  const [pageActual, setPageActual] = useState(Number(page) || 1);
  const [loading, setLoading] = useState(true);
  const [noElements, setNoElements] = useState(false);
  const [noElementsMessage, setNoElementsMessage] = useState("");

  const { check, text } = useSelector((store) => store.mangas);
  const dispatch = useDispatch();

  const arrayCategories = () => (check ? check.toString() : "");

  const getMangas = async () => {
    setLoading(true);
    const currentPage = Number(page) || 1;
    try {
      const res = await apiClient.get('/mangas', {
        params: {
          page: currentPage,
          title: text || undefined,
          category: arrayCategories() || undefined,
        },
      });

      const mangaList = res.data.mangas || res.data.response || [];
      if (mangaList.length === 0) {
        setNoElements(true);
        setNoElementsMessage("No mangas found matching your filters.");
      } else {
        setNoElements(false);
      }

      setMangas(mangaList);
      setPageActual(res.data.page || currentPage);
      setPrev(res.data.prev || null);
      setNext(res.data.next || null);
    } catch (err) {
      console.error("Error fetching mangas:", err);
      setNoElements(true);
      setNoElementsMessage("Could not load mangas. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const res = await apiClient.get('/categories');
      setCategories(res.data.response || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const applyFilters = (filterName, filterValue) => {
    if (filterName === 'text') {
      dispatch(filters({
        checks: null,
        text: filterValue
      }));
    } else if (filterName === 'check') {
      const currentChecks = check || [];
      if (!currentChecks.includes(filterValue)) {
        dispatch(filters({
          checks: [...currentChecks, filterValue],
          text: null
        }));
      } else {
        dispatch(filters({
          checks: currentChecks.filter((categoryId) => categoryId !== filterValue),
          text: null
        }));
      }
    }
    navigate(`/mangas/1`);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getMangas();
  }, [page, text, check]);

  const handleNext = () => {
    if (next) {
      const nextPage = pageActual + 1;
      navigate(`/mangas/${nextPage}`);
    }
  };

  const handlePrev = () => {
    if (prev) {
      const prevPage = pageActual - 1;
      navigate(`/mangas/${prevPage}`);
    }
  };

  return (
    <>
      <img
        className='absolute max-h-[35vh] sm:max-h-[40vh] md:max-h-[45vh] w-full object-cover rounded-b-2xl'
        src='/img/bg-mangas.png'
        alt='Background'
      />
      <NavBar />
      <div className='flex flex-col justify-center items-center w-full'>
        <div className="z-20 w-11/12 max-w-2xl text-center">
          <h1 className='pt-24 text-white text-5xl md:text-6xl font-bold'>Mangas</h1>
          <input
            onInput={(e) => applyFilters('text', e.target.value)}
            className='rounded-xl shadow h-12 px-5 w-full mt-8 focus:outline-none focus:ring-2 focus:ring-orange-500'
            type="text"
            placeholder='🔍 Find your manga here...'
          />
        </div>

        <div className='flex flex-wrap items-center justify-center z-20 mt-4 gap-2 px-4'>
          {categories?.map((cat) => {
            const isSelected = (check || []).includes(cat._id);
            return (
              <button
                onClick={() => applyFilters('check', cat._id)}
                key={cat._id}
                className={`rounded-full px-4 py-1 text-xs font-semibold transition border ${
                  isSelected ? 'ring-2 ring-white text-white' : 'text-white opacity-90'
                }`}
                style={{ backgroundColor: cat.color || '#f97316' }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full min-h-[47vh] justify-center items-center flex flex-wrap gap-6 px-4 py-10 max-w-6xl mx-auto">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading mangas...</p>
          </div>
        ) : noElements ? (
          <div className="text-center py-20 text-gray-500 font-medium text-lg">
            {noElementsMessage}
          </div>
        ) : (
          mangas?.map((manga) => (
            <div
              className='bg-white relative w-[290px] h-[160px] flex justify-between items-center rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden'
              key={manga._id}
            >
              <div
                className='h-full w-2 flex-shrink-0'
                style={{ background: manga?.category_id?.color || '#f97316' }}
              ></div>
              <div className='flex flex-col justify-between p-3 flex-grow h-full'>
                <div>
                  <h3 className='text-neutral-800 text-sm font-bold line-clamp-2'>
                    {manga.title}
                  </h3>
                  <span
                    className='text-xs font-medium block mt-1'
                    style={{ color: manga.category_id?.color || '#f97316' }}
                  >
                    {manga.category_id?.name || "Manga"}
                  </span>
                </div>
                <div>
                  <Link
                    to={`/manga/${manga._id}`}
                    className='px-4 py-1.5 cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs rounded-full inline-block transition'
                  >
                    Read
                  </Link>
                </div>
              </div>
              <div className="w-28 h-full flex-shrink-0">
                <img
                  className='h-full w-full object-cover rounded-l-2xl'
                  src={manga.cover_photo || '/img/image 15.jpg'}
                  alt={manga.title}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className='flex gap-4 justify-center items-center my-6'>
        <button
          className="px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-full font-semibold transition"
          disabled={!prev}
          onClick={handlePrev}
        >
          Previous
        </button>
        <span className="text-gray-600 font-medium text-sm">Page {pageActual}</span>
        <button
          className='px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-full font-semibold transition'
          disabled={!next}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Mangas;