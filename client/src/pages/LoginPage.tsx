// library imports
import { Link, Navigate, useNavigate } from "react-router-dom";

//local imports
import HeaderFooterLayout from "../layouts/HeaderFooterLayout";
import { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";

type Props = {};

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<null | string>(null);

  // update form state on form change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    type ErrorResponse = {
      error: string;
    };

    try {
      const res = await axiosInstance.post("/auth/login", {
        ...loginInput,
      });
      const { _doc: data } = await res.data;
      setUser(data);
      setLoginInput({
        email: "",
        password: "",
      });
      navigate("/account/places");
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const axiosError = e as AxiosError;
        const { error } = axiosError.response?.data as ErrorResponse;
        setError(error);
      } else {
        setError(error);
      }
    }
  };

  //check if user is created
  if (user) return <Navigate to={"/"} />;

  return (
    <HeaderFooterLayout>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form
            onSubmit={(e) => loginUser(e)}
            action=""
            className="max-w-md mx-auto text-center "
          >
            <input
              type="email"
              placeholder="your@email.com"
              name="email"
              onChange={(e) => handleFormChange(e)}
              value={loginInput.email}
            />
            <input
              type="password"
              name="password"
              id=""
              placeholder="password"
              onChange={(e) => handleFormChange(e)}
              value={loginInput.password}
            />
            {error && <div className=" mb-3 text-red-600">{error}</div>}
            <button className="primary">Login</button>
            <div className="text-center py-2 text-gray-500">
              Don't have an account yet?{" "}
              <Link className="underline text-black" to={"/register"}>
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </HeaderFooterLayout>
  );
};

export default LoginPage;
