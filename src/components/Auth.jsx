/* eslint-disable react/prop-types */
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { auth, provider } from "../firebase-config";

const Auth = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      navigate("/chatRoom");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[200px] gap-5">
      <p>Sign In With Google To Continue</p>
      <button
        onClick={signInWithGoogle}
        className="bg-red-400  py-1 px-3 text-white rounded-md mt-4"
      >
        Sign In With Google
      </button>
    </div>
  );
};

export default Auth;
