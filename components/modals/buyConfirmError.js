import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function BuyConfirmError({ setShowBuyModal, params }) {
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
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="w-10 text-red-700"
              />
              <h2 className="text-3xl font-bold py-4">Failed to Purchase</h2>
              <h2 className="text-gray-500 text-xl px-8">
                Balance Insufficient
              </h2>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 pt-0 rounded-b">
              <div className="p-3 text-center space-x-4 md:block">
                <button
                  // onClick={(e) => setShowBuyModal(false)}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Topup Coins
                </button>
              </div>
              <div className="p-3 text-center space-x-4 md:block">
                <button
                  onClick={(e) => setShowBuyModal("")}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Back
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
