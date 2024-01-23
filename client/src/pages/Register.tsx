import { ChangeEvent, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { toast } from "react-hot-toast";

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
    TransformFile(file);
  };
  const TransformFile = (file: any) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64File = reader.result;
        console.log("Reader",reader)
        updateRegisterInfo({ ...registerInfo, profilePhoto:base64File });
      };
    }
  };
  return (
    <div className="container mt-5" style={{ width: "100%" }}>
      <div className="row justify-content-center">
        <div className="col-md-6 form-inner">
          <form
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              registerUser(`/users/register`, registerInfo);
            }}
          >
            <h3 className="mb-4">Register</h3>

            <div className="form-group my-2">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your username"
                onChange={(e) => {
                  updateRegisterInfo({ ...registerInfo, name: e.target.value });
                }}
              />
            </div>
            <div className="form-group my-2 mt-2">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                onChange={(e) => {
                  updateRegisterInfo({
                    ...registerInfo,
                    email: e.target.value,
                  });
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
                placeholder="Password"
                onChange={(e) => {
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group my-2 mt-2">
              <label htmlFor="exampleInputPassword1">Profile picture</label>
              <input
                type="file"
                accept="image/"
                className="form-control"
                onChange={handleImageUpload}
                required
              />
            </div>
            {isRegisterLoading ? (
              <button className="btn btn-dark btn-block mt-3" disabled>
                <i className="fa fa-spinner fa-spin"></i> Loading
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-outline-dark btn-block mt-3"
              >
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
