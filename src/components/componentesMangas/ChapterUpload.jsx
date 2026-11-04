const ChapterUpload = ({setImgUp,imgUp}) => {

    
// useEffect(() => {
//     console.log(imgUp);
// }, [imgUp]);

    return (
      <div className="hidden md:flex ">
        <label className="cursor-pointer bg-orange-600 rounded-md w-28 flex justify-center items-center text-white h-8">
          Upload img
          <input
            type="file"
            name='file'
            multiple
            accept=".png,.jpeg,.jpg"
            style={{ display: "none" }}
            onChange={(e) => {

              setImgUp(Array.from(e.target.files));

            }}
          />
        </label>
        {imgUp ? (
          <p className="flex justify-center items-center">
            {imgUp?.length} archivo(s) seleccionado(s)
          </p>
        ) : (
          <p className="flex justify-center items-center">
            Ningún archivo seleccionado
          </p>
        )}
      </div>
    );
}

export default ChapterUpload