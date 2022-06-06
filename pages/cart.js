import { useDispatch, useSelector } from "react-redux";
import { Card } from "../components/Card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCart } from "../features/Cart";
import { BulkBuySuccess } from "../components/modals/bulkBuySuccess";

export default function Cart() {
  const dispatch = useDispatch();
  const articleCart = useSelector((state) => state.cart.itemCart);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const handleOnConfirm = () => {
    setShowModalConfirm(true);
  };

  return (
    <div>
      <div className="flex justify-center mb-10">
        {articleCart.length > 0 && (
          <h2 className="font-bold text-3xl">Your Cart</h2>
        )}
      </div>
      {articleCart.length < 1 ? (
        <div>
          <div className="text-center text-3xl font-bold h-60 align-center flex flex-col items-center justify-center space-y-6">
            <p>No item in Cart</p>
            <Link href="/">
              <button className="flex align-center justify-center items-center bg-white px-5 py-2 text-sm shadow-sm bg-teal-300 tracking-wider border rounded-xl hover:shadow-lg hover:bg-teal-600 hover:text-white">
                Go Shopping
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[70%] w-full">
            <div className="flex flex-wrap">
              {articleCart.map((item) => (
                <Card
                  key={item.id}
                  articleId={item.id}
                  title={item.title}
                  tags={item.section}
                  date={item.published_date}
                  author={item.byline}
                  desc={item.abstract}
                  link={item.url}
                  imageLink={
                    item.media?.[0]?.["media-metadata"]?.[2].url
                      ? item.media?.[0]["media-metadata"]?.[2].url
                      : item.media?.[0]?.["media-metadata"]?.[1].url
                      ? item.media?.[0]["media-metadata"]?.[1].url
                      : item.media?.[0]?.["media-metadata"]?.[0].url
                      ? item.media?.[0]["media-metadata"]?.[0].url
                      : "/banner.jpg"
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-6 md:w-[30%] w-full mt-4">
            <div className="flex flex-col space-y-4 bg-white rounded-lg border border-gray-200 shadow-md w-full p-4">
              <p>The total amount of</p>
              <p className="text-center font-bold text-2xl">20000</p>
              <button
                onClick={(e) => handleOnConfirm()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center w-full"
              >
                Go To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      {showModalConfirm && (
        <BulkBuySuccess setShowModalConfirm={(e) => setShowModalConfirm(e)} />
      )}
    </div>
  );
}
