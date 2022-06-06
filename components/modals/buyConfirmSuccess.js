import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { buyItem, deleteFromCartById, GetTicket } from "../../features/Cart";

export function BuyConfirmSuccess({
  setShowBuyModal,
  coins,
  item,
  checkIsPurchased,
}) {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const handleOnPay = () => {
    if (coins >= 50000) {
      const numberTicket = Math.floor(parseInt(coins) / 50000);
      for (var i = 0; i < numberTicket; i++) {
        dispatch(GetTicket());
      }
    }
    dispatch(buyItem({ coins: coins, itemPurchased: item }));
    dispatch(deleteFromCartById(item.id));
    setIsSuccess(true);
  };

  const handleOnBack = () => {
    setShowBuyModal("");
    checkIsPurchased(item);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-lg">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            {/* <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"></div> */}
            {/*body*/}
            <div className="text-center p-5 flex flex-col justify-center items-center">
              {isSuccess ? (
                <>
                  <h2 className="text-4xl font-bold py-4">Success</h2>
                  <div className="w-16 text-green-300">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-bold py-4">Buy Confirmation</h2>
                  <h2 className="text-gray-500 text-2xl px-8">
                    Buy this article?
                  </h2>
                </>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 pt-0 rounded-b">
              <div className="p-3 text-center space-x-4 md:block">
                {!isSuccess && (
                  <button
                    onClick={(e) => setShowBuyModal("")}
                    className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium text-lg tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={(e) => (!isSuccess ? handleOnPay() : handleOnBack())}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium text-lg tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  {!isSuccess ? "Pay" : "Ok"}
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
