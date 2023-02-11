import React from "react";
import { User } from "../context/UserContext";

type Props = {
  user: User;
  logoutUser: () => Promise<void>;
};

const ProfileSection = ({ user, logoutUser }: Props) => {
  return (
    <div className="text-center max-w-lg mx-auto">
      Logged in as {user?.name}({user?.email})<br />
      <button onClick={logoutUser} className="primary max-w-sm mt-2">
        Logout
      </button>
    </div>
  );
};

export default ProfileSection;
