import LoginForm from "@/compontents/LoginForm";
import SocialMediaLoginButton from "@/compontents/ui/SocialMediaLoginButton";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center  space-y-5 p-10 w-full h-full  bg-insta-gradiant">
      <h1 className="text-white text-4xl font-bold">Instagram Clone</h1>
      <LoginForm />
      <span className="text-white">or</span>
      <SocialMediaLoginButton />
      <div className="w-4/5 max-w-sm  border-b border-white" />
      <div className="flex flex-col items-center space-y-2 text-white">
        <span className="text-sm">아직 계정이 없으신가요?</span>
        <Link href="/register" className="text-lg font-medium">
          회원가입
        </Link>
      </div>
    </div>
  );
}
