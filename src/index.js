import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import createSagaMiddleware from "redux-saga";
import mySaga from "./redux/sagas";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./redux/reducers";

import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(mySaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <Helmet>
                    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
                    <script src="/lib/easing/easing.min.js"></script>
                    <script src="/lib/owlcarousel/owl.carousel.min.js"></script>
                    <script src="/lib/waypoints/waypoints.min.js"></script>
                    <script src="/lib/counterup/counterup.min.js"></script>
                    <script src="/lib/parallax/parallax.min.js"></script>
                    {/* <!-- Contact Javascript File --> */}
                    <script src="/mail/jqBootstrapValidation.min.js"></script>
                    <script src="/mail/contact.js"></script>
                    {/* <!-- Template Javascript --> */}
                    <script src="/js/main.js"></script>{" "}
                </Helmet>
            </HelmetProvider>
            <App />
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
