import { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ReactMarkdown from "react-markdown";
// import { marked } from "marked";
function View() {
  const [id, setId] = useState("");
  const param = useParams();
  const [notes, setNotes] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setId(param.id);
    console.log(id);
    // if (id !== null) {
    axios.get(`http://localhost:8080/id/${id}`).then((r) => {
      //   console.log(r);
      setNotes(r.data);
    });
    // }
  }, [id]);

  return (
    <>
      <SideBar />
      <div class="p-10 sm:ml-64 bg-gray-900 h-full min-h-screen relative">
        <div
          className="w-12 h-12 bg-yellow-500 fixed z-40 text-white rounded-full text-lg flex items-center justify-center  bottom-0 right-0 m-3 hover:bg-yellow-600 hover:scale-110"
          variant="outline"
          onClick={() => {
            navigate(`/edit/${param.id}`);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
        <div className="flex mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full justify-center items-center my-auto mr-2"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <h1 className="text-white pro text-[40px] font-bold ">
            {notes.title}{" "}
          </h1>
        </div>
        <div className="border-2 border-[#6366f1] rounded-lg  ">
          {notes !== null && (
            <div className="prose lg:prose-xl text-white ">
              <ReactMarkdown className=" prose prose-invert  w-full  pt-10 p-10 text-white ">
                {notes.note}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default View;
