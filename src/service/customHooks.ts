import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../constants/constants";
import { FetchedElement } from "../constants/interfaces";

export function useFetchData() {
  const [fetchedData, setFetchedData] = useState<FetchedElement[]>([]);


  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const responseBody = res.data;
        if (responseBody) {
          setFetchedData(responseBody);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { fetchedData };
}
