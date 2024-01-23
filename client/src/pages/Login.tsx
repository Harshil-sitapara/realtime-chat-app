import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/auth.context";

export default function Login() {
  const { loginInfo, setLoginInfo, loginUser, loginError } =
    useContext(AuthContext);
  const showToastMessage = (msg: string) => {
    toast.error(msg);
  };
  useEffect(() => {
    if (loginError ) {
      showToastMessage(loginError);
    }
  }, [loginError]);
  return (
    <>
      <div className="container mt-5">
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
      </div>
    </>
  );
}
