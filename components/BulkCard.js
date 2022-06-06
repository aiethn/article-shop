import Link from "next/link";
import { useEffect, useState } from "react";

export function BulkCard({ item, handleSelectedItem, disableOnCoupon }) {
  const [checked, setChecked] = useState(false);
  const [price, setPrice] = useState(0);
  const d = new Date();
  let time = d.getTime();
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const getPrice = (date) => {
    const artDate = Date.parse(date);
    const convertedDate = (time - artDate) / day;
    const articlePrices =
      convertedDate < 7 ? (convertedDate <= 1 ? 50000 : 20000) : 0;
    return articlePrices;
  };

  useEffect(() => {
    const articlePrice = getPrice(item.published_date);
    setPrice(articlePrice);
  }, []);

  const handleOnChange = () => {
    if (!checked) {
      setChecked(true);
      handleSelectedItem(item, "selected", price);
    } else {
      setChecked(false);
      handleSelectedItem(item, "unselected", price);
    }
  };

  return (
    <div className="p-4 md:w-1/2 md max-w-[34rem] ">
      <div className="h-full overflow-hidden border-2 border-gray-200 rounded-md hover:border-teal-400">
        <div className="p-6">
          <Link href={`/article/${item.id}`} passHref>
            {/* eslint-disable */}
            <img
              src={
                item.media?.[0]?.["media-metadata"]?.[2].url
                  ? item.media?.[0]["media-metadata"]?.[2].url
                  : item.media?.[0]?.["media-metadata"]?.[1].url
                  ? item.media?.[0]["media-metadata"]?.[1].url
                  : item.media?.[0]?.["media-metadata"]?.[0].url
                  ? item.media?.[0]["media-metadata"]?.[0].url
                  : "/banner.jpg"
              }
              alt="news image"
              width={500}
              height={500}
              className="cursor-pointer"
            />
          </Link>
          <Link href={`/article/${item.id}`} passHref>
            <h4 className="my-4 text-2xl font-bold leading-8 tracking-tight text-black cursor-pointer">
              {item.title}
            </h4>
          </Link>
          <div className="flex justify-between">
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs  text-gray-700 mr-2 mb-2 ">
              {item.section}
            </div>
            <div>
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  checked={checked}
                  disabled={disableOnCoupon ? true : false}
                  onChange={(e) => handleOnChange()}
                >
                  {/* <span>{price}</span> */}
                </input>
                <span className="ml-2 font-bold">{price}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
