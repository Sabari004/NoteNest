import axios from "axios";
import { useState } from "react";

const Model = ({ isVisible, onClose }) => {
  const [title, setTitle] = useState("");
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  const handleCreate = () => {
    const dum = {
      mail: JSON.parse(localStorage.getItem("userData")).email,
      note: "# write yours",
      title: title,
    };
    console.log(dum);
    axios
      .post("http://localhost:8080/", dum)
      .then((e) => {
        // console.log("success");
        onClose();
      })
      .catch((r) => {
        console.log(r);
      });
  };
  return (
    <>
      {/* <h1 classNam>Model</h1> */}
      <div
        className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm  flex justify-center items-center z-50 "
        id="wrapper"
        onClick={handleClose}
      >
        <div className="flex flex-col w-[500px]">
          {/* <div class="container px-5 py-24 mx-auto flex"> */}
          {/* <button
            className="text-white text-xl right-0 self-push--end"
            onClick={() => {
              onClose();
            }}
          >
            x
          </button> */}
          <div class="w-[500px] bg-gray-900 shadow-md rounded-lg p-8 flex flex-col float-right md:ml-auto mt-10 md:mt-0 relative z-10">
            <div className="flex flex-row">
              <h2 class="text-white text-lg mb-1 font-medium title-font">
                Create Notes
              </h2>
            </div>
            <p class="leading-relaxed mb-5 text-gray-400">
              Blank page, endless potential. Write your story, one note at a
              time
            </p>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-400">
                Title
              </label>
              <input
                type="email"
                id="email"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                name="email"
                class="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mb-3"
              onClick={(e) => handleCreate()}
            >
              Create
            </button>

            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
