import { useState, useEffect, useRef } from 'react';
import Alert from '../components/Alert';
import apiClient from '../services/apiClient.js';
import NavBar from '../layouts/NavBar';
import { useParams } from 'react-router';
import ChapterUpload from './componentesMangas/ChapterUpload';

const ChapterForm = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState([]);
  const [dataResponse, setDataResponse] = useState(null);
  const [imgUp, setImgUp] = useState([]);
  const { id } = useParams();

  const title = useRef();
  const order = useRef();
  const pages = useRef();

  const handleForm = async () => {
    const inputTitle = title.current.value;
    const inputOrder = order.current.value;

    const formData = new FormData();

    const newChapterData = {
      manga_id: id,
      title: inputTitle,
      order: inputOrder,
    };

    formData.append('chapterData', JSON.stringify(newChapterData));

    imgUp.forEach((file) => {
      formData.append(`file`, file);
    });

    try {
      const { data } = await apiClient.post("/chapters", formData);
      setMessage([]);
      setDataResponse(data);
    } catch (error) {
      console.error("Error creating chapter:", error);
      const rawMsg = error.response?.data?.message || 'Error creating chapter';
      setMessage(Array.isArray(rawMsg) ? rawMsg : [rawMsg]);
      setDataResponse(null);
    }
  };

  useEffect(() => {
    if ((dataResponse && dataResponse.message) || message.length > 0) {
      setShow(true);
    }
  }, [dataResponse, message]);

  return (
    <>
      <NavBar />
      <div className='min-h-screen bg-slate-100 flex flex-col justify-center items-center py-10'>
        <form encType="multipart/form-data" className='flex flex-col h-2/3 w-2/3 items-center'>
          <label className='text-2xl pb-5 font-bold text-gray-800'>New Chapter</label>
          <input type="text" className='border-b-2 border-neutral-400 bg-slate-100 text-sm pt-5 w-full md:w-1/2 focus:outline-none focus:border-orange-500' ref={title} placeholder='  Insert title' />
          <input type="number" className='border-b-2 border-neutral-400 bg-slate-100 text-sm pt-5 w-full md:w-1/2 focus:outline-none focus:border-orange-500' ref={order} placeholder='  Insert order' />
          <input type="text" className='border-b-2 border-neutral-400 bg-slate-100 text-sm pt-5 w-full md:hidden' ref={pages} placeholder='  Insert pages' />
          <ChapterUpload setImgUp={setImgUp} imgUp={imgUp} />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleForm();
            }}
            className='bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-5 mt-10 rounded-full w-full md:w-1/2 transition duration-200'
          >
            Send
          </button>
        </form>
        {show && <Alert show={show} message={message} data={dataResponse} setShow={setShow} />}
      </div>
    </>
  );
};

export default ChapterForm;