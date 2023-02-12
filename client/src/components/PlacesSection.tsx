import React from "react";
import { Link, useParams } from "react-router-dom";
import AddNew from "./AddNew";
import NewPlaceForm from "./NewPlaceForm";
import MyAccomodations from "./MyAccomodations";

type Props = {};

const PlacesSection = (props: Props) => {
  const { action } = useParams();
  return (
    <div>
      {action !== "new" && <MyAccomodations />}
      {action === "new" && <NewPlaceForm />}
    </div>
  );
};

export default PlacesSection;
