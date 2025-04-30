"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";

interface FormData {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickName: string;
}

const RegisterForm = () => {
  const {} = useForm<FormData>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  return (
    <form className="flex flex-col space-y-2 w-full max-w-sm">
      <input
        placeholder="Email"
        type="email"
        className="bg-white placeholder:text-neutral-400 rounded p-2 w-full focus:outline-none focus:ring-3 focus: ring-blue-400"
      />
      <input
        placeholder="Nickname"
        type="text"
        className="bg-white placeholder:text-neutral-400 rounded p-2 w-full focus:outline-none focus:ring-3 focus: ring-blue-400"
      />
      <div className="flex items-center space-x-2">
        <input
          placeholder="Password"
          type={isPasswordVisible ? "text" : "password"}
          className="bg-white placeholder:text-neutral-400 rounded p-2 w-full focus:outline-none focus:ring-3 focus: ring-blue-400"
        />
        <button
          type="button"
          onClick={() => {
            setIsPasswordVisible(!isPasswordVisible);
          }}
          className="text-white text-2xl transition-transform active:scale-95 hover:scale-110 w-9  hover:cursor-pointer"
        >
          {isPasswordVisible ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <input
          placeholder="Password Confirmation"
          type={isPasswordConfirmationVisible ? "text" : "password"}
          className="bg-white placeholder:text-neutral-400 rounded p-2 w-full focus:outline-none focus:ring-3 focus: ring-blue-400"
        />
        <button
          type="button"
          onClick={() => {
            setIsPasswordConfirmationVisible(!isPasswordConfirmationVisible);
          }}
          className="text-white text-2xl transition-transform active:scale-95 hover:scale-110 w-9  hover:cursor-pointer"
        >
          {isPasswordConfirmationVisible ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </button>
      </div>
      <button className="bg-blue-400 text-white font-semibold p-2 text-center rounded mt-4 transition-transform active:scale-95  hover:cursor-pointer">
        회원가입
      </button>
    </form>
  );
};

export default RegisterForm;
