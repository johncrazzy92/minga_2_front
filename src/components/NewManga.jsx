import { Link } from "react-router-dom";

function NewManga() {
  return (
    <Link
      to="/manga-form"
      className="bg-white cursor-pointer relative w-[290px] h-[160px] lg:w-[420px] lg:h-[210px] m-3 flex justify-between items-center rounded-lg drop-shadow-md hover:drop-shadow-xl hover:scale-[1.02] transition-all duration-200 group border border-gray-100"
    >
      <div className="h-5/6 w-2 bg-orange-500 rounded-r group-hover:bg-orange-600 transition-colors"></div>
      <div className="flex flex-col">
        <div className="text-sm lg:text-xl font-bold absolute top-8 left-6 text-gray-800 group-hover:text-orange-600 transition-colors">
          New Manga
        </div>
        <div className="text-xs text-gray-400 absolute bottom-8 left-6 font-medium flex items-center gap-1 group-hover:text-orange-500 transition-colors">
          <span className="text-base font-bold">+</span> Create volume
        </div>
      </div>
      <div className="w-1/3 h-full flex items-center justify-end overflow-hidden">
        <img
          className="h-[160px] lg:h-[210px] object-cover rounded-l-full group-hover:scale-105 transition-transform duration-300"
          src="/img/newManga.webp"
          alt="Create New Manga"
          onError={(e) => {
            e.target.src = "/img/Logo Dos.png";
          }}
        />
      </div>
    </Link>
  );
}

export default NewManga;