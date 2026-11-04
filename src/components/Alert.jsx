const Alert = ({ show, setShow, message, data }) => {
  return (
    <div className='flex h-screen justify-center items-center absolute z-50'>
      <div className='min-h-32 w-64 bg-white flex flex-col items-center justify-center rounded-lg shadow-xl border'>
        {message && message.length > 0 ? (
          message.map((errorMessage, index) => (
            <h1
              key={index}
              className='min-h-2/3 w-full text-center border-b-2 rounded-t-lg p-3 text-sm font-medium'
            >
              {errorMessage}
            </h1>
          ))
        ) : data && data.message ? (
          <h1 className='min-h-2/3 w-full text-center border-b-2 rounded-t-lg p-3 text-sm font-medium'>
            {data.message}
          </h1>
        ) : null}
        <button
          onClick={() => setShow(!show)}
          className='h-1/3 w-full rounded-b-lg text-orange-600 font-bold p-2 hover:bg-orange-50 transition'
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Alert;
