import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export function generateMetadata() {
  return {
    title: "Terraforge"
  };
}

export default function HomePage() {
  return (
    <main className="w-full h-full">
      <div className="flex flex-col w-full justify-center items-center h-96 gap-6 pt-48">
        <h1 className="text-4xl text-center font-bold sm:text-6xl md:text-7xl">
          The place for Terraria Mods
        </h1>
        <p className="text-center text-xl sm:text-2xl md:text-3xl sm:px-32">Discover, play, and share Terraria mods through our open-source platform built for the community.</p>
        <div className="flex gap-4">
          <Link href="/mods" className={buttonVariants({ variant: "default" })}>Discover mods</Link>
          <Link href="/sign-up" className={buttonVariants({ variant: "outline" })}>Sign up</Link>
        </div>
      </div>
    </main>
  );
}