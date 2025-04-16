import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "/src/login.css";
import { useDispatch } from "react-redux";
import { userId, userName } from "../../redux/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Establecer valores predeterminados para pruebas
    setPassword("user2");
    setEmail("user3@gmail.com");
  }, []);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        console.log("token ", response.data.token);
        console.log("name ", response.data.userFirstname);
        console.log("identification ", response.data.id);


        dispatch(userId({ identification: response.data.token }));
        dispatch(userName({ name: response.data.userFirstname }));
        dispatch(userId({identification: response.data.id}))

        navigate("/0"); // Redirigir solo si la respuesta tiene un token válido
      }
    } catch (err) {
      console.error("Error en el login", err);
      setError(err.response?.data?.msg || "Error en el inicio de sesión seba");
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row g-0">
          <div className="d-none d-md-block col-md-5 col-lg-7">
            <div className="login-first-box h-100">
              <div className="d-flex justify-content-center align-items-center h-100">
                <img src="/img/ac.png" alt="login_image" className="" />
              </div>
            </div>
          </div>
          <div className="col-md-7 col-lg-5">
            <div className="bg-white p-5 login-second-box">
              <div className="mb-4">
                <h3>User Login</h3>
              </div>
              <div className="d-flex flex-column justify-content-around align-items-center">
                {error && <div className="alert alert-danger">{error}</div>}
                <form className="w-100" onSubmit={handleSubmit}>
                  <div className="input-group mb-5">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmail}
                    />
                  </div>
                  <div className="input-group mb-5">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={handlePassword}
                    />
                  </div>
                  <button className="btn login-custom-btn mb-5 w-100 auth-btn text-white">
                    Login
                  </button>
                  <hr />
                  <h6>
                    New to our website?{" "}
                    <Link
                      className="text-secondary-emphasis LoginToSignUpButton"
                      to={`/signup`}
                    >
                      Sign up
                    </Link>
                  </h6>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

//---------------------------------        Original de equal vision   >>       ------------------------------------------ //

// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { authUser } from "../../redux/userSlice";
// // import { notify2, notify3 } from "../../notify";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleEmail = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePassword = (event) => {
//     setPassword(event.target.value);
//   };

//   useEffect(() => {
//     setPassword("user")
//     setEmail("user1@ha.dev");
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const loginAttempt = async () => {
//       try {
//         const axiosConfig = {
//           method: "POST",
//           url: `${import.meta.env.VITE_API_URL}/tokens/users`,
//           data: {
//             email: email,
//             password: password,
//           },
//         };
//         const response = await axios(axiosConfig);
//         if (response.data.constraint) {
//           notify2(response.data.msg);
//         } else {
//           dispatch(
//             authUser({
//               token: response.data.token,
//               userFirstname: response.data.userFirstname,
//             })
//           );
//           navigate("/");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     loginAttempt();
//   };

//   return (
//     <>
//       <div className="vh-100 d-flex align-items-center">
//         <div className="container">
//           <div className="row g-0">
//             <div className="d-none d-md-block col-md-5 col-lg-7">
//               <div className="login-first-box h-100">
//                 <div className="d-flex justify-content-center align-items-center h-100">
//                   <img
//                     src="/img/equal-vision-auth-logo.png"
//                     alt=""
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-7 col-lg-5">
//               <div className="bg-white p-5 login-second-box ">
//                 <div className="mb-4">
//                   <h3>User Login</h3>
//                 </div>
//                 <div className="d-flex flex-column justify-content-around align-items-center">
//                   <form className="w-100" onSubmit={handleSubmit}>
//                     <div className="input-group mb-5">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Email"
//                         value={email}
//                         onChange={handleEmail}
//                       />
//                     </div>
//                     <div className="input-group mb-5">
//                       <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Password"
//                         value={password}
//                         onChange={handlePassword}
//                       />
//                     </div>
//                     <button className="btn login-custom-btn mb-5 w-100 auth-btn text-white">
//                       Login
//                     </button>
//                     <hr />

//                     <h6>
//                       New to our website?{" "}
//                       <Link
//                         className="text-secondary-emphasis  LoginToSignUpButton"
//                         to={`/signup`}
//                       >
//                         Sign up
//                       </Link>
//                     </h6>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;
