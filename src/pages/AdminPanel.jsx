import { useEffect, useState } from "react";
import background from "../../public/img/background_admin.jfif";
import UserIcon from "../components/icons/UserIcon";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthors } from "../redux/actions/getAuthors";
import { updateActive } from "../redux/actions/updateActive";
import AlertAcept from "../components/componentesMangas/AlerteAcept";

export const AdminPanel = () => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const role = useSelector((store) => store.me_authorsReducer?.user?.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== undefined && role !== 3) {
      navigate("/");
    }
  }, [role, navigate]);

  const authors = useSelector((store) => store.authors) || {};
  const inactives = authors.inactive || [];
  const actives = authors.active || [];

  useEffect(() => {
    if (authors.firstReq === false) {
      dispatch(getAuthors());
    }
  }, [authors.firstReq, dispatch]);

  function upper(name) {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  }

  function activeUpdater(selectedId) {
    dispatch(updateActive(selectedId));
    setShow(!show);
  }

  return (
    <>
      {show && (
        <AlertAcept
          show={show}
          setShow={setShow}
          activeUpdater={activeUpdater}
          id={id}
        />
      )}
      <div className="flex flex-col items-center sm:bg-black h-screen">
        <div className="relative flex-grow w-full">
          <div
            className="h-[60vh] hidden bg-cover sm:flex flex-col items-center justify-center bg-black"
            style={{ backgroundImage: `url(${background})`, opacity: 0.7 }}
          >
            <div className="sm:flex hidden justify-center items-center w-full px-10">
              <h1 className="font-bold text-6xl text-white">Panel</h1>
            </div>
          </div>
          <div className="min-h-[40vh] hidden h-auto bg-slate-200 md:flex justify-center"></div>
        </div>
        <div className="absolute md:p-6 p-2 gap-16 flex flex-col items-center rounded-tr-2xl rounded-tl-2xl mt-20 sm:mt-0 sm:bottom-0 h-[50vh] bg-white w-full md:w-11/12">
          <h2 className="text-5xl text-orange-600 font-bold tracking-tighter border-b-8 border-orange-600 ">
            Entities
          </h2>
          <table className="min-h-[10vh] bg-slate-200 rounded-xl shadow-sm border border-gray-300 w-full ">
            <thead>
              <tr className="h-9 bg-orange-600">
                <th colSpan={5} className="text-white">
                  Authors
                </th>
              </tr>
            </thead>
            <tbody>
              {inactives?.map((inactive, index) => {
                return (
                  <tr
                    key={index}
                    className="flex justify-center sm:justify-between gap-2 items-center p-2 px-5 flex-wrap md:flex-row"
                  >
                    <td className=" md:w-2/12 gap-2 items-center flex ">
                      <UserIcon /> {upper(inactive.name) || "autor name"}{" "}
                      {inactive.last_name || upper(inactive.last_name) || ""}
                    </td>
                    <td className="text-center md:w-2/12">
                      {inactive.createdAt
                        ? inactive.createdAt.slice(0, 10).replace(/-/g, "/")
                        : inactive.createdAt}
                    </td>
                    <td className="text-center md:w-2/12">
                      {upper(inactive.city) || inactive.city || "city"}
                    </td>
                    <td className="flex justify-center">
                      <img
                        className="bg-black w-8 h-8 rounded-full object-cover"
                        src={inactive?.photo || "/img/image 15.jpg"}
                        alt="Author"
                      />
                    </td>
                    <td className="flex justify-center">
                      <label className="flex cursor-pointer select-none items-center">
                        <div className="relative">
                          <input
                            type="checkbox"
                            onChange={() => {
                              setId(inactive._id);
                              setShow(!show);
                            }}
                            className="sr-only"
                          />
                          <div
                            className={`box ${
                              inactive.active ? "bg-orange-600" : "bg-gray-400"
                            } block h-6 w-12 rounded-full`}
                          ></div>
                          <div
                            className={`dot absolute bg-white top-1 flex h-4 w-4 items-center justify-center rounded-full transition ${
                              inactive.active ? "right-1" : "left-1"
                            }`}
                          ></div>
                        </div>
                      </label>
                    </td>
                  </tr>
                );
              })}
              {actives?.map((active, index) => {
                return (
                  <tr
                    key={index}
                    className="flex justify-center border-t border-r border-1 border-t-zinc-300 sm:justify-between gap-2 items-center p-2 px-5 flex-wrap md:flex-row"
                  >
                    <td className=" md:w-2/12 gap-2 items-center flex ">
                      <UserIcon /> {upper(active.name) || "autor name"}{" "}
                      {active.last_name || upper(active.last_name) || ""}
                    </td>
                    <td className="text-center md:w-2/12">
                      {active.createdAt
                        ? active.createdAt.slice(0, 10).replace(/-/g, "/")
                        : active.createdAt}
                    </td>
                    <td className="text-center md:w-2/12">
                      {upper(active.city) || active.city || "city"}
                    </td>
                    <td className="flex justify-center">
                      <img
                        className="bg-black w-8 h-8 rounded-full object-cover"
                        src={active?.photo || "/img/image 15.jpg"}
                        alt="Author"
                      />
                    </td>
                    <td className="flex justify-center">
                      <label className="flex cursor-pointer select-none items-center">
                        <div className="relative">
                          <input
                            type="checkbox"
                            onChange={() => {
                              setId(active._id);
                              setShow(!show);
                            }}
                            className="sr-only"
                          />
                          <div
                            className={`box ${
                              active.active ? "bg-orange-600" : "bg-gray-400"
                            } block h-6 w-12 rounded-full`}
                          ></div>
                          <div
                            className={`dot absolute bg-white top-1 flex h-4 w-4 items-center justify-center rounded-full transition ${
                              active.active ? "right-1" : "left-1"
                            }`}
                          ></div>
                        </div>
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
