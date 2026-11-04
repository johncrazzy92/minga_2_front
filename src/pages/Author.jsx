import AuthorProfile from "../components/AuthorProfile";
import MangasAuthor from "../components/componentesMangas/MangasAuthor";
import { useEffect, useState } from "react";
import apiClient from "../services/apiClient.js";
import { useSelector } from "react-redux";

const Author = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const authorId = useSelector((store) => store.me_authorsReducer?.user?.author);

  useEffect(() => {
    if (!authorId) {
      setLoading(false);
      return;
    }

    if (!profile._id) {
      setLoading(true);
      apiClient
        .get("/authors/me/" + authorId)
        .then((res) => {
          setProfile(res.data.author || {});
        })
        .catch((err) => {
          console.error("Error fetching author profile:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [authorId, profile._id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading author profile...</p>
      </div>
    );
  }

  if (!authorId || !profile._id) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">No author profile found</h2>
        <p className="text-gray-500 mt-2">You don&apos;t have an active author account associated with this user.</p>
      </div>
    );
  }

  return (
    <>
      <AuthorProfile oneAuthor={profile} />
      {profile._id && <MangasAuthor profileId={profile._id} />}
    </>
  );
};

export default Author;
