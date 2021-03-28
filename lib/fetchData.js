import axios from "axios";
import { useState, useEffect } from "react";

export default function fetchData(url, jwt) {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        const config = {
          method: "GET",
          baseURL: "https://cs-alert-api.herokuapp.com/api",
          url,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          params: {
            limit: 3,
            page: 1,
          },
        };
        const res = await axios(config);
        setdata(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    }
    getData();
  }, []);
  return {
    loading,
    data,
  };
}
