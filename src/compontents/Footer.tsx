"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="flex items-center space-x-14 justify-center bg-white text-black absolute bottom-0 p-5 w-full">
      <Link
        href="/"
        className={cn(
          "size-11 flex items-center justify-center",
          pathname === "/" && "border-4 border-insta-gradiant rounded-full"
        )}
      >
        <FontAwesomeIcon
          icon={faHouse}
          size="xl"
          className={
            "hover:text-gray-700 hover:scale-105 transition-transform m-2"
          }
        />
      </Link>
      <Link
        href="/feed"
        className={cn(
          "size-11 flex items-center justify-center",
          pathname === "/feed" && "border-4 border-insta-gradiant rounded-full"
        )}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="xl"
          className={
            "hover:text-gray-700 hover:scale-105 transition-transform m-2"
          }
        />
      </Link>
      <Link
        href="/post"
        className={cn(
          "size-11 flex items-center justify-center",
          pathname === "/post" && "border-4 border-insta-gradiant rounded-full"
        )}
      >
        <FontAwesomeIcon
          icon={faSquarePlus}
          size="xl"
          className={
            "hover:text-gray-700 hover:scale-105 transition-transform m-2"
          }
        />
      </Link>
      <Link
        href="/profile"
        className={cn(
          "size-11 flex items-center justify-center",
          pathname === "/profile" &&
            "border-4 border-insta-gradiant rounded-full"
        )}
      >
        <FontAwesomeIcon
          icon={faUser}
          size="xl"
          className={
            "hover:text-gray-700 hover:scale-105 transition-transform m-2"
          }
        />
      </Link>
    </footer>
  );
}
