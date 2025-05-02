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
import { emailLogin } from "@/actions/auth";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "부정확한 이메일 형식입니다." }),
  password: z.string().min(6, { message: "최소 6글자 이상 입력해주세요." }),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: emailLogin,
    onSuccess: (data) => {
      if (data.code === "OK") {
        console.log("ok");
        router.push("/");
      } else if (data.code === "INCORRECT_PASSWORD") {
        console.log("p");
      } else if (data.code === "NO_USER") {
        console.log("u");
      } else if (data.code === "SOCIAL_USER") {
      } else if (data.code === "UNKOWN_ERROR") {
        console.log("e");
      } else {
        console.log("e");
      }
    },
    onError: () => {},
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = ({ email, password }: z.infer<typeof loginSchema>) => {
    mutate({ email, password });
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
      <button
        disabled={isPending}
        className="bg-blue-400 text-white font-semibold p-2 text-center rounded mt-4 transition-transform active:scale-95  hover:cursor-pointer"
      >
        {isPending ? "서버와 통신 중입니다." : "로그인"}
      </button>
    </form>
  );
};

export default LoginForm;
