import Head from "next/head";
import Footer from "./Footer";
import Nav from "./Nav";

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>NY TImes Article</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="font-poppins">
        <Nav />
        <div className="min-h-screen mx-auto max-w-5xl flex flex-col pt-10">
          <main className="flex-grow container mx-auto px-4 sm:px-6 pt-14">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
