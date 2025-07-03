"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FC } from "react";
import githubLogin from "@/actions/social-auth";

interface SocialMediaLoginButtonProps {}

const SocialMediaLoginButton: FC<SocialMediaLoginButtonProps> = ({}) => {
  return (
    <button
      onClick={githubLogin}
      className="flex items-center text-white space-x-1 hover:cursor-pointer"
    >
      <FontAwesomeIcon icon={faGithub} size="xl" />
      <span className="font-medium">깃허브로 시작하기</span>
    </button>
  );
};

export default SocialMediaLoginButton;
