import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/Article.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

export default function ArticleID() {
  const router = useRouter();
  const articleID = router.query["article-id"];
  const article = useSelector((state) => state.article.value);
  const cart = useSelector((state) => state.cart);
  const [selectedArticle, setSelectedArticle] = useState("");
  const [articlePrice, setArticlePrice] = useState("");
  const [isBought, setIsBought] = useState(false);

  const d = new Date();
  let time = d.getTime();
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  useEffect(() => {
    if (article.length < 1) {
      router.push("/");
    } else {
      const filtered = article.find((item) => item.id == articleID);
      setSelectedArticle(filtered);
      checkIsPurchased(filtered);
    }
  }, []);

  useEffect(() => {
    const artDate = Date.parse(selectedArticle.published_date);
    const convertedDate = (time - artDate) / day;
    const articlePrices =
      convertedDate < 7 ? (convertedDate <= 1 ? 50000 : 20000) : 0;
    setArticlePrice(articlePrices);
  }, [selectedArticle]);

  const checkIsPurchased = (item) => {};

  console.log(articlePrice);

  return (
    <div>
      <div className="flex justify-center flex-col align-center items-center">
        <Image
          src={
            selectedArticle
              ? selectedArticle.media?.[0]["media-metadata"]?.[2].url
              : "/"
          }
          alt="news image"
          width={400}
          height={300}
          className="drop-shadow-2xl"
        />
        <h2 className="font-bold text-2xl pt-6">{selectedArticle.title}</h2>
        <p className="text-sm py-2">
          {selectedArticle.published_date}{" "}
          <span className="font-bold ml-2">{selectedArticle.byline} </span>
        </p>
        <p className="mt-4">{selectedArticle.abstract}</p>
      </div>
      {isBought ? (
        <div className="flex justify-end">
          <div className="flex w-fit md:h-32 h-20 items-end align-center">
            <a
              className={styles.link && styles.linkArrowed}
              href={selectedArticle ? selectedArticle.url : "#"}
              target="_blank"
              rel="noreferrer"
            >
              Read More
              <svg
                className={styles.arrowIcon}
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                height={50}
                viewBox="0 0 50 50"
              >
                <g
                  fill="none"
                  stroke="#2175FF"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                >
                  <circle
                    className={styles.arrowIconCircle}
                    cx={16}
                    cy={16}
                    r="15.12"
                  />
                  <path d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98" />
                </g>
              </svg>
            </a>
          </div>
        </div>
      ) : (
        <div className="flex justify-between h-40 align-center items-center">
          <div className="text-2xl text-center">
            Price : <span className="font-bold">{articlePrice}</span>{" "}
          </div>
          <div className="flex h-16 text-center">
            {/* <div className="flex align-center justify-center items-center p-2 border-2 cursor-pointer hover:bg-gray-200 mr-4 rounded-md">
              <FontAwesomeIcon icon={faBasketShopping} className="w-6 mr-2" />
              <p>Add To Cart</p>
            </div> */}
            <div className="flex align-center justify-center items-center p-2 border-2 cursor-pointer hover:bg-gray-200 rounded-md">
              <FontAwesomeIcon icon={faCreditCard} className="w-6 mr-2" />
              <p>Buy Item</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}