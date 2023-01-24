import type { NextPage } from "next";
import { selectAuthState, setAuthState, setATkn } from "../src/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Home: NextPage = () => {
  const { authState, a_tkn } = useSelector(selectAuthState);
  console.log("state", authState, a_tkn);
  const dispatch = useDispatch();
  return (
    <div>
      <div>{authState ? "Logged in" : "Not Logged In"}</div>
      <button
        onClick={() => {
          dispatch(setATkn("asdf"));
          authState
            ? dispatch(setAuthState(false))
            : dispatch(setAuthState(true));
        }}
      >
        {authState ? "Logout" : "LogIn"}
      </button>
    </div>
  );
};

export default Home;
