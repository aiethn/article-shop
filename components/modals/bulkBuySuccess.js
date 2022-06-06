import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  buyItem,
  deleteFromCartById,
  getCoins,
  getTicket,
} from "../../features/Cart";

export function BulkBuySuccess({ setShowModalConfirm, item, price, discount }) {
  const [successBuy, setSuccessBuy] = useState(false);
  const dispatch = useDispatch();
  const handleOnBuy = () => {
    item.forEach((x) => {
      dispatch(buyItem({ itemPurchased: x.item, coins: x.price }));
      dispatch(deleteFromCartById(x.item.id));
    });
    setSuccessBuy(true);
    dispatch(getCoins(discount));
    if (price >= 50000) {
      const ticketCount = Math.floor(price / 50000);
      dispatch(getTicket(ticketCount));
    }
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
              <p className="font-bold text-2xl mb-4">
                {successBuy ? "Payment Success" : "Confirm Payment"}
              </p>
              {successBuy ? (
                <>
                  <h2 className="text-4xl font-bold py-4">Success</h2>
                  <div className="w-16 text-green-300">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </>
              ) : (
                <>
                  <ul className="list-disc text-left space-y-3 mx-2">
                    {item?.map((article) => (
                      <li key={article.item.id}>
                        {article.item.title}{" "}
                        <span className="font-bold">({article.price})</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 font-bold text-2xl">Total Payment</p>
                  <p className="text-2xl">{price}</p>
                </>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 pt-0 rounded-b">
              <div className="p-3 text-center space-x-4 md:block">
                <button
                  onClick={(e) => setShowModalConfirm(false)}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium text-lg tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  {successBuy ? "OK" : "Cancel"}
                </button>
                {!successBuy && (
                  <button
                    onClick={(e) => handleOnBuy()}
                    className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium text-lg tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  >
                    Buy
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
