import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/auth.context";
import logo from '../assets/logo1.png'
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const { loginInfo, setLoginInfo, loginUser, loginError, isLoginLoading } =
    useContext(AuthContext);
  const showToastMessage = (msg: string) => {
    toast.error(msg);
  };
  useEffect(() => {
    if (loginError) {
      showToastMessage(loginError);
    }
  }, [loginError]);
  return (
    <>
      {/* <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 form-inner">
            <form
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                loginUser(`/users/login`, loginInfo);
              }}
            >
              <h3 className="mb-4">Login</h3>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) => {
                    setLoginInfo({ ...loginInfo, email: e.target.value });
                  }}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) => {
                    setLoginInfo({ ...loginInfo, password: e.target.value });
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-dark btn-block mt-3"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div> */}
      <div>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-14 w-auto" src={logo} alt="Quick talk" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              loginUser(`/users/login`, loginInfo);
            }}>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                    placeholder="Enter email address"
                    onChange={(e) => {
                      setLoginInfo({ ...loginInfo, email: e.target.value });
                    }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div className="mt-2">
                  <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4 form-con" placeholder="Enter your password"
                    onChange={(e) => {
                      setLoginInfo({ ...loginInfo, password: e.target.value });
                    }} />
                </div>
              </div>


              <p className="mt-10 text-left text-sm text-gray-500">
                Don't have an account? {"  "}
                <Link to="/register" className="font-semibold leading-6 text-green-500 hover:text-green-400">Sign up</Link>
              </p>
              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLoginLoading ? <CircularProgress color="info" size={'23px'} /> : "Sign in"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
