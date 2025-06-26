import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { CrossIcon } from "../icons/CrossIcon";
import { CheckIcon } from "./CheckIcon";

export function CreateNote({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextareaElement>(null);

  async function addnote() {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/notes`,
      {
        title,
        content,
        //to add current date
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-black bg-opacity-80 fixed top-0 left-0  flex justify-center">
          <div className="flex justify-center items-center">
            <span className="opacity-1 bg-gray-100 p-4 rounded">
              <div className="h-96 w-96 bg-gray-100">
                <div onClick={onClose} className="cursor-pointer flex justify-end ">
                  <CrossIcon />
                </div>
                <div className="w-full mt-4">
                  <input ref={titleRef} placeholder="Title..." className="bg-white rounded-t-lg border-b-2 border-gray-400 px-4 p-2 placeholder:text-gray-500  w-full font-medium active:border-none" />
                </div>
                <div className="h-72 w-76 ">
                  <textarea ref={contentRef} placeholder="Content.." className="bg-white rounded-b-lg  drop-shadow-lg h-full w-full p-4 resize-none" />
                </div>
                
                <button onClick={addnote} className="bg-white drop-shadow-md rounded-xl p-1 relative border-black border-0.5 bottom-12 left-[336px] rounded-l-full rounded-tr-full">
                 <span className="active:text-green-700 font-extrabold"><CheckIcon/></span>
                </button>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
