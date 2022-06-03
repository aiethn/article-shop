import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCoins } from "../../features/Cart";
import { Payment } from "../Payment";

export function Topup({ setShowTopUp }) {
  const dispatch = useDispatch();
  const [step, setStep] = useState("input");
  const [totalCoins, setTotalCoins] = useState(null);
  const [showErrorType, setShowErrorType] = useState("");

  const handleOnNext = () => {
    if (!totalCoins) setShowErrorType("empty");
    else if (totalCoins.match(/[^0-9]+/)) setShowErrorType("numberonly");
    else if (totalCoins > 1000000000) setShowErrorType("limit");
    else {
      setStep("payment");
      setShowErrorType("");
    }
  };

  const handleOnPay = () => {
    dispatch(getCoins(parseInt(totalCoins)));
    setStep("success");
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-2">
        <div className="relative w-full my-6 mx-auto max-w-lg">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="text-center p-5 flex flex-col justify-center items-center lg:space-y-2">
              {step === "input" ? (
                <>
                  <p className="p-2 font-bold text-2xl">Input Amount</p>
                  <input
                    onChange={(e) => setTotalCoins(e.target.value)}
                    value={totalCoins}
                    className="p-6 border"
                    type="text"
                  />
                </>
              ) : step === "payment" ? (
                <>
                  <div className="text-2xl font-bold mb-4">
                    <p>Choose Your Payment Method</p>
                  </div>
                  <Payment />
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-bold py-4">Success</h2>
                  <div className="w-16 text-green-300">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </>
              )}
              {showErrorType && (
                <p className="text-red-600">
                  {showErrorType === "empty" && "Cannot Empty!"}
                  {showErrorType === "numberonly" && "Number Only!"}
                  {showErrorType === "limit" &&
                    "Cant purchase more than 1 bio!"}
                </p>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 pt-0 rounded-b">
              {step !== "success" && (
                <div className="p-3 text-center space-x-4 md:block">
                  <button
                    onClick={(e) =>
                      step === "input" ? setShowTopUp(false) : setStep("input")
                    }
                    className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  >
                    Back
                  </button>
                </div>
              )}

              <div className="p-3 text-center space-x-4 md:block">
                <button
                  onClick={(e) =>
                    step === "input"
                      ? handleOnNext()
                      : step === "payment"
                      ? handleOnPay()
                      : setShowTopUp(false)
                  }
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  {step === "input"
                    ? "Next"
                    : step === "payment"
                    ? "Pay"
                    : "Ok"}
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
