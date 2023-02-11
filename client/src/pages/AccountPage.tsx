// library imports
import { useContext } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

//local imports
import HeaderFooterLayout from "../layouts/HeaderFooterLayout";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";

type Props = {};

const AccountPage = (props: Props) => {
  const { user, ready, setUser } = useContext(UserContext);
  let { accountSection } = useParams();
  const navigate = useNavigate();

  //check if user ised in
  if (!user) return <Navigate to={"/login"} />;

  //set link style based on route
  if (accountSection == undefined) accountSection = "account";

  const setLinkClass = (link: string) => {
    if (accountSection === link) return "bg-primary text-white rounded-full";
  };

  const logoutUser = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      navigate("/");
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HeaderFooterLayout>
      <>
        <nav className="w-full mt-8 gap-2 flex justify-center mb-8">
          <Link
            className={`p-2 px-6 ${setLinkClass("account")}`}
            to={"/account"}
          >
            My Profile
          </Link>
          <Link
            className={`p-2 px-6 ${setLinkClass("bookings")}`}
            to={"/account/bookings"}
          >
            My Bookings
          </Link>
          <Link
            className={`p-2 px-6 ${setLinkClass("places")}`}
            to={"/account/places"}
          >
            My Accomodations
          </Link>
        </nav>
        {accountSection === "account" && (
          <div className="text-center max-w-lg mx-auto">
            Logged in as {user?.name}({user?.email})<br />
            <button onClick={logoutUser} className="primary max-w-sm mt-2">
              Logout
            </button>
          </div>
        )}
      </>
    </HeaderFooterLayout>
  );
};

export default AccountPage;
