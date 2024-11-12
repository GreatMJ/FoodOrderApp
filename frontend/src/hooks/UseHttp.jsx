import { useCallback, useEffect, useState } from "react";

// helper function
const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);
  const resData = await response.json();
  // error
  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong. Please try again later."
    );
  }

  return resData;
};

// custom hook

const useHttp = (url, config, initialData) => {
  // manage resdata
  const [data, setData] = useState(initialData);
  // manage error state
  const [error, setError] = useState();
  // manage loading state
  const [isLoading, setIsLoading] = useState(false);

  const clearData = () => {
    setData(initialData);
  };

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  // send request if its get request
  useEffect(() => {
    if (!config || !config.method || config.method === "GET") {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    isLoading,
    data,
    error,
    sendRequest,
    clearData,
  };
};
export default useHttp;
