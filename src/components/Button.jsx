import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Button() {
  const { token } = useSelector((store) => store.me_authorsReducer);

  const isAuthenticated = !!token;
  const buttonText = isAuthenticated ? "Explore Mangas!" : "Sign In!";
  const linkTo = isAuthenticated ? "/mangas" : "/login";

  return (
    <Link
      to={linkTo}
      className="text-orange-600 w-full lg:w-60 bg-white border p-3.5 gap-2.5 rounded-md text-2xl flex justify-center items-center pt-2 font-semibold shadow-sm hover:shadow transition"
    >
      {buttonText}
    </Link>
  );
}

export default Button;