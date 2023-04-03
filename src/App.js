import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./components/Views/Home";
import Contact from "./components/Views/Contact";
import Event from "./components/Views/Event";
import About from "./components/Views/About";
import LoginForm from "./components/Views/Auth/LoginForm";
import RegisterForm from "./components/Views/Auth/RegisterForm";
import AuthContextProvider from "./contexts/AuthContext";
import Auth from "./components/layouts/Auth";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
// import { Suspense } from "react";
// const Map = lazy(() => import("./components/Views/Map"));

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="" element={<Layout />}>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="contact" element={<Contact />}></Route>
                            <Route path="event" element={<Event />}></Route>
                            <Route path="about" element={<About />}></Route>
                        </Route>
                        {/* <Route path="login" element={<LoginForm />}></Route>
                    <Route path="register" element={<RegisterForm />}></Route> */}
                        <Route path="" element={<Auth />}>
                            <Route path="login" element={<LoginForm />} />
                            <Route path="register" element={<RegisterForm />} />
                            {/* <Route
                            path="activate-account"
                            element={
                                <Suspense fallback={<Loading />}>
                                    <ActivateAccount />
                                </Suspense>
                            }
                        />
                        <Route path="reset-password" element={<ResetPassword />} /> */}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </ThemeProvider>
    );
}

export default App;
