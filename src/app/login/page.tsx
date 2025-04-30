import LoginForm from "@/compontents/LoginForm";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center  space-y-5 p-10 w-full h-screen bg-insta-gradiant">
      <h1 className="text-white text-4xl font-bold">Instagram Clone</h1>
      <LoginForm />
      <span className="text-white">or</span>
      <div className="flex items-center text-white space-x-1 hover:cursor-pointer">
        <FontAwesomeIcon icon={faGithub} size="xl" />
        <span className="font-medium">깃허브로 로그인하기</span>
      </div>
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
