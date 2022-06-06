import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import Select from "react-select";
import { SkeletonHome } from "../components/skeleton/SkeletonHome";
import { Pagination } from "../components/Pagination";
import { useDispatch } from "react-redux";
import { addArticle } from "../features/Article";
import { fetchCart, fetchPurchased } from "../features/Cart";

const optionsCat = [
  { label: "Most Viewed", value: "viewed" },
  { label: "Most Emailed", value: "emailed" },
  { label: "Most Shared", value: "shared" },
];

const optionsDay = [
  { label: "1 day", value: "1" },
  { label: "7 days", value: "7" },
  { label: "30 days", value: "30" },
];

export default function Home() {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const [filterCat, setFilterCat] = useState(optionsCat[0]);
  const [filterDay, setFilterDay] = useState(optionsDay[0]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
    dispatch(fetchPurchased());
  }, []);

  useEffect(() => {
    const newStart = 4 * (page - 1);
    const newEnd = 4 * page;
    setSelectedData(data.slice(newStart, newEnd));
    if (data && searchValue) {
      const filterArticleByUser = data.filter((article) => {
        const searchContent = article.title + article.byline + article.abstract;
        return searchContent.toLowerCase().includes(searchValue.toLowerCase());
      });
      setSelectedData(filterArticleByUser);
    }
  }, [data, page, searchValue]);

  const handleOnChange = (sel, filter) => {
    if (filter === "category") {
      if (sel !== filterCat) {
        setFilterCat(sel);
        fetchData();
        setSelectedData(data.slice(0, 4));
        setPage(1);
      }
    } else if (filter === "day") {
      if (sel !== filterDay) {
        setFilterDay(sel);
        fetchData();
        setSelectedData(data.slice(0, 4));
        setPage(1);
      }
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_MOSTPOPULAR_URI}/${filterCat.value}/${filterDay.value}.json`,
        {
          params: {
            "api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      )
      .then((response) => {
        const filterData = response.data.results;
        setData(filterData);
        dispatch(
          addArticle({
            item: filterData,
            category: filterCat.value,
            day: filterDay.value,
          })
        );
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePage = (value) => {
    setPage(value);
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col md:space-y-0 space-y-4 justify-between">
        <div className="relative">
          <label>
            <input
              placeholder="Search articles"
              onChange={(e) => setSearchValue(e.target.value)}
              className="block md:w-96 w-full px-4 py-3 text-gray-900 border-0 bg-gray-200 bg-opacity-50 rounded-md  focus:ring-primary-500 focus:border-primary-500 "
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
        <div className="flex">
          <Select
            instanceId="1"
            isSearchable={false}
            value={filterCat}
            defaultValue={optionsCat[0]}
            onChange={(e) => handleOnChange(e, "category")}
            options={optionsCat}
            className="mr-4"
          />
          <Select
            instanceId="2"
            isSearchable={false}
            value={filterDay}
            defaultValue={optionsDay[0]}
            onChange={(e) => handleOnChange(e, "day")}
            options={optionsDay}
          />
        </div>
      </div>
      {!data || !selectedData || isLoading ? (
        <SkeletonHome />
      ) : (
        <>
          {!selectedData.length && searchValue && (
            <div className="w-full sm:h-96 h-60 flex text-center justify-center items-center">
              <p className="font-bold text-xl">No Article Found.</p>
            </div>
          )}
          <div className="flex flex-wrap">
            {selectedData.map((article) => (
              <Card
                key={article.id}
                articleId={article.id}
                title={article.title}
                tags={article.section}
                date={article.published_date}
                author={article.byline}
                desc={article.abstract}
                link={article.url}
                imageLink={
                  article.media?.[0]?.["media-metadata"]?.[2].url
                    ? article.media?.[0]["media-metadata"]?.[2].url
                    : article.media?.[0]?.["media-metadata"]?.[1].url
                    ? article.media?.[0]["media-metadata"]?.[1].url
                    : article.media?.[0]?.["media-metadata"]?.[0].url
                    ? article.media?.[0]["media-metadata"]?.[0].url
                    : "/banner.jpg"
                }
              />
            ))}
          </div>
        </>
      )}
      {!searchValue && <Pagination page={page} handlePage={handlePage} />}
    </div>
  );
}
