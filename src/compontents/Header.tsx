"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";

import Link from "next/link";
import Button from "./ui/Button";
import { useQuery } from "@tanstack/react-query";
import { getSessionClient } from "@/actions/auth";

export default function Header() {
  const { data, isPending } = useQuery({
    queryKey: ["sesssion"],
    queryFn: getSessionClient,
  });

  return (
    <header className="bg-white w-full flex items-center justify-center px-5 py-6">
      <span className="text-black font-bold text-2xl inline-block w-[33%]">
        Instagram
      </span>
      <Link href={"/"} className="flex items-center justify-center w-[33%]">
        <FontAwesomeIcon
          icon={faInstagram}
          size="3x"
          className="text-black hover:text-gray-700 hover:scale-105 transition-transform"
        />
      </Link>

      <div className="w-[33%] flex items-center justify-end space-x-4">
        {isPending ? (
          <></>
        ) : data && data.session ? (
          <>
            <span>{`Hi, ${data.session.nickname}`}</span>
            <Button>Logout</Button>
          </>
        ) : (
          <>
            <Button variants="outline">Register</Button>
            <Button>Login</Button>
          </>
        )}
      </div>
    </header>
  );
}
