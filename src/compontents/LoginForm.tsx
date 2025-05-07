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
import { toast } from "sonner";

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
        toast("로그인에 성공했습니다!", {
          closeButton: true,
        });
        router.push("/");
      } else if (data.code === "INCORRECT_PASSWORD") {
        toast("비밀번호가 틀렸습니다.", {
          closeButton: true,
        });
      } else if (data.code === "NO_USER") {
        toast("등록되지 않은 이메일입니다.", {
          closeButton: true,
        });
      } else if (data.code === "SOCIAL_USER") {
        toast("소셜 회원가입한 계정입니다.", {
          description: "소셜 회원가입한 서비스로 로그인해주세요.",
          closeButton: true,
        });
      } else if (data.code === "UNKOWN_ERROR") {
        toast("알 수 없는 서버 에러가 발생했습니다.", {
          description: "잠시 후 다시 시도해주세요.",
          closeButton: true,
        });
      } else {
        toast("알 수 없는 서버 에러가 발생했습니다.", {
          description: "잠시 후 다시 시도해주세요.",
          closeButton: true,
        });
      }
    },
    onError: () => {
      toast("알 수 없는 서버 에러가 발생했습니다.", {
        description: "잠시 후 다시 시도해주세요.",
        closeButton: true,
      });
    },
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
