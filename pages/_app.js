import { configureStore } from "@reduxjs/toolkit";
import { Layout } from "../sections/Layout";
import articleReducer from "../features/Article";
import cartReducer from "../features/Cart";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { localSave } from "../middleware/LocalStorage";

const store = configureStore({
  reducer: {
    article: articleReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localSave),
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
