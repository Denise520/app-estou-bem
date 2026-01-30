'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-teal-400">
      <h1 className="text-white text-2xl md:text-3xl font-bold text-center mb-8 px-4">
        Um jeito simples de confirmar que você está bem.
      </h1>
      <div 
        onClick={handleLogoClick}
        className="cursor-pointer hover:opacity-80 transition-opacity"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleLogoClick();
          }
        }}
      >
        <Image
          src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/a1faf0fd-2dae-4cc7-89d3-7777dde3ac8d.jpg"
          alt="Logo Estou Bem"
          width={200}
          height={200}
          className="rounded-full shadow-lg"
        />
      </div>
    </div>
  );
}
