'use client';
import { useRouter } from 'next/navigation';
import { FaLock } from 'react-icons/fa';

export default function NotAuthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-500 to-blue-700 p-4">
      <div className="bg-[#a6c1fd] p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-[340px] w-full">
        {/* Logo penanda belum login */}
        <div className="w-full flex justify-center mb-6 mt-2">
          <div className="w-24 h-24 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <FaLock className="text-red-500 text-5xl mb-1" />
          </div>
        </div>
        
        <h2 className="text-[17px] font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
          <span className="text-red-500">❌</span> Anda belum login
        </h2>
        
        <p className="text-xs text-gray-700 font-medium mb-5">
          Silakan login terlebih dahulu
        </p>

        <button 
          onClick={() => router.push('/auth/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
        >
          <span>&larr;</span> Kembali
        </button>
      </div>
    </div>
  );
}
