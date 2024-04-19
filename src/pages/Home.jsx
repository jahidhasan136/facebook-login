import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import facebookLogo from "../assets/facebook.png";
import metaLogo from "../assets/meta.png";

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const numberEmail = form.numberEmail.value;
    const password = form.password.value;

    const loginUser = {
      numberEmail,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);

      // If login successful, you can redirect the user or perform other actions
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <div className="bg-[#F0F2F5] pt-20 grid justify-center text-center">
      <div>
        <div className="flex gap-1 items-end justify-center mb-20">
          <p>English (UK)</p>
          <MdKeyboardArrowDown className="text-xl" />
        </div>
        <img
          className="w-1/6 mx-auto mb-20"
          src={facebookLogo}
          alt="Facebook"
        />
        <form onSubmit={handleLogin} className="grid gap-5">
          <input
            className="block px-4 py-3 rounded-[10px]"
            placeholder="Mobile number or email address"
            name="numberEmail"
            type="text"
            required
          />
          <input
            className="block px-4 py-3 rounded-[10px]"
            placeholder="Password"
            name="password"
            type="password"
            required
          />
          <input
            className="px-4 py-3 bg-[#1877F2] text-white rounded-full cursor-pointer"
            type="submit"
            value="Log in"
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
        <p className="text-blue-500 cursor-pointer">Forgotten password?</p>
      </div>
      <div className="pt-[20vh] grid justify-center">
        <button className="px-4 py-3 border border-[#1877F2] text-[#1877F2] rounded-full mb-5">
          Create new account
        </button>
        <div className="flex items-center gap-1 mx-auto">
          <img className="w-5" src={metaLogo} alt="Meta" />
          <p>Meta</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
