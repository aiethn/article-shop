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
  }, [data, page]);

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
      <div className="flex justify-end">
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
      {!data || !selectedData || isLoading ? (
        <SkeletonHome />
      ) : (
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
      )}
      <Pagination page={page} handlePage={handlePage} />
    </div>
  );
}
