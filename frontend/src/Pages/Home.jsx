import { Fragment, useEffect, useState } from "react";
import Model from "../Components/Model";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import SideBar from "../Components/SideBar";
function Home() {
  const [userData, setUserData] = useState({});
  const [showModel, setShowMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const handleClick = (e, id) => {
    if (e.target.id === "wrapper") {
      navigate(`/view/${id}`);
    }
  };
  const getNotes = () => {
    axios
      .get(
        `http://localhost:8080/email/${
          JSON.parse(localStorage.getItem("userData")).email
        }`
      )
      .then((e) => {
        setNotes(e.data);
        console.log(notes);
      });
  };
  const formatDate = (date) => {
    const dateToFormat = new Date(date);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(dateToFormat);

    // console.log(formattedDate);
    return formattedDate;
  };
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
    console.log(userData);
    getNotes();
  }, []);
  return (
    <>
      <Fragment>
        <SideBar />
        <div class="p-4 sm:ml-64 bg-gray-900 h-full min-h-screen relative">
          <div
            className="w-12 h-12 bg-yellow-500 fixed z-40 text-white rounded-full text-lg flex items-center justify-center  bottom-0 right-0 m-3 hover:bg-yellow-600 hover:scale-110"
            variant="outline"
            onClick={() => {
              setShowMode(true);

              console.log(showModel);
            }}
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
          <div class="mx-auto container py-10 px-6">
            <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {notes.length > 0 &&
                notes.map((e) => (
                  <div
                    class="rounded-lg bg-white"
                    id="wrapper"
                    onClick={(ev) => {
                      handleClick(ev, e._id);
                      // console.log(e);
                    }}
                  >
                    <div
                      class="w-full h-64 flex flex-col justify-between two dark:bg-gray-800 bg-white rounded-lg border-2 border-[#6366f1]  py-5 px-4"
                      id="wrapper"
                    >
                      <div>
                        <h4
                          class="text-gray-800 dark:text-gray-100 font-bold mb-3"
                          id="wrapper"
                        >
                          {e.title}
                        </h4>
                        <p
                          class="text-gray-800 dark:text-gray-100 text-sm"
                          id="wrapper"
                        >
                          {e.desc}
                        </p>
                      </div>
                      <div>
                        <div
                          class="flex items-center justify-between text-gray-800 dark:text-gray-100"
                          id="wrapper"
                        >
                          <p class="text-sm" id="wrapper">
                            {formatDate(e.date)}
                          </p>
                          <button
                            class="w-8 h-8 rounded-full bg-[#e9d928] text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
                            aria-label="edit note"
                            role="button"
                            onClick={() => {
                              navigate(`/edit/${e._id}`);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="icon icon-tabler icon-tabler-pencil"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z"></path>
                              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                              <line
                                x1="13.5"
                                y1="6.5"
                                x2="17.5"
                                y2="10.5"
                              ></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {notes.length === 0 && (
                <>
                  <div
                    className="bg-white rounded-lg"
                    onClick={(e) => setShowMode(true)}
                  >
                    <div class="flex items-center justify-center h-48  rounded-lg two  bg-gray-50 dark:bg-gray-800 border-2 border-[#6366f1] ">
                      <p class="text-2xl text-gray-400 dark:text-gray-500">
                        <svg
                          class="w-3.5 h-3.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Model
          isVisible={showModel}
          onClose={() => {
            setShowMode(false);
          }}
          onCreate={(e) => getNotes()}
        />
      </Fragment>
    </>
  );
}

export default Home;
