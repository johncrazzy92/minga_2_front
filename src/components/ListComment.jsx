import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commentAction from '../redux/actions/commentAction';
import createComment from '../redux/actions/createCommentAction';
import EditComment from './EditComment';
import DeleteComment from './DeleteComment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BadWordsFilter from 'bad-words';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ open, setOpen, chapter_id, chapterName }) => {
  const comment = useRef();
  const { user, token } = useSelector(store => store.me_authorsReducer);
  const { comments } = useSelector(store => store.commentReducer);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState({
    show: false,
    comment: {}
  });
  const [delette, setDelette] = useState({
    show: false,
    comment: {}
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    loadComments(currentPage);
  }, [currentPage]);

  const loadComments = async (page) => {
    const result = await dispatch(commentAction({
      chapter_id,
      token,
      page,
    }));

    if (result.payload) {
      setTotalPages(result.payload.totalPages);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const sendAndCreateComment = async () => {
    const commentText = comment.current.value;
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
      chapter_id,
      text: commentText,
      user_id: user.id,
      token
    };


    try {
      await dispatch(createComment(info));

      comment.current.value = '';
      toast.success('Comment created successfully');

      loadComments(currentPage);
    } catch (error) {
      toast.error('Error creating comment');
    }
  };

  const editComment = (comment) => {
    setEdit({
      show: true,
      comment
    });
  };

  const deleteComment = (comment) => {
    setDelette({
      show: true,
      comment
    });
  };

  return (
    <>
      <ToastContainer />
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-black'>
        <div className='w-full max-w-md p-4 bg-white rounded-lg shadow-md'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-bold'>{chapterName}</h1>
            <button onClick={() => setOpen(!open)} className='text-gray-600 hover:text-gray-800 focus:outline-none'>
              X
            </button>
          </div>
          <div className='mt-4'>
            <div className='w-full mb-1 p-4'>
              <div className='flex flex-col gap-1 w-full mb-1 p-4 max-h-60 overflow-y-auto' style={{ width: '100%' }}>
                {comments.map((comment, index) => (
                  <div key={index} className='rounded-xl  p-1'>
                    {
                      (comment.user_id?.email === user.email) ?
                        <div className='flex justify-between gap-2'>
                          <button onClick={() => deleteComment(comment)}>
                            <img src="../img/borrar.svg" alt="" />
                          </button>
                          <button onClick={() => editComment(comment)}>
                            <img src="../img/editar.svg" alt="" />
                          </button>
                          <h2>{comment.user_id?.email || ''}</h2>
                          <img src={comment.user_id?.photo} className='w-8 rounded-full object-cover' alt="" />
                        </div> :
                        <div className='flex items-center gap-2'>
                          <img src={comment.user_id?.photo} className='w-8 rounded-full object-cover' alt="" />
                          <h2>{comment.user_id?.email || ''}</h2>
                        </div>
                    }
                    {edit.show ? <EditComment edit={edit} setEdit={setEdit} user={user} token={token} /> : null}
                    {delette.show ? <DeleteComment delette={delette} setDelette={setDelette} user={user} token={token} /> : null}
                    <div className='w-full p-3'>
                      <p>{comment.text}</p>
                    </div>
                    <div className='w-full text-center text-xs text-[#666]'>
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Pagination controls */}
            <div className='flex justify-center mt-4'>
              {currentPage > 1 && (
                <button onClick={() => handlePageChange(currentPage - 1)} className='mr-2'>
                  Previous Page
                </button>
              )}
              {currentPage < totalPages && (
                <button onClick={() => handlePageChange(currentPage + 1)} className='ml-2'>
                  Next Page
                </button>
              )}
            </div>
            {/* Mostrar la cantidad de páginas */}
            <div className='text-center mt-2'>
              Page {currentPage} of {totalPages}
            </div>
            {/* Comment input */}
            <div className='flex border-2 border-[#999] rounded-lg'>
              <input ref={comment} className='w-full h-10 p-2 rounded-lg focus:outline-none' type="text" placeholder='Say something here...' />
              <button onClick={sendAndCreateComment} className='w-16 text-white'><img src="../img/enviar.png" alt="" /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;