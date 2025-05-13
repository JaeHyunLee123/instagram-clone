"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";

import Link from "next/link";
import Button from "./ui/Button";
import { useQuery } from "@tanstack/react-query";
import { getSessionClient, logout } from "@/actions/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useReducer } from "react";

export default function Header() {
  const router = useRouter();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["session"],
    queryFn: getSessionClient,
  });

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const pathname = usePathname();

  useEffect(() => {
    // This runs on every URL change
    console.log(pathname);
    refetch();
    forceUpdate();
  }, [pathname, refetch]);

  const handleLogout = async () => {
    await logout();

    refetch();
    forceUpdate();

    router.push("/");
  };

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
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link href={"/register"}>
              <Button variants="outline">Register</Button>
            </Link>
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
