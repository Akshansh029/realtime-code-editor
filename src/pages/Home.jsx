import React from "react";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <div className="flex items-center justify-center text-white h-[100vh] ">
      <div className="bg-formBg p-5 rounded-xl w-[400px] max-w-[50%]">
        <Logo />
        <h4 className="mb-4">Paste invitation Room ID</h4>
        <div className="flex flex-col ">
          <input
            type="text"
            name=""
            id=""
            placeholder="Room ID"
            className="p-2 rounded-md outline-none border-none mb-3 text-sm bg-[#eee] font-bold text-gray-700"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Username"
            className="p-2 rounded-md outline-none border-none mb-3 text-sm bg-[#eee] font-bold text-gray-700"
          />
          <button
            type="button"
            className="joinBtn border-none p-2 rounded-md text-sm cursor-pointer transition-all ease-in-out duration-200 bg-emerald-400 text-black font-bold ml-auto w-24 hover:bg-emerald-500"
          >
            Join
          </button>
          <span className="mt-5 my-0 mx-auto">
            If you don't have an invite then create &nbsp;{" "}
            <a
              href=""
              className="text-emerald-400 decoration-none border-b-2 border-emerald-400 cursor-pointer transition-all ease-in-out duration-200 hover:text-emerald-500 hover:border-b-emerald-500"
            >
              New Room
            </a>
          </span>
        </div>
      </div>
      <footer className="fixed bottom-5">
        <h4 className="">
          Crafted with Care by{" "}
          <a
            href="https://github.com/Akshansh029"
            target="_blank"
            className="text-emerald-400 hover:text-emerald-500 underline"
          >
            Akshansh
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
