import type { NextPage } from "next";
// import { useEffect } from "react";
// // import { selectAuthState, setAuthState, setATkn } from "../src/redux/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

const Home: NextPage = () => {
  // // const { authState, a_tkn } = useSelector(selectAuthState);
  // // console.log("state", authState, a_tkn);
  // const dispatch = useDispatch();

  // const reqq = () =>
  //   axios
  //     .get("http://localhost:3000/api/hello")
  //     .then((res) => {
  //       console.log(res);
  //       //localStorage.setItem("tkn", JSON.stringify(res));
  //     })
  //     .catch((err) => console.log(err));

  // useEffect(() => {
  //   reqq();
  // }, []);

  return (
    <div>
      {/* <div>{authState ? "Logged in" : "Not Logged In"}</div>
      <button
        onClick={() => {
          dispatch(setATkn("asdf"));
          authState
            ? dispatch(setAuthState(false))
            : dispatch(setAuthState(true));
        }}
      >
        {authState ? "Logout" : "LogIn"}
      </button> */}
    </div>
  );
};

export default Home;
