import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import Select from "react-select";
const options = [
  { label: "Most Viewed", value: "viewed" },
  { label: "Most Emailed", value: "emailed" },
  { label: "Most Shared", value: "shared" },
];
export default function Home() {
  const [data, setData] = useState("");
  const [filter, setFilter] = useState("viewed");

  useEffect(() => {
    fetchData();
  }, [filter]);

  const handleOnChange = (sel) => {
    setFilter(sel.value);
  };

  const fetchData = async () => {
    await axios
      .get(`https://api.nytimes.com/svc/mostpopular/v2/${filter}/7.json`, {
        params: {
          "api-key": "GCiigkBqjNBRfAzqikbVaMfQUuAJZ4sN",
        },
      })
      .then((response) => {
        const filterData = response.data.results;
        setData(filterData);
      })
      .catch((error) => console.log(error));
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flex justify-end">
        <Select
          onChange={handleOnChange}
          options={options}
          defaultValue={options[0]}
        />
      </div>
      <div className="flex flex-wrap">
        {data.map((article) => (
          <Card
            key={article.id}
            title={article.title}
            tags={article.des_facet}
            date={article.published_date}
            author={article.byline}
            desc={article.abstract}
            link={article.url}
          />
        ))}
      </div>
    </div>
  );
}
