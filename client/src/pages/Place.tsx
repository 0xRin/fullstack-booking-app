import React, { ReactNode, useEffect, useState } from "react";
import HeaderFooterLayout from "../layouts/HeaderFooterLayout";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import PhotoGallery from "../components/PhotoGallery";
import { perkList } from "../utils/perkList";
import { differenceInCalendarDays } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  place?: Accomodation;
};

export type Accomodation = {
  title: string;
  address: string;
  photos: Array<string>;
  description: string;
  perks: Array<string>;
  extraInfo: string;
  checkIn: number;
  checkOut: number;
  maxGuests: number;
  price: number;
};

const Place = (props: Props) => {
  const { id } = useParams();
  const [place, setPlace] = useState<Accomodation>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [error, setError] = useState<string | undefined>();

  type BookingInfo = {
    checkIn: string;
    checkOut: string;
    numGuests: number;
    phone: number | null;
    name: string;
  };

  // FIXME: checkIn returns date that is one day ahead
  const defaultBooking = {
    checkIn: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
      .toISOString()
      .substring(0, 10),
    checkOut: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    )
      .toISOString()
      .substring(0, 10),
    numGuests: 1,
    name: "",
    phone: null,
  };

  const [bookingInfo, setBookingInfo] = useState<BookingInfo>(defaultBooking);

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getDaysDifference = (checkOutDate: string, checkInDate: string) => {
    return differenceInCalendarDays(
      new Date(checkOutDate),
      new Date(checkInDate)
    );
  };

  const getPlace = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance(`/places/${id}`);
      const place = await res.data;
      setPlace(place);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      navigate("/");
    }
  };

  const clearError = async () => {
    return setTimeout(() => {
      setError(undefined);
    }, 1000);
  };

  useEffect(() => {
    getPlace();
  }, []);

  const setPerkIcon = (perk: string) => {
    switch (perk) {
      case "Wifi":
        return perkList[0].icon;
      case "Free Parking":
        return perkList[1].icon;
      case "TV":
        return perkList[2].icon;
      case "Pet Friendly":
        return perkList[3].icon;
      case "Party Friendly":
        return perkList[4].icon;
      case "Private Entrance":
        return perkList[5].icon;
      default:
        return perkList[4].icon;
    }
  };

  const createBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/bookings", {
        place: id,
        ...bookingInfo,
      });
      const data = await res.data;
      toast("Booked! Time to pack your bags! 🛫");
      setBookingInfo(defaultBooking);
      navigate("/account/bookings");
    } catch (e: any) {
      setError("Please login or register before booking");
      clearError();
    }
  };

  if (showAllPhotos) {
    return (
      <PhotoGallery
        photos={place?.photos!}
        title={place?.title!}
        setShowAllPhotos={setShowAllPhotos}
      />
    );
  }

  return (
    <HeaderFooterLayout>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <ToastContainer
              className="fixed right-3 top-[90%]"
              pauseOnHover={false}
              progressStyle={{ background: "green" }}
            />
            <div className="max-w-screen-lg m-auto">
              <h1 className="text-3xl">{place?.title}</h1>
              <a
                className="my-2 font-semibold underline flex gap-1"
                target="_blank"
                href={`http://maps.google.com?q=${place?.address}`}
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
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>

                {place?.address}
              </a>
              <div className="relative max-w-screen-lg m-auto">
                <div className="grid gap-2 grid-cols-[2fr_1fr]">
                  <div>
                    <div>
                      <img
                        onClick={() => setShowAllPhotos(true)}
                        className="aspect-square object-cover rounded-tl-3xl rounded-bl-3xl cursor-pointer"
                        src={`http://localhost:3000/uploads/${place?.photos[0]}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="grid">
                    <img
                      onClick={() => setShowAllPhotos(true)}
                      className="aspect-square object-cover rounded-tr-3xl cursor-pointer"
                      src={`http://localhost:3000/uploads/${place?.photos[1]}`}
                      alt=""
                    />
                    <div className="overflow-hidden rounded-br-3xl">
                      <img
                        onClick={() => setShowAllPhotos(true)}
                        className="aspect-square object-cover relative top-2 cursor-pointer "
                        src={`http://localhost:3000/uploads/${place?.photos[2]}`}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="flex gap-1 z-100 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 "
                  onClick={() => setShowAllPhotos(true)}
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
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  Show more photos
                </button>
              </div>
              <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] ">
                <div>
                  <div className="my-4">
                    <h2 className="font-semibold text-2xl">Description</h2>
                    {place?.description}
                  </div>
                  Check-in: {place?.checkIn}
                  <br />
                  Check-out: {place?.checkOut}
                  <br />
                  Max number of guests: {place?.maxGuests}
                </div>
                <div>
                  <form
                    onSubmit={(e) => createBooking(e)}
                    className="bg-white shadow p-4 rounded-2xl"
                  >
                    <div className="text-2xl text-center mb-4 font-medium">
                      Price: ${place?.price} / per night
                    </div>
                    <div className="border rounded-2xl mt-4">
                      <div className="flex">
                        <div className=" py-3 px-4 flex-1 ">
                          <label className="font-light">Check in:</label>
                          <br />
                          <input
                            type="date"
                            name="checkIn"
                            value={bookingInfo.checkIn}
                            onChange={(e) => handleBookingChange(e)}
                          />
                        </div>
                        <div className=" py-3 px-4 border-l flex-1">
                          <label className="font-light">Check out:</label>
                          <br />
                          <input
                            type="date"
                            name="checkOut"
                            value={bookingInfo.checkOut}
                            onChange={(e) => handleBookingChange(e)}
                          />
                        </div>
                      </div>
                      <div className=" py-3 px-4 border-t">
                        <label className="font-light">Number of guests:</label>
                        <input
                          type="number"
                          value={bookingInfo.numGuests}
                          name="numGuests"
                          onChange={(e) => handleBookingChange(e)}
                        />
                      </div>
                      <div className="py-3 px-4 border-t">
                        <label className="font-light" htmlFor="name">
                          Your full name:
                        </label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={bookingInfo.name}
                          onChange={(e) => handleBookingChange(e)}
                        />
                        <label className="font-light" htmlFor="phone">
                          Phone Number:
                        </label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={bookingInfo.phone as number}
                          onChange={(e) => handleBookingChange(e)}
                        />
                      </div>
                    </div>
                    {error && (
                      <div className="">
                        <div
                          className="m-auto w-1/2 rounded-md text-red-400 mt-2  
                      text-center"
                        >
                          {error}
                        </div>
                      </div>
                    )}
                    <button className="primary mt-4" type="submit">
                      Book this place for $
                      <span>
                        {place &&
                          getDaysDifference(
                            bookingInfo.checkOut,
                            bookingInfo.checkIn
                          ) * place?.price}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8  mt-8 border-t">
              <div className="max-w-screen-lg m-auto">
                <div>
                  {place?.extraInfo && (
                    <>
                      <div>
                        <h2 className="font-semibold text-2xl">Extra Info</h2>
                      </div>
                      <div className=" mb-4 mt-2 text-sm text-gray-700 leading-5">
                        {place?.extraInfo}
                      </div>
                    </>
                  )}
                  {place?.perks && (
                    <>
                      <div>
                        <h2 className="font-semibold text-2xl">Perks</h2>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2 mb-4">
                        {place?.perks.map((perk) => (
                          <label
                            className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer"
                            key={perk}
                          >
                            <span>{perk}</span>
                            {setPerkIcon(perk) as ReactNode}
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </HeaderFooterLayout>
  );
};

export default Place;
