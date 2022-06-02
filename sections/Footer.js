export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 py-6 mt-10">
      <div className="text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Made With{" "}
        <img
          className="inline"
          alt="heart"
          height="20"
          width="20"
          src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
        />{" "}
        By{" "}
        <a href="https://faqihethana.com" target="_blank" rel="noreferrer">
          {" "}
          Faqih Ethana Prabandaru{" "}
        </a>
        , All Rights Reserved
      </div>
    </footer>
  );
}
