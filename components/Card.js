import Link from "next/link";

export function Card(props) {
  const {
    articleId,
    title,
    tags,
    date,
    author,
    desc,
    link,
    isLoading,
    imageLink,
  } = props;

  return (
    <div className="p-4 md:w-1/2 md max-w-[34rem] ">
      <Link href={`/article/${articleId}`}>
        <div className="h-full overflow-hidden border-2 border-gray-200 rounded-md hover:border-teal-400 cursor-pointer">
          <div className="p-6">
            <img src={imageLink} alt="news image" width={500} height={500} />
            <h4 className="my-4 text-2xl font-bold leading-8 tracking-tight text-black dark:text-white">
              {title}
            </h4>
            {/* <p className="mb-3 prose text-gray-500 max-w-none text-sm">
              {date} <span className="font-bold">{author}</span>
            </p> */}
            {/* <p className="mb-3 prose max-w-none">{desc}</p> */}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs  text-gray-700 mr-2 mb-2 ">
              {tags}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
