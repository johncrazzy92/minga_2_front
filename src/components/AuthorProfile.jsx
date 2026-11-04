import UbicationIcon from "../components/icons/UbicationIcon.jsx";
import BirthIcon from "../components/icons/BirthIcon.jsx";
import EditIcon from "../components/icons/EditIcon.jsx";


const AuthorProfile = ({ oneAuthor }) => {
  function upper(name) {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  }
  return (
    <>
      <div className="w-full h-1/3  gap-6  flex justify-center lg:justify-start lg:px-16 items-center  lg:mb-0 ">
        <img
          className="h-14 w-14 object-cover lg:w-52 lg:h-52 rounded-full border-2  border-black"
          src={oneAuthor.photo}
          alt="perfil img"
        />
        <div className="text-gray-500">
          <h1 className="text-black text-lg font-medium lg:text-3xl">
            {upper(oneAuthor.name) || "autor name"}{" "}
            {oneAuthor.last_name || upper(oneAuthor.last_name) || ""}
          </h1>
          <div className="flex items-center">
            <UbicationIcon />
            <p>
              {upper(oneAuthor.city) || oneAuthor.city || "city"},{" "}
              {upper(oneAuthor.country) || oneAuthor.country || "country"}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <BirthIcon />
            <p>
              {oneAuthor.date
                ? new Date(oneAuthor.date).toISOString().slice(0, 10).replace(/-/g, "/")
                : oneAuthor.createdAt
                ? new Date(oneAuthor.createdAt).toISOString().slice(0, 10).replace(/-/g, "/")
                : "Not specified"}
            </p>
          </div>
        </div>
        <EditIcon />
      </div>
    </>
  );
};

export default AuthorProfile;
