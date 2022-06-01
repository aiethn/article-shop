import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  const [scroll, setScroll] = useState(false);
  const handleScroll = () => {
    if (scroll !== window.pageYOffset > 0) {
      setScroll(window.pageYOffset > 0);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header
      className={`overflow-x-hidden ${
        scroll
          ? "border-b-[1px] dark:border-gray-900 border-gray-300/50 bg-white/50"
          : ""
      }  backdrop-blur supports-backdrop-blur:bg-white/95 fixed py-1 w-full top-0 z-40  dark:bg-black/50`}
    >
      <div className="flex justify-between">
        <nav className="flex space-x-2 justify-center my-4 w-full p-2 ">
          <Link href="/">
            <a
              className={`${styles.linkUnderline} pt-3 px-4 font-display max-w-sm font-bold font-poppins leading-tight`}
            >
              Home
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
