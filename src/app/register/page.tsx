import RegisterForm from "@/compontents/RegisterForm";
import SocialMediaLoginButton from "@/compontents/ui/SocialMediaLoginButton";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center  space-y-5 p-10 w-full h-screen bg-insta-gradiant">
      <h1 className="text-white text-4xl font-bold">Instagram Clone</h1>
      <RegisterForm />
      <span className="text-white">or</span>
      <SocialMediaLoginButton />
      <div className="w-4/5 max-w-sm  border-b border-white" />
      <div className="flex flex-col items-center space-y-2 text-white">
        <span className="text-sm">이미 계정이 있으신가요?</span>
        <Link href="/login" className="text-lg font-medium">
          로그인
        </Link>
      </div>
    </div>
  );
}
