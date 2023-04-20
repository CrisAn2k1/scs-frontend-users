import React, { Suspense, memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";

const Layout = () => {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Header />
            </Suspense>

            <Outlet />

            <Suspense fallback={<Loading />}>
                <Footer />
            </Suspense>
        </>
    );
};

export default memo(Layout);
