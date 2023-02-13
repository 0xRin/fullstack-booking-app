import React, { useEffect, useState } from "react";
import AddNew from "./AddNew";
import axiosInstance from "../utils/axiosInstance";
import AccomodationList from "./AccomodationList";

type Props = {};

const MyAccomodations = (props: Props) => {
  const [myAccomodations, setMyAccomodations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMyAccomodations = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/places/user-places");
      const data = await res.data;
      setMyAccomodations(data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyAccomodations();
  }, []);

  return (
    <div>
      <AddNew />
      <div className="mt-5 max-w-screen-lg m-auto">
        <h1 className="text-xl mb-5">My Accomdations</h1>
        {isLoading ? (
          "Loading...."
        ) : (
          <AccomodationList myAccomodations={myAccomodations} />
        )}
      </div>
    </div>
  );
};

export default MyAccomodations;
