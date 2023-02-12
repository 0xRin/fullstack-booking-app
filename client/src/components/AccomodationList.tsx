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
          className=" group relative cursor-pointer flex gap-4 bg-gray-100 p-2 rounded-2xl "
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
          <Link
            to={`/account/places/edit?id=${accomodation._id}`}
            className=" transition ease-linear  duration-250 absolute opacity-0 group-hover:opacity-100 text-primary right-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
        </Link>
      ))}
    </div>
  );
};

export default AccomodationList;
