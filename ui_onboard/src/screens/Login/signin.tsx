//Chetan Patil - [20-07-23] - Sign in page for users to sign in

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../hooks/app";
import { useNavigate, useParams } from "react-router-dom";
import { signIn } from "../../actions/user";
import { isPasswordValid, isTextValid } from "../../helpers/validate";
import { UserRoles } from "../../constants/constants";
import { Button } from "../../common/Button/Button";
import { TextField } from "../../common/TextField/TextField";
import { Loading } from "../../common/Loading/Loading";

interface Props {
  history?: History;
}
export const SignIn: React.FC<Props> = (props) => {
  const [userName, setUserName] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [passwordError, setPasswordError] = useState<string>("");

  const [userNameError, setUserNameError] = useState<string>("");

  const [userNameValid, setUserNameValid] = useState<boolean>();
  // console.log('userNameValid: ', userNameValid);
  // console.log('userName: ', userName);

  const [passwordValid, setPasswordValid] = useState<boolean>();

  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  console.log("user: ", user);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleClick = async () => {
    // debugger;
    setUserNameValid(isTextValid(userName));
    console.log("userName: ", userName);

    setPasswordValid(isPasswordValid(password));
    console.log("password: ", password);

    if (isTextValid(userName) && isPasswordValid(password)) {
      setUserNameError("");
      setPasswordError("");
      if (localStorage.getItem("token") && localStorage.getItem("user")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        await dispatch(signIn(userName, password));
      } else {
        await dispatch(signIn(userName, password));
      }
      console.log("user?.userDetails?.role: ", user?.userDetails?.role);
      console.log(
        "UserRoles?.BRAVEN_TOOL_ADMIN: ",
        UserRoles?.BRAVEN_TOOL_ADMIN
      );
      if (
        // user?.userDetails?.role === UserRoles?.BRAVEN_TOOL_ADMIN &&
        // localStorage.getItem("token") &&
        // localStorage.getItem("user")
        true
      ) {
        console.log("if: ");
        navigate("/home-page", { replace: true });
      }
    } else {
      // console.log('else: ');
      if (!userNameValid) {
        setUserNameError("User Name should not be empty.");
      }
      if (!passwordValid) {
        setPasswordError("Password is invalid. Must be at least 6 characters");
      }
    }

    // useEffect(() => {
    //   if (
    //     user.userDetails
    //     // &&  !loading
    //   ) {
    //     if (user.userDetails.role === UserRoles.BRAVEN_TOOL_ADMIN) {
    //       navigate("/home-page", { replace: true });
    //     }
    //     //  else if (user.userDetails.role === UserRoles.USER) {
    //     //   navigate("/recruiter-dashboard", { replace: true });
    //     // } else if (user.userDetails.role === UserRoles.ADMIN) {
    //     //   navigate("/admin-dashboard", { replace: true });
    //     // } else if (user.userDetails.role === UserRoles.CANDIDATE) {
    //     //   if (id) {
    //     //     dispatch(setExamCode(id));
    //     //     navigate("/test-taker", { state: { id } });
    //     //   } else {
    //     //     navigate("/candidate-dashboard", { replace: true });
    //     //   }
    //     // }
    //   }
    // }, [
    //   user.userDetails,
    //   //  loading
    // ]);
    // const loadingState = useSelector((state: RootState) => state.loading);
  };
  return (
    <body className="antialiased bg-gradient-to-br from-[#a7d3ff] to-white w-[100%]">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
          <div className="flex flex-col w-full">
            <div>
              <svg
                className="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <h1 className="text-5xl text-gray-800 font-bold">Onboarding</h1>
            <p className="w-5/12 mx-auto md:mx-0 text-gray-500">
              Control and monitorize your website data from dashboard.
            </p>
          </div>
          <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                Sign In
              </h2>
              <form action="" className="w-full">
                <div id="input" className="flex flex-col w-full my-5">
                  <label className="text-gray-500 mb-2">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setUserNameValid(isTextValid(e.target.value));
                      if (!userNameValid) {
                        setUserNameError("User Name should not be empty.");
                      }
                    }}
                    placeholder="Please insert your username"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:to-[#1976D2] focus:shadow-lg"
                  />
                  {!userNameValid && (
                    <p className="" style={{ fontSize: "12px", color: "red" }}>
                      {userNameError}
                    </p>
                  )}
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label className="text-gray-500 mb-2">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordValid(isPasswordValid(e?.target?.value));
                      if (!passwordValid) {
                        setPasswordError(
                          "Password is invalid. Must be at least 6 characters"
                        );
                      }
                    }}
                    placeholder="Please insert your password"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:to-[#1976D2] focus:shadow-lg"
                  />
                  {!passwordValid && (
                    <p className="" style={{ fontSize: "12px", color: "red" }}>
                      {passwordError}
                    </p>
                  )}
                </div>
                <div id="button" className="flex flex-col w-full my-5">
                  <button
                    type="button"
                    className="w-full py-3 bg-[#1976D2] rounded-lg text-green-100"
                    onClick={handleClick}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="mr-2">
                        <div className="font-bold ">Sign In</div>
                      </div>
                      <svg
                        className="w-6 h-6 text-right mt-2 ml-3 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                          // d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  <div className="flex justify-evenly mt-5">
                    <a
                      href="#"
                      className="w-full text-center font-medium text-gray-500"
                    >
                      Recover Password
                    </a>
                    <a
                      href="#"
                      className="w-full text-center font-medium text-gray-500"
                    >
                      Sing Up
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};
