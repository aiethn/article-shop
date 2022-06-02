import { configureStore } from "@reduxjs/toolkit";
import { Layout } from "../sections/Layout";
import articleReducer from "../features/Article";
import cartReducer from "../features/Cart";
import "../styles/globals.css";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    article: articleReducer,
    cart: cartReducer,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
