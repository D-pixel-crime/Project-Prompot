"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const userLoggedInOrNot = true;
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Prompot Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Prompot</p>
      </Link>
      <div className="sm:flex hidden">
        {userLoggedInOrNot ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="outline_btn">
              Create Post
            </Link>
            <button className="black_btn" type="button" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                className="rounded-full"
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                alt="Profile Image"
              />
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
