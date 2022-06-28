import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";

export const CheckInOut = () => {
  const [lastCheck, setLastCheck] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    getLastCheck();
    checkIfInSatbayevUniversity();
  }, []);

  useEffect(() => {
    if (lastCheck) {
      setStatus(
        `${lastCheck.type === "in" ? "В универе" : "Дома"} с ${new Date(
          lastCheck.createdAt
        ).toLocaleTimeString([], {
          hour12: false,
        })}`
      );
    }
  }, [lastCheck]);

  const checkIfInSatbayevUniversity = async () => {
    const {
      data: { IPv4: ip },
    } = await axios.get("https://geolocation-db.com/json/");
    // return true;

    return ip === "95.56.252.254";
  };

  const getLastCheck = async () => {
    try {
      const response = await api.get("/api/check/last");
      setLastCheck(response.data.lastCheck);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onCheckIn = async () => {
    try {
      const isInSatbayevUniversity = await checkIfInSatbayevUniversity();
      if (!isInSatbayevUniversity) {
        alert("Чекинится можно только из универа!");
        return;
      }
      const response = await api.post("/api/check/in");
      setLastCheck(response.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const onCheckOut = async () => {
    try {
      const isInSatbayevUniversity = await checkIfInSatbayevUniversity();
      if (!isInSatbayevUniversity) {
        alert("Чекаутится можно только из универа!");
        return;
      }
      const response = await api.post("/api/check/out");
      setLastCheck(response.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-y-4 p-4 mt-16 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h1 class="font-bold text-2xl">Чекин / Чекаут</h1>
        {status && lastCheck.type === "in" ? (
          <span class="bg-green-100 text-green-800 text-xl font-medium inline-flex items-center px-4 py-2 rounded dark:bg-blue-200 dark:text-blue-800">
            <svg
              class="mr-1 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            {status}
          </span>
        ) : (
          <span class="bg-gray-100 text-gray-800 text-xl font-medium inline-flex items-center px-4 py-2 rounded dark:bg-blue-200 dark:text-blue-800">
            <svg
              class="mr-1 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            {status}
          </span>
        )}

        {!lastCheck && (
          <button
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onCheckIn}
          >
            Чекин
          </button>
        )}
        {lastCheck && lastCheck.type === "out" && (
          <button
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onCheckIn}
          >
            Чекин
          </button>
        )}
        {lastCheck && lastCheck.type === "in" && (
          <button
            onClick={onCheckOut}
            class="w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Чекаут
          </button>
        )}
      </div>
    </div>
  );
};
