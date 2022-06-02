export function Pagination({ page, handlePage }) {
  const jumlahPage = 5;
  const handleOnClick = (value) => {
    handlePage(value);
  };
  return (
    <div className="flex justify-center items-center text-center mt-10">
      <div
        className="px-3 py-1 sm:px-4 mx-1 cursor-pointer hover:bg-indigo-400"
        onClick={(e) => page !== 1 && handleOnClick(page - 1)}
      >
        &lt;
      </div>
      {[...Array(jumlahPage)].map((item, idx) => (
        <div
          key={idx}
          onClick={(e) => handleOnClick(idx + 1)}
          className={`px-3 py-1 sm:px-4 mx-1 rounded-full cursor-pointer ${
            page === idx + 1 ? "bg-cyan-200" : "hover:bg-indigo-400"
          }`}
        >
          {idx + 1}
        </div>
      ))}
      <div
        className="px-3 py-1 sm:px-4 mx-1 cursor-pointer hover:bg-indigo-400"
        onClick={(e) => page !== jumlahPage && handleOnClick(page + 1)}
      >
        &gt;
      </div>
    </div>
  );
}
