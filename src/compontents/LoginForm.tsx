"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import AuthInput from "./ui/AuthInput";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {} = useForm<FormData>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form className="flex flex-col space-y-2 w-full max-w-sm">
      <AuthInput placeholder="Email" type="email" />
      <div className="flex items-center space-x-2">
        <AuthInput
          placeholder="Password"
          type={isPasswordVisible ? "text" : "password"}
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
      <button className="bg-blue-400 text-white font-semibold p-2 text-center rounded mt-4 transition-transform active:scale-95  hover:cursor-pointer">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
