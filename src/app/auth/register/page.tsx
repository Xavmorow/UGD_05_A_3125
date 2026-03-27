'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthFormWrapper from '../../../components/AuthFormWrapper';
import SocialAuth from '../../../components/SocialAuth';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiRefreshCcw } from 'react-icons/fi';

type RegisterFormData = {
  username: string;
  email: string;
  nomorTelp: string;
  password: string;
  confirmPassword: string;
  captcha: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();

  const [currentCaptcha, setCurrentCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  const generateCaptcha = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    setCurrentCaptcha(generateCaptcha());
  }, []);

  const strength = Math.min(
    (password.length > 7 ? 25 : 0) +
    (/[A-Z]/.test(password) ? 25 : 0) +
    (/[0-9]/.test(password) ? 25 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 25 : 0),
    100
  );

  let strengthColor = 'bg-red-500';
  if (strength >= 50) strengthColor = 'bg-yellow-500';
  if (strength >= 100) strengthColor = 'bg-green-500';

  const onSubmit = (data: RegisterFormData) => {
    toast.success('Register Berhasil!', { theme: 'dark', position: 'top-right'});
    router.push('/auth/login');
  };

  return (
    <AuthFormWrapper title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">

        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Username <span className="text-gray-500 text-xs">(max 8 karakter)</span>
          </label>
          <input
            id="username"
            {...register('username', { 
              required: 'Username tidak boleh kosong',
              minLength: { value: 3, message: 'Minimal 3 karakter' },
              maxLength: { value: 8, message: 'Maksimal 8 karakter' }
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan username"
          />
          {errors.username && <p className="text-red-500 text-[11px] italic mt-1">{errors.username.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'Email tidak boleh kosong',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|co)$/,
                message: 'Email tidak valid (harus ada @ dan .com/.net/.co)'
              }
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan email"
          />
          {errors.email && <p className="text-red-500 text-[11px] italic mt-1">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="nomorTelp" className="text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input
            id="nomorTelp"
            type="tel"
            {...register('nomorTelp', { 
              required: 'Nomor telepon tidak boleh kosong',
              minLength: { value: 10, message: 'Minimal 10 karakter' },
              pattern: { value: /^[0-9]+$/, message: 'Hanya boleh berisi angka' }
            })}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
            }}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.nomorTelp ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan nomor telepon"
          />
          {errors.nomorTelp && <p className="text-red-500 text-[11px] italic mt-1">{errors.nomorTelp.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register('password', { 
                required: 'Password tidak boleh kosong',
                minLength: { value: 8, message: 'Minimal 8 karakter' }
              })}
              className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-1 pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              placeholder="Masukkan password"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className={`h-1.5 rounded-full transition-all duration-300 ${strengthColor}`} style={{ width: `${strength}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Strength: {strength}%</p>
          {errors.password && <p className="text-red-500 text-[11px] italic mt-1">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Konfirmasi Password</label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register('confirmPassword', { 
                required: 'Konfirmasi password tidak boleh kosong',
                validate: value => value === password || 'Konfirmasi password tidak cocok'
              })}
              className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-1 pr-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              placeholder="Masukkan ulang password"
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-[11px] italic mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>
            <div className="bg-gray-50 border px-3 py-1.5 rounded text-sm font-bold tracking-widest text-gray-800 select-none">
              {currentCaptcha}
            </div>
            <button 
              type="button" 
              onClick={() => setCurrentCaptcha(generateCaptcha())}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FiRefreshCcw className="text-sm font-bold" />
            </button>
          </div>
          <input
            type="text"
            {...register('captcha', { 
              required: 'Captcha tidak boleh kosong',
              validate: value => value === currentCaptcha || 'Captcha tidak valid'
            })}
            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-1 ${errors.captcha ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            placeholder="Masukkan captcha"
          />
          {errors.captcha && <p className="text-red-500 text-[11px] italic mt-1">{errors.captcha.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg">
          Daftar
        </button>

        <SocialAuth />
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Sudah punya akun? <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-semibold">Login</Link>
      </p>
    </AuthFormWrapper>
  );
};

export default RegisterPage;