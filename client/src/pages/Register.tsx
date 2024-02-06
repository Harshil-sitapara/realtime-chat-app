import { ChangeEvent, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { toast } from "react-hot-toast";
import logo from '../assets/logo1.png'
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    isRegisterLoading,
    registerError,
  } = useContext(AuthContext);
  const showToastMessage = (msg: string) => {
    toast.error(msg)
  };
  useEffect(() => {
    if (registerError) {
      showToastMessage(registerError);
    }
  }, [registerError]);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    if (file.size > 30 * 1024) {
        showToastMessage("Please upload an image smaller than 30kb.");
        return;
    }
    TransformFile(file);
  };
  const TransformFile = (file: any) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64File = reader.result;
        console.log("Reader", reader)
        updateRegisterInfo({ ...registerInfo, profilePhoto: base64File });
      };
    }
  };
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-14 w-auto" src={logo} alt="Quick talk" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            registerUser(`/users/register`, registerInfo);
          }}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <div className="mt-2">
                <input id="name" name="name" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  placeholder="Enter your username" onChange={(e) => {
                    updateRegisterInfo({ ...registerInfo, name: e.target.value });
                  }} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  placeholder="Enter email address"
                  onChange={(e) => {
                    updateRegisterInfo({
                      ...registerInfo,
                      email: e.target.value,
                    });
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
                    updateRegisterInfo({
                      ...registerInfo,
                      password: e.target.value,
                    });
                  }} />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-black" htmlFor="file_input">Profile picture</label>
              <input className="block w-full text-sm py-1.5 text-gray-900 border border-gray-300 rounded-lg cursor-pointer ring-gray-300 bg-white focus:outline-none pl-4" id="file_input" type="file" onChange={handleImageUpload} />
              <p className="mt-1 text-sm text-[#040404bf] opacity-1" id="file_input_help">* PNG, JPG(MAX. 30kb).</p>
            </div>

            <p className="mt-10 text-left text-sm text-gray-500">
              Already have an account? {"  "}
              <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
            </p>
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isRegisterLoading ? <CircularProgress color="info" size={'23px'} /> : "Sign up"}</button>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
};

export default Register;
