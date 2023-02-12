import React from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";

type Props = {
  myAccomodations: Array<any>;
};

const AccomodationList = ({ myAccomodations }: Props) => {
  return (
    <div className="flex gap-4 flex-col">
      {myAccomodations.map((accomodation) => (
        <Link
          to={`/places/${accomodation._id}`}
          className=" cursor-pointer flex gap-4 bg-gray-100 p-2 rounded-2xl "
        >
          <div className="w-32 h-32 bg-gray-300 rounded-2xl overflow-hidden grow shrink-0">
            <img
              className="object-cover h-full"
              src={`http://localhost:3000/uploads/${accomodation.photos[0]}`}
              alt=""
            />
          </div>
          <div className="grow-0 shrink">
            <h2 className="text-xl">{accomodation.title}</h2>
            <p className="text-sm mt-2">{accomodation.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AccomodationList;
