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
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
    console.log(userData);
    axios.get("http://localhost:8080/").then((e) => {
      setNotes(e.data);
      console.log(notes);
    });
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
          <div class="p-4 border-2 border-[#6366f1] rounded-lg">
            <div class="grid grid-cols-3 gap-4 mb-4">
              {notes.length > 0 &&
                notes.map((e) => (
                  <div className="bg-gray-500 rounded cursor-pointer ">
                    <div
                      key={e.id}
                      className="flex items-center justify-center rounded bg-gray-50 h-40 dark:bg-gray-800 botton two"
                      onClick={(ev) => {
                        navigate(`/view/${e._id}`);
                        // console.log(e);
                      }}
                    >
                      <p className="text-2xl text-gray-400 dark:text-gray-300">
                        <h3>{e.title}</h3>
                        {/* <button></byutton> */}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Model
          isVisible={showModel}
          onClose={() => {
            setShowMode(false);
          }}
        />
      </Fragment>
    </>
  );
}

export default Home;
