import React from "react";
import { Button } from "@/components/ui/button";
import { Authentication } from "./Authentication";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="px-6 py-16 mt-16 text-center flex flex-col items-center justify-center md:px-16 lg:px-28 xl:px-36">
      {/* Hero Title */}
      <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        AI YouTube Shorts Generator
      </h1>

      {/* Hero Subtitle */}
      <p className="mt-4 text-lg text-gray-400 sm:text-xl md:text-2xl max-w-3xl">
        AI generates scripts, images, and voiceovers in seconds. Create, edit,
        and publish engaging shorts with ease!
      </p>

      {/* Action Buttons */}
      <div className="mt-7 flex flex-wrap gap-5">
        <Link href="/explore">
          <Button
            size="lg"
            variant="secondary"
            className="px-6 py-3 text-lg bg-gray-800 text-white hover:bg-gray-700 transition-all"
          >
            Explore
          </Button>
        </Link>
        <Authentication>
          <Button
            size="lg"
            className="px-6 py-3 text-lg bg-blue-600 text-white hover:bg-blue-500 transition-all"
          >
            Get Started
          </Button>
        </Authentication>
      </div>
    </section>
  );
};
