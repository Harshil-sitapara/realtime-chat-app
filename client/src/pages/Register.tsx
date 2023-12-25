const Register = () => (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6 form-inner">
        <form>
          <h3 className="mb-4">Register</h3>

          <div className="form-group my-2">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group my-2 mt-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
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
            />
          </div>
          <button type="submit" className="btn btn-outline-dark btn-block mt-3 ">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default Register;
