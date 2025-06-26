// a custom hook

import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${BACKEND_URL}/notes`, {
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     })
  //     .then((response) => {
  //       setContents(response.data.note); //changes here
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch notes:", error);
  //     });
  // }, []);

  // console.log(contents);
    // return contents;

  const fetchData = async () => {
    axios
      .get(`${BACKEND_URL}/notes`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.note); //changes here
      })
      .catch((error) => {
        console.error("Failed to fetch notes:", error);
      });
  };

  useEffect(() => {
    fetchData();
  },[])

  //hook unclear

  return {contents, refetch:fetchData }
}
