const AlertAcept = ({ id, setShow, show, activeUpdater }) => {
  return (
    <div className="z-50 bg-black bg-opacity-50 h-screen w-full absolute flex justify-center items-center">
      <div className="bg-white min-h-20 w-64 rounded-lg">
        <div className="h-3/5 flex items-center flex-col gap-2 p-3">
          <p className="text-center font-semibold">
            Are you sure you want to continue?
          </p>
        </div>
        <div className="h-10">
          <p
            onClick={() => {
              setShow(!show);
              activeUpdater(id);
            }}
            className="text-sky-400 cursor-pointer font-semibold text-xl text-center border-t border-1"
          >
            Yes, I&apos;m sure
          </p>
        </div>
        <div className="h-10">
          <p
            onClick={() => setShow(!show)}
            className="text-sky-400 cursor-pointer font-semibold text-xl text-center border-t border-1"
          >
            No
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertAcept;