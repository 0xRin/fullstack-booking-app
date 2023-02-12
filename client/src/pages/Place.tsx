import React from "react";
import HeaderFooterLayout from "../layouts/HeaderFooterLayout";

type Props = {
  place?: Accomodation;
};

export type Accomodation = {
  title: string;
  address: string;
  addedPhotos: Array<string>;
  description: string;
  perks: Array<string>;
  extraInfo: string;
  checkIn: number;
  checkOut: number;
  maxGuests: number;
};

const Place = ({ place }: Props) => {
  return (
    <HeaderFooterLayout>
      <div>place</div>
    </HeaderFooterLayout>
  );
};

export default Place;
