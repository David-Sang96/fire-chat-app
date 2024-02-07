import { useRef, useState } from "react";
import Cookies from "universal-cookie";
import Auth from "./components/Auth";
import Chat from "./components/Chat";

const cookies = new Cookies();

function App() {
  const roomInput = useRef(null);
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="w-[300px] mx-auto flex flex-col justify-center items-center">
          <label htmlFor="" className="mb-5">
            Enter Room Name:{" "}
          </label>
          <input
            type="text"
            ref={roomInput}
            className="border-2 rounded-md outline-none w-full p-1 text-sm"
          />
          <button
            className="bg-red-400  py-1 px-3 text-white rounded-md mt-4"
            onClick={() => setRoom(roomInput.current.value)}
          >
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
