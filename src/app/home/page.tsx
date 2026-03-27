'use client'
import React, { useEffect, useState } from "react";
import Game1 from "../../components/Game1";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      router.push('/auth/not-authorized');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null; // Mencegah flashing konten game

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/auth/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-900 relative">
      <button 
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors"
      >
        Logout
      </button>
      <h1 className="text-4xl font-bold mb-4 text-white mt-10">Selamat Datang!</h1>
      <Game1 />
    </div>
  );
}