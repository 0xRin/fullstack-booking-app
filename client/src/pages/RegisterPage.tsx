// library imports
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";

//component imports
import HeaderFooterLayout from "../layouts/HeaderFooterLayout";
import { useState } from "react";

type Props = {};

const RegisterPage = (props: Props) => {
  // formInputs
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<null | string>(null);

  // update form state on form change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  // calls backend route to register user
  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    type ErrorResponse = {
      error: string;
    };

    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        ...registerInfo,
      });

      const data = await res.data;
      console.log(data);
    } catch (e: any) {
      if (e instanceof AxiosError) {
        const axiosError = e as AxiosError;
        const { error } = axiosError.response?.data as ErrorResponse;
        setError(error);
      } else {
        setError(error);
      }
    }
  };

  return (
    <HeaderFooterLayout>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64 text-center">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form onSubmit={(e) => registerUser(e)} className="max-w-md mx-auto ">
            <input
              type="text"
              placeholder="name"
              value={registerInfo.name}
              onChange={(e) => handleFormChange(e)}
              name="name"
            />
            <input
              type="email"
              placeholder="email"
              value={registerInfo.email}
              onChange={(e) => handleFormChange(e)}
              name="email"
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={registerInfo.password}
              onChange={(e) => handleFormChange(e)}
            />
            {error && <div className=" mb-3 text-red-600">{error}</div>}
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">
              Already a member?{" "}
              <Link className="underline text-black" to={"/login"}>
                Login now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </HeaderFooterLayout>
  );
};

export default RegisterPage;
