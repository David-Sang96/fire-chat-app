/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("date", "desc")
    );
    const unSubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unSubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messageRef, {
      text: newMessage,
      date: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };
  return (
    <div className="w-[500px] mx-auto border border-red-400 p-3 rounded-md space-y-3">
      <div>
        <h1>Welcome to : {room}</h1>
        <div>
          {messages.map((item) => (
            <h1 key={item.id}>{item.text}</h1>
          ))}
        </div>
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex items-center justify-center space-x-3"
      >
        <input
          type="text"
          value={newMessage}
          placeholder="type your message here..."
          className="border-2 rounded-md outline-none w-full p-1 text-sm"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-400  px-4 py-1  text-white rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
