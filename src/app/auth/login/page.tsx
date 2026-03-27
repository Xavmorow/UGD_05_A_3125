'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
// Import icon untuk mata, refresh, dan social
import { FaEye, FaEyeSlash, FaGithub, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiRefreshCcw } from 'react-icons/fi';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  // 1. Kumpulan State Utama
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  
  const [attempts, setAttempts] = useState(3); // Menyimpan sisa kesempatan login 
  const [currentCaptcha, setCurrentCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Untuk toggle mata 
  const [errors, setErrors] = useState({ email: '', password: '', captcha: '' });

  // 2. Fungsi Generate Captcha Acak 
  const generateCaptcha = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Men-generate captcha pertama kali saat halaman dimuat
  useEffect(() => {
    setCurrentCaptcha(generateCaptcha());
  }, []);

  // 3. Fungsi Handle Submit & Validasi
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: '', password: '', captcha: '' });

    // Cek apakah kesempatan sudah habis [cite: 10]
    if (attempts <= 0) {
      toast.error('Kesempatan login habis!', { theme: 'dark' });
      return;
    }

    let hasError = false;
    const newErrors = { email: '', password: '', captcha: '' };

    if (!email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
      hasError = true;
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password tidak boleh kosong';
      hasError = true;
    }

    if (captchaInput !== currentCaptcha) {
      newErrors.captcha = 'Captcha tidak valid';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // === GANTI INI DENGAN NPM KAMU === [cite: 27, 32]
    const targetEmail = "3125@gmail.com"; 
    const targetPassword = "241713125";

    // Logika Sukses / Gagal
    if (email === targetEmail && password === targetPassword) {
      // Login Berhasil [cite: 116]
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('Login Berhasil!', { theme: 'dark' });
      router.push('/home');
      
    } else {
      // Login Gagal, kurangi kesempatan [cite: 6]
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      
        if (newAttempts > 0) {
          toast.error(`Login Gagal! Sisa kesempatan: ${newAttempts}`, { theme: 'dark' });
        } else {
          toast.error('Login Gagal! Kesempatan login habis.', { theme: 'dark' });
        }
    }
  };

  return (
    <>
      {/* Background Layer: Memaksa penuh seukuran layar terlepas dari padding global */}
      <div className="fixed inset-0 w-full h-full bg-slate-50 overflow-hidden z-[-10]">
        {/* Modern Aurora / Animated Orbs Background */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-cyan-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-sm p-8 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50">
        <h2 className="text-2xl font-black text-center mb-2 text-gray-800">Login</h2>
        <p className="text-xs text-gray-500 text-center mb-6">Sisa kesempatan: {attempts}</p>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            placeholder="Masukan email"
            className={`w-full p-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 placeholder-gray-400 transition-colors ${errors.email ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'}`}
          />
          {errors.email && <p className="text-[11px] text-red-500 mt-1 italic">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              placeholder="Masukan password"
              className={`w-full p-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 pr-10 placeholder-gray-400 transition-colors ${errors.password ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'}`}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-[11px] text-red-500 mt-1 italic">{errors.password}</p>}
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center text-xs text-gray-500 cursor-pointer">
            <input type="checkbox" className="mr-2 rounded border-gray-300 text-blue-500 focus:ring-blue-500 shadow-sm" />
            Ingat saya
          </label>
          <a href="#" className="text-xs text-blue-600 font-semibold hover:underline">Forgot password?</a>
        </div>

        {/* Captcha Input */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <label className="text-xs font-bold text-gray-700">Captcha:</label>
            <div className="bg-gray-50 border px-3 py-1.5 rounded text-sm font-bold tracking-widest text-gray-800 select-none">
              {currentCaptcha}
            </div>
            <button 
              type="button" 
              onClick={() => {
                setCurrentCaptcha(generateCaptcha());
                if (errors.captcha) setErrors({ ...errors, captcha: '' });
              }}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FiRefreshCcw className="text-sm font-bold" />
            </button>
          </div>
          <input 
            type="text"
            value={captchaInput}
            onChange={(e) => {
              setCaptchaInput(e.target.value);
              if (errors.captcha) setErrors({ ...errors, captcha: '' });
            }}
            placeholder="Masukan captcha"
            className={`w-full p-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 placeholder-gray-400 transition-colors ${errors.captcha ? 'border-red-400 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'}`}
          />
          {errors.captcha && <p className="text-[11px] text-red-500 mt-1 italic">{errors.captcha}</p>}
        </div>

        {/* Buttons */}
        <button 
          type="submit" 
          disabled={attempts === 0}
          className={`w-full py-2.5 mb-3 text-sm text-white font-semibold rounded-md transition-colors ${attempts === 0 ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Sign In
        </button>

        <button 
          type="button" 
          disabled={attempts > 0}
          onClick={() => {
            setAttempts(3);
            setCurrentCaptcha(generateCaptcha());
            setCaptchaInput('');
            setErrors({ email: '', password: '', captcha: '' });
          }}
          className={`w-full py-2.5 mb-6 text-sm font-semibold rounded-md transition-all duration-300 ${attempts === 0 ? 'bg-green-500 hover:bg-green-600 text-white shadow-md animate-pulse cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Reset Kesempatan
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-3 text-[11px] text-gray-400">Atau masuk dengan</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <button type="button" className="p-2 bg-gray-50 rounded-full border hover:bg-gray-100 transition-colors shadow-sm">
            <FcGoogle className="text-xl" />
          </button>
          <button type="button" className="p-2 bg-gray-50 rounded-full border hover:bg-gray-100 transition-colors shadow-sm">
            <FaGithub className="text-xl text-gray-800" />
          </button>
          <button type="button" className="p-2 bg-gray-50 rounded-full border hover:bg-gray-100 transition-colors shadow-sm">
            <FaFacebook className="text-xl text-blue-600" />
          </button>
        </div>

        {/* Register Link */}
        <p className="text-xs text-center text-gray-500">
          Tidak punya akun? <Link href="/auth/register" className="font-semibold text-blue-600 hover:underline">Daftar</Link>
        </p>

      </form>
    </>
  );
}     