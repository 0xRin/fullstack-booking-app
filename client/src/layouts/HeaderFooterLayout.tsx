import React, { ReactElement } from "react";
import Header from "../components/Header";

type Props = {
  children: ReactElement;
};

const HeaderFooterLayout = ({ children }: Props) => {
  return (
    <div className="p-4 px-8 flex flex-col">
      <Header />
      {children}
    </div>
  );
};

export default HeaderFooterLayout;
