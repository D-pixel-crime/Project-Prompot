"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const userLoggedInOrNot = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setProviders();
  }, []);

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
            <Link href="/create-prompt" className="outline_black_btn">
              Create Post
            </Link>
            <button className="red_btn" type="button" onClick={signOut}>
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
          <>
            {providers &&
              Object.values(providers).map((eachProvider) => {
                return (
                  <button
                    type="button"
                    key={eachProvider.name}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn(eachProvider.id);
                    }}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {userLoggedInOrNot ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              alt="profile"
              onClick={(e) => {
                e.preventDefault();
                setToggleDropDown((preValue) => !preValue);
              }}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="red_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((eachProvider) => {
                return (
                  <button
                    type="button"
                    key={eachProvider.name}
                    onClick={(e) => {
                      e.preventDefault();
                      signIn(eachProvider.id);
                    }}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
