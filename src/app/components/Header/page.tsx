'use client'
import { useState } from "react";
import Link from "next/link";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Image from "next/image";
import StoreLogo from '../../../../public/store-logo.webp'


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
  ];

  //https://placehold.jp/36x36.png 
  // TODO:  mobile menu should me fill width
  return (
    <div className="relative mx-auto container">
      <nav>
        <header>
          <ul className="flex justify-between place-items-center py-2 xl:gap-4">
            <li style={{ height: '25px' }}>
              <Link href="/">
                <Image
                  src={StoreLogo}
                  alt="Store Logo"
                  width={100}
                  height={80}

                />
              </Link>
            </li>
            <li className="grid items-center mr-4 md:hidden">
              <button onClick={() => setIsMenuOpen(prev => !prev)} aria-label="Toggle mobile menu">
                {isMenuOpen ? <RxCross2 className="w-5 h-5" /> : <RxHamburgerMenu className="w-5 h-5" />}
              </button>
            </li>
            <li className="hidden md:block md:ml-auto md:px-1">
              <Link href="/">
                Home
              </Link>
            </li>
          </ul>
        </header>
      </nav>
      {
        isMenuOpen &&
        <div className="border px-4 py-2 absolute top-full z-10 bg-slate-100 w-full h-[100vh]">
          <ul className="flex gap-2 flex-col">
            {menuItems.map(item =>
              <li key={item.name}>
                <Link href={item.href} className="font-semibold">
                  {item.name}
                </Link>
              </li>
            )}
          </ul>
        </div>
      }
    </div>
  )
}
