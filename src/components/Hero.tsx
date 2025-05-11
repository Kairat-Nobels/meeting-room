"use client";

import { Link } from "react-router-dom";
import { SparklesCore } from "./ui/sparkles";

export function Hero() {
  return (
    <div
      style={{
        backgroundImage: "url('/room.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md"
    >
      <h1 className="py-3 md:text-5xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Система бронирования конференц-залов
      </h1>
      <p className="text-white text-center text-lg md:text-xl">
        Эффективное и простое бронирование помещений для любых ваших встреч.
      </p>
      <button className="mt-3 text-white bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full">
        <Link to="/meeting-rooms">Забронировать</Link>
      </button>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
