import { useState, useRef } from 'react';
import editComment from '../redux/actions/editComment';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BadWordsFilter from 'bad-words';

const EditComment = ({ edit, setEdit, _user, token }) => {
  const [commentText, setCommentText] = useState(edit.comment.text); // Estado local para el texto del comentario
  const commentInput = useRef();
  const dispatch = useDispatch();

  const sendEditComment = async () => {
    const filter = new BadWordsFilter();
    if (filter.isProfane(commentText)) {
      toast.error('This comment contains inappropriate words');
      return;
    }
    if (!commentText.trim()) {
      toast.error('This comment cannot be empty');
      return;
    }
    const info = {
      comment_id: edit.comment._id,
      text: commentText,
      token
    };

    // Dispatch de la acción asincrónica y espera la respuesta
    try {
      await dispatch(editComment(info));
      closeModal();
      toast.success('Comment edited');
    } catch (error) {
      toast.error('Error editing comment');
    }
  };

  const closeModal = () => {
    setEdit({
      show: false,
      comment: {}
    });
  }

  return (
    <>
      <ToastContainer />
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{edit.comment.user_id.email}</h3>
                    <div className="mt-2">
                      <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Large input</label>
                      <input
                        ref={commentInput}
                        type="text"
                        id="large-input"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        value={commentText} // Establece el valor del input con el estado local
                        onChange={(e) => setCommentText(e.target.value)} // Maneja el cambio en el input
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-0 sm:ml-4 sm:flex-shrink-0 sm:flex sm:items-center">                  
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button onClick={sendEditComment} type="button" className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 sm:ml-3 sm:w-auto">Edit</button>
                <button onClick={closeModal} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditComment;







