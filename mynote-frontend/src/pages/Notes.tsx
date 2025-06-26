import { useState } from "react";
import { Card } from "../components/Card";
import { CreateNote } from "../components/CreateNote";
import { useContent } from "../hooks/useContent";

import { Logo } from "../icons/Logo";
import { TrashIcon } from "../icons/TrashIcon";
import { ArchieveIcon } from "../icons/ArchieveIcon";
import { CalenderIcon } from "../icons/CalenderIcon";
import { TaskIcon } from "../icons/TaskIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { useNavigate } from "react-router-dom";

export function Notes() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refetch } = useContent(); //custom hook lai call garcha ani gets the contents

  // greeting according to current time
  const currentHour = new Date().getHours();

  let greeting = "";
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning !";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon !";
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = "Good Evening !";
  } else {
    greeting = "Good Night !";
  }

  const navigate = useNavigate();

  function signout() {
    navigate("/signin");
  }
  return (
    <div className="h-screen w-screen flex transition-all duration-100">
      <div className="w-52 h-screen bg-custom-morelight drop-shadow-lg hidden sm:block ">
        <div className="h-screen flex flex-col ">
          <div className="h-24 bg-red-2 cursor-pointer flex justify-center items-center text-3xl font-semibold font-inter text-black ">
            <Logo size="size-12" /> Mynote
          </div>

          <div className="h-full bg-custom-morelight">
            <div className="bg-white mx-4 rounded-lg h-[710px] drop-shadow-md ">
              <div className="m-2 h-96 pt-2  ">
                <button
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  className="flex justify-between px-2 py-2 w-full hover:bg-custom-morelight rounded-md cursor-pointer text-gray-800 hover:text-custom-moredark"
                >
                  New Note <Logo size="size-5" />
                </button>
                <div className="flex justify-between px-2 py-2 hover:bg-custom-morelight rounded-md cursor-pointer text-gray-800 hover:text-custom-moredark ">
                  Task
                  <TaskIcon size="size-5" />
                </div>
                <div className="flex justify-between px-2 py-2 hover:bg-custom-morelight rounded-md cursor-pointer text-gray-800 hover:text-custom-moredark">
                  Calender
                  <CalenderIcon size="size-5" />
                </div>
                <div className="flex justify-between px-2 py-2 hover:bg-custom-morelight rounded-md cursor-pointer text-gray-800 hover:text-custom-moredark">
                  Archieve <ArchieveIcon size="size-5" />
                </div>
                <div className="flex justify-between px-2 py-2 hover:bg-custom-morelight rounded-md cursor-pointer text-gray-800 hover:text-custom-moredark">
                  Trash <TrashIcon />
                </div>
              </div>

              <div className="flex flex-col items-center font-roboto  mt-24">
                <div>Less clutter, </div>
                <div>more clarity.</div>
              </div>
              <div className="flex justify-center">
                <img
                  src="../../images/rabbit.png"
                  className="h-40 flex-end"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-screen">
        <div className="h-20  bg-custom-morelight drop-shadow-md flex justify-between items-center p-8">
          <div className=" rounded-3xl py-2 px-8 w-2/4 ml-4 bg-white flex items-center drop-shadow-sm">
            <SearchIcon />
            <div className="ml-2">Search</div>
          </div>
          <div className="flex">
            <div className="text-gray-800 font-semibold text-xs md:text-sm xl:text-md md:mr-24 mx-10 ">
            {greeting}
          </div>
          <div onClick={signout} className="cursor-pointer hover:text-blue-700 flex">
            <span className="hidden lg:block">Logout</span> <LogoutIcon />
          </div>
          </div>
          
        </div>
        <div className="flex-1 ">
          {/* <div className="flex justify-end m-4">
            <button
              onClick={() => {
                setModalOpen(true);
              }}
              className="text-blue-900 "
            >
              + add new notes
            </button>
          </div> */}

          <div className="bg-gray-50">
            <div className=" h-[730px] w-92 scroll-y overflow-y-scroll grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {contents.map(({ title, content, _id }) => (
                <Card
                  title={title}
                  content={content}
                  _id={_id}
                  onDelete={refetch}
                />
              ))}
            </div>
          </div>
          <CreateNote
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              refetch();
            }}
          />
        </div>
      </div>
    </div>
  );
}
