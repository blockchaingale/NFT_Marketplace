import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux/es/exports.js";
import store from "./store/index.jsx";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./hooks/scrollToTop";
import "react-loading-skeleton/dist/skeleton.css";
import 'react-multi-carousel/lib/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'rc-slider/assets/index.css';

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);



ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <BrowserRouter>
          <ScrollToTop />
          <App />
      </BrowserRouter>
  </Provider>
);
