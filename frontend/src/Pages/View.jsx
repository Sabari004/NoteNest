import { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import { useParams } from "react-router-dom";
import axios from "axios";

import ReactMarkdown from "react-markdown";
// import { marked } from "marked";
function View() {
  const [id, setId] = useState("");
  const param = useParams();
  const [notes, setNotes] = useState({});
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
      <div class="p-10 sm:ml-64 bg-gray-900 h-full min-h-screen">
        <div className="bg-gray-950 h-full min-h-screen m-10 ">
          <h1 className="text-white pro text-[30px] font-bold ">
            {notes.title}{" "}
          </h1>

          {notes !== null && (
            <div className="prose lg:prose-xl text-white ">
              <ReactMarkdown className=" prose prose-invert  w-full  pt-10 bg-gray-950 p-10 text-white ">
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
