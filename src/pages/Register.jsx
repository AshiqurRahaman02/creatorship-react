import React, { useState } from "react";
import Loading from "../components/Loading.jsx";
import FormInput from "../components/FormInput.jsx";
import notify from "../components/Notify.jsx";
import { signUp } from "../services/userService.js";
import { ToastContainer } from "react-toastify";
import GenerateOtpButton from "../components/GenerateOtpButton.jsx";
import { handleSendOtp } from "../services/mailService.js";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [type, setType] = useState<"" | "creator" | "business">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sentOtp, setSentOtp] = useState(null);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const navigate = useNavigate();

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      notify("Please enter a valid name, email, and password", "warning");
      return;
    }

    if (!emailVerified) {
      notify("Please verify your email first", "warning");
      return;
    }

    setLoading(true);

    try {
      const res = await signUp(name, email, password, type);
      if (res.isError) {
        notify(res.message, "warning");
      } else {
        handleSuccessfulSignup(res);
      }
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessfulSignup = (res) => {
    localStorage.setItem("userInfo", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleSendEmail = async () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    setSentOtp(otp);

    try {
      if (!email) {
        notify("Please enter a valid email", "warning");
        return;
      }
      const res = await handleSendOtp(email, otp);

      if (res.isError) {
        notify(res.message, "warning");
      } else {
        notify(res.message, "success");
      }
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <div className="relative px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="min-h-[calc(100vh-5vh)] text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-transparent shadow sm:rounded-lg flex justify-center flex-1">
          <div className="h-full flex items-center">
            {type ? (
              <form
                className="form"
                style={{
                  backgroundColor: "#ffffff40",
                  backdropFilter: "blur(55px)",
                }}
                onSubmit={handleSignUpSubmit}
              >
                <FormInput
                  label={`${type === "creator" ? "Personal" : "Company"} Name`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.4"
                      stroke="currentColor"
                      style={{ width: "24px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  }
                />

                <FormInput
                  label={`${type === "creator" ? "Personal" : "Company"} Email`}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={
                    <svg
                      height="20"
                      viewBox="0 0 32 32"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Layer_3" data-name="Layer 3">
                        <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                      </g>
                    </svg>
                  }
                  icon2={
                    emailVerified && (
                      <span className="p-1 mr-1" title="verify otp">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm0-14a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13z" />
                          <path d="M6.293 7.293a1 1 0 0 1 1.414 0L8 7.586l.293-.293a1 1 0 0 1 1.414 1.414L8 10.414 5.293 7.707a1 1 0 0 1 0-1.414z" />
                        </svg>
                      </span>
                    )
                  }
                />

                {!emailVerified && (
                  <GenerateOtpButton
                    email={email}
                    handleSendEmail={handleSendEmail}
                    setEmailVerified={setEmailVerified}
                    setOtp={setOtp}
                    sentOtp={sentOtp}
                  />
                )}

                {emailVerified && (
                  <FormInput
                    label="Enter OTP"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.4"
                        stroke="currentColor"
                        style={{ width: "24px" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 7v10m5-5H7"
                        />
                      </svg>
                    }
                  />
                )}

                <FormInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.4"
                      stroke="currentColor"
                      style={{ width: "24px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 7v10m5-5H7"
                      />
                    </svg>
                  }
                  icon2={
                    <span
                      className="p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-slash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1.5 8c0-.85.233-1.643.637-2.305L.44 4.916A1.207 1.207 0 0 1 0 5.513v.5a1.5 1.5 0 0 0 1.5 1.5c.13 0 .263-.012.392-.035A7.505 7.505 0 0 1 8 9.14a7.508 7.508 0 0 1 5.758-2.671A1.487 1.487 0 0 0 15.5 8a1.5 1.5 0 0 0-1.5-1.5c-.13 0-.263.012-.392.035A7.505 7.505 0 0 1 8 6.86a7.508 7.508 0 0 1-5.758 2.671A1.487 1.487 0 0 0 1.5 8zm14.56 1.695L13.945 9.12A4.477 4.477 0 0 1 8 11.276 4.48 4.48 0 0 1 4.69 8.69l-2.308-2.308A7.491 7.491 0 0 1 8 3.86a7.488 7.488 0 0 1 5.706 2.346l1.394-1.394a1.207 1.207 0 0 1 1.448-.25v.5a1.5 1.5 0 0 0-1.5 1.5c-.137 0-.272-.01-.404-.029A7.505 7.505 0 0 1 8 4.86a7.49 7.49 0 0 1-5.39 2.1L4.633 5.295A6.536 6.536 0 0 1 8 4.86a6.536 6.536 0 0 1 4.043 1.126L13.556 5.2a1.207 1.207 0 0 1 .343 1.447l-.342.435a1.484 1.484 0 0 0-.366.441L12.77 8.134a1.207 1.207 0 0 1-1.447.343l-1.05-1.05A4.477 4.477 0 0 1 8 6.86a4.48 4.48 0 0 1-2.571-.733l-1.048-1.048A4.477 4.477 0 0 1 8 4.86a4.48 4.48 0 0 1 2.569.732l1.048 1.048a4.477 4.477 0 0 1 1.482-.732c.748 0 1.462.222 2.078.598l-.006.031a4.48 4.48 0 0 1 0 4.73zM13.485 12.1a4.477 4.477 0 0 1-5.23-5.23l1.43-1.43a4.48 4.48 0 0 1 2.5.756c.76.32 1.513.804 2.191 1.383l-.936.936a4.477 4.477 0 0 1-.236.376zM9.5 8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm.75 1.5a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5z"></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm0-14a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13z" />
                          <path d="M6.293 7.293a1 1 0 0 1 1.414 0L8 7.586l.293-.293a1 1 0 0 1 1.414 1.414L8 10.414 5.293 7.707a1 1 0 0 1 0-1.414z" />
                        </svg>
                      )}
                    </span>
                  }
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? <Loading /> : "Sign Up"}
                </button>

                <ToastContainer />
              </form>
            ) : (
              <div className="p-8">
                <h2 className="text-center text-lg font-semibold mb-4">
                  Choose your type
                </h2>
                <div className="flex flex-col items-center">
                  <button
                    className="btn btn-outline-primary mb-4"
                    onClick={() => setType("creator")}
                  >
                    Creator
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setType("business")}
                  >
                    Business
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
