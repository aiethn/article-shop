import { useDispatch, useSelector } from "react-redux";
import { Card } from "../components/Card";
import Link from "next/link";
import { useEffect } from "react";
import { fetchCart } from "../features/Cart";

export default function Cart() {
  const dispatch = useDispatch();
  const articleCart = useSelector((state) => state.cart.itemCart);
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  return (
    <div>
      <div className="flex justify-center mb-10">
        {articleCart.length > 0 && (
          <h2 className="font-bold text-3xl">Your Cart</h2>
        )}
      </div>
      <div>
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
                imageLink={item.media?.[0]["media-metadata"]?.[2].url}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
