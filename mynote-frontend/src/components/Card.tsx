import { BACKEND_URL } from "../config";
import axios from "axios";
import { TrashIcon } from "../icons/TrashIcon";
import { useState } from "react";

interface CardProps {
  _id: string;
  title: string;
  content: string;
  onDelete: () => void;
}

export function Card({ _id, title, content, onDelete }: CardProps) {
  const [color, setColor] = useState("bg-white"); // default background white (temporary change)

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/notes`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: {
          noteId: _id, // match backend's `req.body.noteId`
        },
      });
      onDelete(); //call refetch as the function is passed on trashIcon

      // Test: show alert or trigger parent to refresh data
      // alert(title + " deleted !");
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div
      className={` ${color} cursor-pointer h-72 rounded-lg shadow-lg col-auto m-4 mt-10`}
    >
      <div className="p-2 ">
        <div className="p-1 px-3">
          <div className="text-lg font-medium border-b-2 h-12 border-gray-300 hover:border-custom-default hover:drop-shadow-xs transition-all duration-5000 flex items-center">
            {title}
          </div>
          <div className="text-md h-48 overflow-y-auto">{content}</div>

          <div className="flex justify-between ">
            <div className="">
              <button
                className="bg-pink-200 rounded-full h-4 px-2 text-sm drop-shadow-md m-1"
                onClick={() => setColor("bg-pink-200")}
              ></button>
              <button
                className="bg-purple-300 rounded-full h-4 px-2 text-sm drop-shadow-md m-1"
                onClick={() => setColor("bg-purple-300")}
              ></button>
              <button
                className="bg-blue-200 rounded-full h-4 px-2 text-sm drop-shadow-md m-1"
                onClick={() => setColor("bg-blue-200")}
              ></button>
              <button
                className="bg-green-100 rounded-full h-4 px-2 text-sm drop-shadow-md m-1"
                onClick={() => setColor("bg-green-100")}
              ></button>
              <button
                className="bg-yellow-200 rounded-full h-4 px-2 text-sm drop-shadow-md m-1"
                onClick={() => setColor("bg-yellow-200")}
              ></button>
            </div>
            <button
              className="mr-2 text-gray-500 hover:text-red-800"
              onClick={handleDelete}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
