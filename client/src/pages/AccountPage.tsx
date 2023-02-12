// library imports
import { useContext } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

//local imports
import HeaderFooterLayout from "../layouts/HeaderFooterLayout";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import ProfileSection from "../components/ProfileSection";
import PlacesSection from "../components/PlacesSection";

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
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (accountSection === link) {
      classes += " bg-primary text-white ";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
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
          <Link className={`${setLinkClass("account")}`} to={"/account"}>
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            My Profile
          </Link>
          <Link
            className={`${setLinkClass("bookings")}`}
            to={"/account/bookings"}
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
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            My Bookings
          </Link>
          <Link className={`${setLinkClass("places")}`} to={"/account/places"}>
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
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            My Accomodations
          </Link>
        </nav>
        {accountSection === "account" && (
          <ProfileSection logoutUser={logoutUser} user={user} />
        )}
        {accountSection === "places" && <PlacesSection />}
      </>
    </HeaderFooterLayout>
  );
};

export default AccountPage;
