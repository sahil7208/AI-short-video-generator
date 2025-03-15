"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Authentication } from "./Authentication";
import { useAuthContext } from "../provider";
import Link from "next/link";

export const Header = () => {
  const { user } = useAuthContext();
  console.log("user at header: ", user);

  return (
    <header className="p-4 flex items-center justify-between bg-black text-white shadow-lg rounded-lg">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <h2 className="text-2xl font-bold text-white">Video Gen</h2>
      </div>

      {/* Auth / User Section */}
      <div>
        {!user ? (
          <Authentication>
            <Button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-500 hover:shadow-md transition-all rounded-lg">
              Get Started
            </Button>
          </Authentication>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button className="px-6 py-2 text-black bg-white hover:bg-gray-200 transition-all rounded-lg">
                Dashboard
              </Button>
            </Link>
            {user?.pictureURL && (
              <Image
                src={user.pictureURL}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-gray-400 transition-transform hover:scale-110"
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
};
