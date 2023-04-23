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
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import PostDetail from "./components/posts/PostDetail";
import ConfirmAccount from "./components/Views/Auth/ConfirmAccount";
import Profile from "./components/Views/User/Profile";
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
                            <Route path="posts/:id" element={<PostDetail />}></Route>

                            <Route path="event" element={<Event />}></Route>
                            <Route path="about" element={<About />}></Route>
                            <Route path="my-profile" element={<Profile />} />
                        </Route>
                        <Route path="login" element={<LoginForm />} />
                        <Route path="register" element={<RegisterForm />} />
                        <Route path="active-account" element={<ConfirmAccount />} />
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </ThemeProvider>
    );
}

export default App;
