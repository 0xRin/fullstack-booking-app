// library imports
import { Link } from "react-router-dom";

//component imports
import HeaderFooterLayout from "../layouts/HeaderFooterLayout";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <HeaderFooterLayout>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form action="" className="max-w-md mx-auto ">
            <input type="email" placeholder="your@email.com" />
            <input type="password" name="" id="" placeholder="password" />
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
