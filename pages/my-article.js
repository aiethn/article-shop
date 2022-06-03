import { useSelector } from "react-redux";
import { Card } from "../components/Card";

export default function MyArticle() {
  const article = useSelector((state) => state.cart.itemPurchased);

  return (
    <div>
      <div className="flex justify-center mb-10">
        <h2 className="font-bold text-3xl">Purchased Items</h2>
      </div>
      {article.length < 1 ? (
        <div className="text-center text-3xl font-bold h-60 align-center flex items-center justify-center">
          No item purchased yet
        </div>
      ) : (
        <div className="flex flex-wrap">
          {article.map((item) => (
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
  );
}
