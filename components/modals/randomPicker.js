import { useRandomReveal } from "react-random-reveal";
import { useDispatch } from "react-redux";
import { getCoins } from "../../features/Cart";

export function RandomPicker({ reward, isPlaying, handleOnClick }) {
  const dispatch = useDispatch();
  const randomPicker = useRandomReveal({
    isPlaying: isPlaying,
    duration: 3,
    characters: reward != 0 ? reward : "ZONK",
    updateInterval: 0.05,
  });

  const handleOnSave = () => {
    handleOnClick(true);
    dispatch(getCoins(parseInt(reward)));
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-lg">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="text-center p-5 flex flex-col justify-center items-center">
              <h2 className="text-2xl py-4">Your Reward</h2>
              <div className="font-bold text-6xl">{randomPicker}</div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 pt-0 rounded-b">
              <div className="p-3 text-center space-x-4 md:block">
                <button
                  onClick={(e) => handleOnSave()}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
