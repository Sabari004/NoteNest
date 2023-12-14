import { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Save from "../assets/save.svg";

function Edit() {
  const [id, setId] = useState("");
  const param = useParams();
  const [notes, setNotes] = useState({});
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setId(param.id);
    console.log(id);
    // if (id !== null) {
    axios.get(`http://localhost:8080/id/${id}`).then((r) => {
      //   console.log(r);
      setNotes(r.data);
      setNote(r.data.note);
    });
    // }
  }, [id]);
  return (
    <>
      <SideBar />
      <div class="p-10 sm:ml-64 bg-gray-900 h-full min-h-screen relative ">
        <div className="flex mb-10  justify-between">
          <div className="flex">
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
          <div className="flex justify-between">
            <button class="my-auto bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 border flex border-yellow-500 rounded ">
              <img src={Save} className="w-5 h-5" />
              {/* <span>Save</span> */}
            </button>
          </div>
        </div>
        <div className="border-2 border-[#6366f1] rounded-lg  flex justify-evenly">
          {notes !== null && (
            <div className="prose lg:prose-xl text-white w-1/2 ">
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full  h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                // placeholder="Write your thoughts here..."
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              ></textarea>
            </div>
          )}
          {notes !== null && (
            <div className="prose lg:prose-xl text-white w-1/2">
              <ReactMarkdown className=" prose prose-invert  w-full  pt-10 pl-5 pb-5  text-white ">
                {note}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Edit;
