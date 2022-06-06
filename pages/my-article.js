import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../components/Card";
import { fetchPurchased } from "../features/Cart";

export default function MyArticle() {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.cart.itemPurchased);
  const car = useSelector((state) => state.cart);
  const [searchValue, setSearchValue] = useState("");
  const filterArticleByUser = article.filter((article) => {
    const searchContent = article.title + article.byline + article.abstract;
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const displayPosts = !searchValue ? article : filterArticleByUser;

  useEffect(() => {
    dispatch(fetchPurchased());
  }, []);

  return (
    <div>
      <div className="flex justify-center mb-10">
        <h2 className="font-bold text-3xl">Purchased Items</h2>
      </div>
      <div className="relative">
        <label>
          <input
            placeholder="Search articles"
            onChange={(e) => setSearchValue(e.target.value)}
            className="block w-full px-4 py-3 text-gray-900 border-0 bg-gray-200 bg-opacity-50 rounded-md  focus:ring-primary-500 focus:border-primary-500 "
            type="text"
          />
          <svg
            className="absolute w-6 h-6 text-gray-400 right-3 top-3 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </label>
      </div>
      {article.length < 1 ? (
        <div className="text-center text-3xl font-bold h-60 align-center flex items-center justify-center">
          No item purchased yet
        </div>
      ) : (
        <>
          {!displayPosts.length && searchValue && (
            <div className="text-center text-3xl font-bold h-60 align-center flex items-center justify-center">
              No Article Found.
            </div>
          )}
          <div className="flex flex-wrap">
            {displayPosts.map((item) => (
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
        </>
      )}
    </div>
  );
}
