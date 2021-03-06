import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCart } from "../features/Cart";
import { BulkBuySuccess } from "../components/modals/bulkBuySuccess";
import { Discount } from "../components/Discount";
import { BulkCard } from "../components/BulkCard";
import { BulkBuyError } from "../components/modals/bulkBuyError";

export default function Cart() {
  const dispatch = useDispatch();
  const articleCart = useSelector((state) => state.cart.itemCart);
  const myCoins = useSelector((state) => state.cart.coins);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalError, setShowModalError] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [finalPrice, setFinalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const handleOnConfirm = () => {
    if (myCoins < totalPrice) {
      setShowModalError("balance");
    } else if (selectedItem.length < 1) {
      setShowModalError("empty");
    } else setShowModalConfirm(true);
  };

  const handleSelectedItem = (value, param, price) => {
    if (param === "selected") {
      if (selectedItem) {
        const objVal = {
          item: value,
          price: price,
        };
        setSelectedItem([...selectedItem, objVal]);
      } else setSelectedItem([objVal]);
      setTotalPrice(totalPrice + price);
    } else {
      const newVal = selectedItem.filter(
        (article) => article.item.id != value.id
      );
      setSelectedItem(newVal);
      setTotalPrice(totalPrice - price);
    }
  };

  const handleCoupon = (value) => {
    setCoupon(value);
    if (value === "FAQIHCAKEP100") setDiscount(totalPrice);
    else if (value === "DISKONUNTUNG50")
      setDiscount(Math.round(totalPrice / 2));
    else if (value === "FAQIHCAKEP24" && totalPrice >= 50000)
      setDiscount(20000);
    else setDiscount(0);
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
          <div className="text-center md:text-5xl text-3xl font-bold h-60 align-center flex flex-col items-center justify-center space-y-6">
            <p>No item in Cart</p>
            <Link href="/">
              <button className="flex align-center justify-center items-center bg-white px-5 py-2 md:text-2xl text-lg shadow-sm bg-teal-300 tracking-wider border rounded-xl hover:shadow-lg hover:bg-teal-600 hover:text-white">
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
                <BulkCard
                  key={item.id}
                  item={item}
                  handleSelectedItem={(a, b, c) => handleSelectedItem(a, b, c)}
                  disableOnCoupon={coupon}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-6 md:w-[30%] w-full mt-4">
            <div className="flex flex-col space-y-4 bg-white rounded-lg border border-gray-200 shadow-md w-full p-4">
              <p>The total amount of</p>
              <div className="flex justify-between">
                <p>Temporary Amount</p>
                <p>{totalPrice}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p>{discount}</p>
              </div>
              <div className="flex justify-between">
                <p>The total amount of (Including VAT)</p>
                <p>{totalPrice - discount}</p>
              </div>
              {/* <p className="text-center font-bold text-2xl">{totalPrice}</p> */}
              <button
                onClick={(e) => handleOnConfirm()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center w-full"
              >
                Go To Checkout
              </button>
            </div>
            <Discount setCoupons={(e) => handleCoupon(e)} />
          </div>
        </div>
      )}
      {showModalConfirm && (
        <BulkBuySuccess
          setShowModalConfirm={(e) => setShowModalConfirm(e)}
          item={selectedItem}
          price={totalPrice - discount}
          discount={discount}
        />
      )}
      {showModalError && (
        <BulkBuyError
          setShowModalError={(e) => setShowModalError(e)}
          param={showModalError}
        />
      )}
    </div>
  );
}
