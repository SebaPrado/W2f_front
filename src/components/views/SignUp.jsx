import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authUser } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import "/src/login.css";

// import { notify } from "../../notify";

function SignUp() {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!firstname || !lastname || !email || !password) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un email válido");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const createUser = async () => {
      try {
        const axiosConfig = {
          method: "POST",
          url: `${import.meta.env.VITE_API_URL}/users`,
          data: {
            name: firstname,
            last_name: lastname,
            email: email,
            password: password,
          },
        };
        const response = await axios(axiosConfig);
        console.log("Respuesta del servidor:", response.data);
        !response.data.constraint && navigate("/");
      } catch (err) {
        console.error("Error detallado:", err.response?.data);
        setError(err.response?.data?.message || "Error al crear el usuario");
        console.log("Datos enviados:", {
          name: firstname,
          last_name: lastname,
          email: email,
          password: password,
        });
      }
    };
    createUser();
  };

  return (
    <>
      <div className="vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row g-0">
            <div className="d-none d-md-block col-md-5 col-lg-7">
              <div className="login-first-box h-100">
                <div className="d-flex justify-content-center align-items-center h-100">
                  <img src="/img/ac.png" alt="" className="" />
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-5">
              <div className="bg-white p-5 login-second-box">
                <div className="mb-4">
                  <h3>Create an Account</h3>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                </div>
                <div className="d-flex flex-column justify-content-around align-items-center">
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="input-group mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        placeholder="Firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>

                    <div className="input-group mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        placeholder="Lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>

                    <div className="input-group mb-4">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="input-group mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password (mínimo 6 caracteres)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength="6"
                      />
                    </div>

                    <button
                      className="btn login-custom-btn mb-5 w-100 auth-btn text-white"
                      style={{ backgroundColor: "rgba(1, 91, 81, 0.9)" }}
                    >
                      Sign Up
                    </button>
                    <div>
                      <h6>
                        Already have an account?{" "}
                        <Link
                          className="text-secondary-emphasis LoginToSignUpButton"
                          to={`/login`}
                        >
                          Login
                        </Link>
                      </h6>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
