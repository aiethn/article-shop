import Link from "next/link";
export function BulkBuyError({ setShowModalError, param }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-lg">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="text-center p-5 flex flex-col justify-center items-center">
              {param === "balance" && (
                <>
                  <p className="font-bold text-4xl">Balance Insufficient</p>
                  <p>You have less coins than total amount cart</p>
                </>
              )}
              {param === "empty" && (
                <>
                  <p className="font-bold text-2xl mb-4">
                    Your Selected Item in Cart is Empty
                  </p>
                  <p>
                    Go back to cart and select the item that you wanna buy by
                    checklist the item.
                  </p>
                </>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-6 pt-0 rounded-b">
              <div className="p-3 text-center space-x-4 md:block">
                <button
                  onClick={(e) => setShowModalError(false)}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium text-lg tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  {param === "balance" && "Cancel"}
                  {param === "empty" && "Ok"}
                </button>
                {param === "balance" && (
                  <Link href="/coins">
                    <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium text-lg tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                      Top Up
                    </button>
                  </Link>
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
