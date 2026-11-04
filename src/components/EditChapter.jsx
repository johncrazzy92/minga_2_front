import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import apiClient from '../services/apiClient.js';
import NavBar from '../layouts/NavBar';
import Index from './Index';
import Swal from 'sweetalert2';
import editChapterAction from '../redux/actions/editChapter.js';
import deleteChapterAction from '../redux/actions/deleteChapter.js';

const EditChapter = () => {
  const { user } = useSelector((store) => store.me_authorsReducer);
  const { manga_id } = useParams();

  const [chapters, setChapters] = useState([]);
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('/img/image 15.jpg');
  const [id, setId] = useState(null);
  const [editData, setEditData] = useState('');
  const [loading, setLoading] = useState(false);

  const chapterTitle = useRef();
  const chapterField = useRef();
  const chapterEditInfo = useRef();
  const dispatch = useDispatch();

  const getMangaChapters = async () => {
    if (!manga_id) return;
    setLoading(true);
    try {
      const response = await apiClient.get('/chapters/me?manga_id=' + manga_id);
      const mangaChaptersArray = Array.isArray(response.data) ? response.data : (response.data.response || []);
      setChapters(mangaChaptersArray);

      if (mangaChaptersArray.length > 0) {
        setTitle(mangaChaptersArray[0].title);
        setPhoto(mangaChaptersArray[0].cover_photo || '/img/image 15.jpg');
        setId(mangaChaptersArray[0]._id);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditManga = async (e) => {
    try {
      e.preventDefault();

      if (!id) {
        Swal.fire({
          icon: 'warning',
          title: 'Select a chapter',
          text: 'Please select a chapter to edit.',
        });
        return;
      }

      const { value: confirmEdit } = await Swal.fire({
        title: 'Are you sure about editing this chapter?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (!confirmEdit) {
        return;
      }

      const updatedChapter = {
        [chapterField.current.value]:
          chapterField.current.value === 'title'
            ? editData
            : chapterEditInfo.current.value,
      };

      try {
        await dispatch(editChapterAction({ id, info: updatedChapter, manga_id })).unwrap();
        Swal.fire({
          icon: 'success',
          title: 'Successful edition!',
          text: 'The chapter has been edited successfully.',
        });
        setEditData('');
        getMangaChapters();
      } catch (error) {
        console.error("Error editing chapter:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to edit chapter.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteManga = async (e) => {
    try {
      e.preventDefault();

      if (!id) {
        Swal.fire({
          icon: 'warning',
          title: 'Select a chapter',
          text: 'Please select a chapter to delete.',
        });
        return;
      }

      const { value: confirmDelete } = await Swal.fire({
        title: 'Are you sure to delete this chapter?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'No, cancel',
      });

      if (!confirmDelete) {
        return;
      }

      try {
        await dispatch(deleteChapterAction({ id, manga_id })).unwrap();
        Swal.fire({
          icon: 'success',
          title: 'Successful removal!',
          text: 'The chapter has been successfully deleted.',
        });
        getMangaChapters();
      } catch (error) {
        console.error("Error deleting chapter:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to delete chapter.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitle = (event) => {
    const titleValue = event.target.value;
    setTitle(titleValue);

    const selectedChapter = chapters.find((ch) => ch.title === titleValue);
    if (selectedChapter) {
      setPhoto(selectedChapter.cover_photo || '/img/image 15.jpg');
      setId(selectedChapter._id);
    } else {
      setPhoto('/img/image 15.jpg');
      setId(null);
    }
  };

  useEffect(() => {
    getMangaChapters();
  }, [manga_id]);

  const isAuthorOrAdmin = user && (user.role === 1 || user.role === 2 || user.role === 3);

  return (
    <>
      <NavBar />
      {isAuthorOrAdmin ? (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center pt-20 items-center md:flex-row px-4">
          <form className="flex flex-col h-auto w-full md:w-1/2 items-center max-w-lg bg-white p-8 rounded-2xl shadow-sm">
            <label className="text-2xl pb-5 font-bold text-gray-800">
              Edit Chapter
            </label>

            {loading ? (
              <p className="text-gray-500 py-4">Loading chapters...</p>
            ) : chapters.length === 0 ? (
              <p className="text-gray-500 py-4">No chapters found for this manga.</p>
            ) : (
              <>
                <div className="w-full mb-4">
                  <label className="text-xs text-gray-500 font-medium">Select Chapter</label>
                  <select
                    onChange={handleTitle}
                    ref={chapterTitle}
                    className="border-b-2 border-neutral-400 bg-white text-sm py-2 w-full focus:outline-none focus:border-orange-500"
                  >
                    {chapters.map((ch) => (
                      <option value={ch.title} key={ch._id}>
                        Chapter #{ch.order} — {ch.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full mb-4">
                  <label className="text-xs text-gray-500 font-medium">Field to update</label>
                  <select
                    ref={chapterField}
                    className="border-b-2 border-neutral-400 bg-white text-sm py-2 w-full focus:outline-none focus:border-orange-500"
                  >
                    <option value="title">Title</option>
                    <option value="cover_photo">Cover photo URL</option>
                    <option value="order">Order number</option>
                  </select>
                </div>

                <div className="w-full mb-6">
                  <label className="text-xs text-gray-500 font-medium">New Value</label>
                  <input
                    ref={chapterEditInfo}
                    type="text"
                    className="border-b-2 border-neutral-400 bg-white text-sm py-2 w-full focus:outline-none focus:border-orange-500"
                    placeholder="Enter new value"
                    value={editData}
                    onChange={(e) => setEditData(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleEditManga}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-5 rounded-full w-full transition duration-150 shadow"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleDeleteManga}
                  className="text-rose-500 bg-red-50 hover:bg-red-100 font-semibold py-3 px-5 mt-4 rounded-full w-full transition duration-150"
                >
                  Delete Chapter
                </button>
              </>
            )}
          </form>

          <div className="text-center mt-8 md:mt-0 md:h-2/3 md:flex md:flex-col md:items-center md:w-1/2 md:me-10">
            <h2 className="text-xl font-bold mb-4">{title ? `Preview: ${title}` : 'Chapter Preview'}</h2>
            <img className="h-80 w-64 object-cover rounded-2xl shadow-md border" src={photo} alt={title || "Chapter"} />
          </div>
        </div>
      ) : (
        <Index />
      )}
    </>
  );
};

export default EditChapter;
