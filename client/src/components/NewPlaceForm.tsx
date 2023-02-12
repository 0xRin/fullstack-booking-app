import React, { useState } from "react";
import { perkList } from "../utils/perkList";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { Link, Navigate, useNavigate } from "react-router-dom";

type Props = {};

const NewPlaceForm = (props: Props) => {
  const navigate = useNavigate();

  //state for holding form inputs
  const defaultPlaceForm = {
    title: "",
    address: "",
    addedPhotos: [] as Array<string>,
    photoLink: "",
    description: "",
    perks: [] as Array<string>,
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 1,
  };

  const [placeForm, setPlaceForm] = useState(defaultPlaceForm);

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPlaceForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addPhotoByLink = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/photos/upload-by-link", {
        photoLink: placeForm.photoLink,
      });
      const data: string = await res.data;

      setPlaceForm((prev) => ({
        ...prev,
        ["addedPhotos"]: [...prev.addedPhotos, data],
      }));
      placeForm.photoLink = "";
    } catch (e) {
      console.log(e);
    }
  };

  const handleCbClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    if (checked) {
      setPlaceForm((prev) => ({
        ...prev,
        perks: [...prev.perks, name],
      }));
    } else {
      setPlaceForm((prev) => ({
        ...prev,
        perks: prev.perks.filter((perk) => perk !== name),
      }));
    }
  };

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files;
    const data = new FormData();

    if (e.target.files) {
      files = e.target.files[0];
      data.set("photos", files);
      e.target.value = "";
    } else {
      console.log("returned");
      return;
    }

    try {
      const res = await axiosInstance.post("photos/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      });
      const resData = await res.data;
      console.log(resData);
      setPlaceForm((prev) => ({
        ...prev,
        ["addedPhotos"]: [...prev.addedPhotos, resData],
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const addNewAccomodation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/places", {
        ...placeForm,
      });
      const data = await res.data;
      console.log(data);
      setPlaceForm(defaultPlaceForm);
      navigate("/account/places");
    } catch (e) {
      // TODO: show readable error to user
    }
  };

  return (
    <div>
      <form onSubmit={(e) => addNewAccomodation(e)}>
        <label htmlFor="title" className="text-2xl mt-4">
          Title
        </label>
        <p className="text-gray-500 text-sm">
          Add a catchy title for your home
        </p>
        <input
          type="text"
          id="title"
          placeholder="Title"
          name="title"
          value={placeForm.title}
          onChange={(e) => handleFormChange(e)}
          required
        />
        <label htmlFor="address" className="text-2xl mt-4">
          Address
        </label>
        <p className="text-gray-500 text-sm">The location for this place</p>
        <input
          type="text"
          placeholder="Address"
          id="address"
          name="address"
          value={placeForm.address}
          onChange={(e) => handleFormChange(e)}
          required
        />
        <label htmlFor="photos" className="text-2xl mt-4">
          Photos
        </label>
        <p className="text-gray-500 text-sm">
          Turn heads with stunning photos of your place
        </p>
        <div className="flex gap-2 ">
          <input
            type="text"
            placeholder="Add using a link.."
            name="photoLink"
            value={placeForm.photoLink}
            onChange={(e) => handleFormChange(e)}
          />
          <button
            onClick={(e) => addPhotoByLink(e)}
            className="bg-gray-200 px-4 rounded-2xl h-11"
          >
            Add&nbsp;Photo
          </button>
        </div>
        <div className="grid grid-col-3 lg:grid-cols-6 sm:grid-cols-4 mt-2 text-2xl text-gray-600 mb-4 gap-2">
          {placeForm.addedPhotos.length > 0 &&
            placeForm.addedPhotos.map((photo) => (
              <div className="lg:h-40 md:h-50 sm:h-60  flex">
                <img
                  className="rounded-2xl w-full object-cover"
                  src={`http://localhost:3000/uploads/${photo}`}
                  alt=""
                />
              </div>
            ))}
          <label className="lg:h-40 md:h-50 sm:h-60 flex gap-1 justify-center items-center border bg-transparent rounded-2xl p-2 cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => uploadPhoto(e)}
            />
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
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
              />
            </svg>
            Upload
          </label>
        </div>
        <label htmlFor="description" className="text-2xl mt-4">
          Description
        </label>
        <p className="text-gray-500 text-sm">
          What do you want people to know about this place?
        </p>
        <textarea
          id="description"
          name="description"
          value={placeForm.description}
          onChange={(e) => handleFormChange(e)}
          required
        />
        <label htmlFor="perks" className="text-2xl mt-4">
          Perks
        </label>
        <p className="text-gray-500 text-sm">
          What perks does your home come with? Select all that apply
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2 mb-4">
          {perkList.map((perk) => (
            <label
              className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer"
              key={perk.perkName}
            >
              <input
                type="checkbox"
                name={perk.perkName}
                id={perk.perkName}
                onChange={(e) => handleCbClick(e)}
                checked={placeForm.perks.includes(perk.perkName)}
              />
              <span>{perk.perkName}</span>
              {perk.icon as any}
            </label>
          ))}
        </div>
        <label htmlFor="extraInfo" className="text-2xl mt-4">
          Extra Info
        </label>
        <p className="text-gray-500 text-sm">House rules, etc.</p>
        <textarea
          id="extraInfo"
          name="extraInfo"
          value={placeForm.extraInfo}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="extraInfo" className="text-2xl mt-4">
          Check in & Check out times, Max Guests
        </label>
        <p className="text-gray-500 text-sm">
          Add check in and check out times
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div>
            <label className="mt-2 -mb-1" htmlFor="checkIn">
              Check in time
            </label>
            <input
              type="text"
              id="checkIn"
              placeholder="09:00"
              name="checkIn"
              value={placeForm.checkIn}
              onChange={(e) => handleFormChange(e)}
              required
            />
          </div>
          <div>
            <label className="mt-2 -mb-1" htmlFor="checkOut">
              Check Out time
            </label>
            <input
              type="text"
              placeholder="15:00"
              id="checkOut"
              name="checkOut"
              value={placeForm.checkOut}
              onChange={(e) => handleFormChange(e)}
              required
            />
          </div>
          <div>
            <label className="mt-2 -mb-1" htmlFor="guest">
              Max number of guests
            </label>
            <input
              type="text"
              id="guest"
              name="maxGuests"
              value={placeForm.maxGuests}
              onChange={(e) => handleFormChange(e)}
              required
            />
          </div>
        </div>
        <div>
          <button type="submit" className="primary my-4">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPlaceForm;
