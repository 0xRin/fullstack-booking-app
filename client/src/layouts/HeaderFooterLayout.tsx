import React, { ReactElement } from "react";
import Header from "../components/Header";

type Props = {
  children: ReactElement;
};

const HeaderFooterLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default HeaderFooterLayout;
