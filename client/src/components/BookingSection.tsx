import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { differenceInCalendarDays, format } from "date-fns";

type Props = {};

const BookingSection = (props: Props) => {
  const [myBookings, setMyBookings] = useState<null | any>();
  const [isLoading, setIsLoading] = useState(false);

  const getBookings = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance("/bookings");
      const data = await res.data;
      setMyBookings(data.bookings);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const getDaysDifference = (checkOutDate: string, checkInDate: string) => {
    return differenceInCalendarDays(
      new Date(checkOutDate),
      new Date(checkInDate)
    );
  };

  useEffect(() => {
    getBookings();
  }, []);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex gap-4 flex-col-reverse  m-auto w-full max-w-screen-lg">
          {myBookings?.map((booking: any) => (
            <div
              className="
            flex gap-4 bg-gray-200 rounded-2xl overflow-hidden w-full "
            >
              <div className="w-40 h-30 overflow-hidden shrink-0 ">
                <img
                  className="aspect-square h-full w-full object-cover"
                  src={`http://localhost:3000/uploads/${booking.place.photos[0]}`}
                  alt=""
                />
              </div>
              <div className="py-3 grow pr-3 flex-5">
                <div className="flex flex-col md:flex-row content-between ">
                  <h2 className="text-xl">{booking.place.title}</h2>
                  {/* <div className="flex gap-2">
                    <div>View</div>
                    <div>Edit Reservation</div>
                  </div> */}
                </div>
                <div className="flex flex-col">
                  <div
                    className="flex gap-2 mt-2 py-2
                border-t border-gray-300 items-center"
                  >
                    <div className="flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                      {format(new Date(booking.checkIn), "yyyy-MM-dd")}
                    </div>
                    {"to"}{" "}
                    <div className="flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                      {format(new Date(booking.checkOut), "yyyy-MM-dd")}{" "}
                    </div>
                  </div>
                  <div className="text-md flex gap-1 flex-col">
                    <div className="flex gap-2">
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
                          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        />
                      </svg>
                      {differenceInCalendarDays(
                        new Date(booking.checkOut),
                        new Date(booking.checkIn)
                      )}{" "}
                      night
                      {differenceInCalendarDays(
                        new Date(booking.checkOut),
                        new Date(booking.checkIn)
                      ) > 1 && "s"}
                    </div>
                    <div className="flex gap-2">
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
                          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Total Price: $
                      {getDaysDifference(booking.checkOut, booking.checkIn) *
                        booking.place.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BookingSection;
