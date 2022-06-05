import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RandomPicker } from "../components/modals/randomPicker";
import { fetchTicket, UseTicket } from "../features/Cart";
import { RewardData } from "../data/reward";

export default function Ticket() {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.cart.ticket);
  const [reward, setReward] = useState("");
  const [showRandom, setShowRandom] = useState(false);

  useEffect(() => {
    dispatch(fetchTicket());
  });

  const handleOnPlay = () => {
    setShowRandom(true);
    setReward(
      RewardData[Math.floor(Math.random() * RewardData.length)].toString()
    );
    dispatch(UseTicket());
  };

  const handleOnClick = () => {
    setShowRandom(false);
  };

  return (
    <div>
      <div className="flex flex-col justify-center h-96">
        {ticket < 1 ? (
          <div>
            <h2 className="font-bold text-4xl text-center">
              Buy the article with minimum purchase 50000 to get 1 ticket!
            </h2>
          </div>
        ) : (
          <>
            <h2 className="font-bold text-4xl text-center">
              Exchange your ticket!
            </h2>
            <div className="flex justify-center items-center m-10">
              <button
                onClick={(e) => handleOnPlay()}
                className="flex align-center justify-center items-center bg-white px-5 py-2 text-2xl shadow-sm bg-teal-300 tracking-wider border rounded-xl hover:shadow-lg hover:bg-teal-600 hover:text-white"
              >
                Play
              </button>
            </div>
            <div className="text-center text-xl flex flex-col">
              <p>Tickets remaining</p>
              <p className="font-bold text-4xl mt-2">{ticket}</p>
            </div>
          </>
        )}
      </div>
      {showRandom && (
        <RandomPicker
          reward={reward}
          isPlaying={showRandom}
          handleOnClick={handleOnClick}
        />
      )}
    </div>
  );
}
