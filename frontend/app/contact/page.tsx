"use client";

import Button from "@/components/Button";
import { useState } from "react";

export default function Contact() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Full name: ", fullname);
    console.log("Email: ", email);
    console.log("Message: ", message);

    const res = await fetch("api/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        message,
      }),
    });

    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);

    if (success) {
      setFullname("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="max-container flex-col flexCenter py-28">
      <form
        onSubmit={handleSubmit}
        className="py-10 px-10 flex flex-col gap-5 shadow-lg rounded-lg"
      >
        <div className="flexBetween">
          <label htmlFor="fullname">Full Name </label>
          <input
            className="border-2 rounded-lg"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            type="text"
            id="fullname"
            placeholder=" John Doe"
          />
        </div>

        <div className="flexBetween">
          <label htmlFor="email">Email </label>
          <input
            className="border-2 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="email"
            placeholder=" john@gmail.com"
          />
        </div>

        <div className="flexBetween">
          <label htmlFor="message">Your Message</label>
          <textarea
            
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className=" border-2 rounded-lg"
            id="message"
            placeholder=" Type your message here..."
          ></textarea>
        </div>
        <Button 
          type="submit"
          title="Send"
          variant="btn_dark_green"
        />
        
      </form>

      <div className="bg-slate-100 flex flex-col">
        {error &&
          error.map((e) => (
            <div
              className={`${
                success ? "text-green-800" : "text-red-600"
              } px-5 py-2`}
            >
              {e}
            </div>
          ))}
      </div>
    </div>
  );
}