// library imports
import { Link } from "react-router-dom";

//component imports
import HeaderFooterLayout from "../layouts/HeaderFooterLayout";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <HeaderFooterLayout>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form action="" className="max-w-md mx-auto ">
            <input type="text" placeholder="name" />
            <input type="email" placeholder="email" />
            <input type="password" name="" id="" placeholder="password" />
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
