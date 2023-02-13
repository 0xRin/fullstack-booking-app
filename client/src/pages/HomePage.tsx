import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HeaderFooterLayout from "../layouts/HeaderFooterLayout";
import axiosInstance from "../utils/axiosInstance";
import { Accomodation } from "./Place";

type Props = {};

const HomePage = (props: Props) => {
  const [allPlaces, setAllPlaces] = useState<Array<any> | null>();

  const getAllPlaces = async () => {
    try {
      const res = await axiosInstance.get("/places");
      const data = await res.data;
      setAllPlaces(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllPlaces();
  }, []);
  return (
    <HeaderFooterLayout>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8">
        {allPlaces &&
          allPlaces.map((place) => (
            <div className=" cursor-pointer flex flex-col">
              <div className="bg-gray-500 rounded-2xl flex mb-2">
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={`http://localhost:3000/uploads/${place.photos[0]}`}
                  alt=""
                />
              </div>
              <h2 className="font-bold truncate">{place.address}</h2>
              <div className="flex flex-col gap-1 mt-1">
                <h2 className="text-md text-gray-500 ">{place.title}</h2>
                <h2 className="text-black">
                  <span className="font-bold">${place.price}</span> per night
                </h2>
              </div>
            </div>
          ))}
      </div>
    </HeaderFooterLayout>
  );
};

export default HomePage;
