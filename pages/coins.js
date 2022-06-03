import { useState } from "react";
import { useSelector } from "react-redux";
import { Topup } from "../components/modals/topup";

export default function Coins() {
  const coin = useSelector((state) => state.cart.coins);
  const [showTopUp, setShowTopUp] = useState(false);
  return (
    <div>
      <div className="flex flex-col justify-center text-center align-center text-4xl h-96 space-y-10">
        <p>Your Coin Amount</p>

        <span className="font-bold">{coin}</span>
        <div className="flex justify-center">
          <button
            onClick={(e) => setShowTopUp(true)}
            className="w-40 flex align-center justify-center items-center bg-white px-5 py-2 text-2xl shadow-sm bg-teal-300 tracking-wider border rounded-xl hover:shadow-lg hover:bg-teal-600 hover:text-white"
          >
            Top Up
          </button>
        </div>
      </div>
      {showTopUp && <Topup setShowTopUp={(e) => setShowTopUp(e)} />}
    </div>
  );
}
