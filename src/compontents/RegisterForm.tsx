"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import AuthInput from "./ui/AuthInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/actions/auth";

const registerSchema = z
  .object({
    email: z.string().email({ message: "부정확한 이메일 형식입니다." }),
    nickname: z.string().min(2, { message: "최소 2글자 이상 입력해주세요." }),
    password: z.string().min(6, { message: "최소 6글자 이상 입력해주세요." }),
    passwordConfirmation: z.string(),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirmation"],
        message: "비밀번호가 서로 다릅니다.",
      });
    }
  });

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.code === "OK") {
      } else if (data.code === "EMAIL_DUPLICATE") {
      } else {
      }
    },
    onError: () => {},
  });

  const onSubmit = ({
    email,
    nickname,
    password,
  }: z.infer<typeof registerSchema>) => {
    mutate({ email, password, nickname });
  };

  return (
    <form
      className="flex flex-col space-y-2 w-full max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AuthInput
        placeholder="Email"
        type="email"
        {...register("email")}
        errorMessage={errors.email?.message}
      />
      <AuthInput
        placeholder="Nickname"
        type="text"
        {...register("nickname")}
        errorMessage={errors.nickname?.message}
      />
      <div className="flex items-center space-x-2">
        <AuthInput
          placeholder="Password"
          type={isPasswordVisible ? "text" : "password"}
          {...register("password")}
          errorMessage={errors.password?.message}
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
        <AuthInput
          placeholder="Password Confirmation"
          type={isPasswordConfirmationVisible ? "text" : "password"}
          {...register("passwordConfirmation")}
          errorMessage={errors.passwordConfirmation?.message}
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
      <button
        disabled={isPending}
        className={`bg-blue-400 text-white font-semibold p-2 text-center rounded mt-4 transition-transform active:scale-95  hover:cursor-pointer`}
      >
        {isPending ? "서버와 통신 중 입니다." : "회원가입"}
      </button>
    </form>
  );
};

export default RegisterForm;
