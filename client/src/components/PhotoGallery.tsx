import React from "react";

type Props = {
  photos: Array<string>;
  title: string;
  setShowAllPhotos: React.Dispatch<React.SetStateAction<boolean>>;
};

const PhotoGallery = ({ photos, title, setShowAllPhotos }: Props) => {
  return (
    <div className="absolute inset-0 bg-black text-white min-h-screen">
      <div className="p-8 grid gap-4 bg-black">
        <div className="mb-4 flex items-center">
          <h2 className="text-xl mr-48">Photos of {title}</h2>
          <button
            onClick={() => setShowAllPhotos(false)}
            className="flex gap-1 py-2 px-4 rounded-2xl fixed right-12 top-8 bg-white  text-black"
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
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Close photos
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo) => (
            <img
              className="object-cover w-full h-full"
              src={`http://localhost:3000/uploads/${photo}`}
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
