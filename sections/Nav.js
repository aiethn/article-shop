import { faCartShopping, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  const coins = useSelector((state) => state.cart.coins);
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
      }  backdrop-blur supports-backdrop-blur:bg-white/95 fixed py-1 w-full top-0 z-40 dark:bg-black/50`}
    >
      <div className="flex justify-center w-full">
        <div className="mx-auto md:w-[950px] w-96 relative">
          <nav className="flex justify-center space-x-2 w-5xl my-4 text-xl">
            <Link href="/">
              <a
                className={`${styles.linkUnderline} px-4 font-display max-w-sm font-bold font-poppins leading-tight`}
              >
                Home
              </a>
            </Link>
          </nav>
          <div className="absolute right-10 top-4 flex">
            <FontAwesomeIcon icon={faCoins} className="w-6 mr-2" />
            <p className="font-bold">{coins}</p>
          </div>
          <div className="absolute right-0 top-4 w-6 cursor-pointer">
            <Link href="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
