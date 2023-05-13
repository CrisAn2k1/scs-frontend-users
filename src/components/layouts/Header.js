import React, { memo, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const mouseIn = () => {
    var setDropdown = document.getElementById("dropdown-menu");
    setDropdown.className += " show";
};
const mouseOut = () => {
    var setDropdown = document.getElementById("dropdown-menu");
    setDropdown.className = "dropdown-menu";
};

const mouseIn_Sub = () => {
    var setDropdown = document.getElementById("dropdown-sub-menu");
    setDropdown.className += " show";
};
const mouseOut_Sub = () => {
    var setDropdown = document.getElementById("dropdown-sub-menu");
    setDropdown.className = "dropdown-menu dropdown-submenu";
};

const Header = () => {
    const location = useLocation();
    useEffect(() => {
        Array.from(document.getElementsByClassName("header-nav-link")).forEach((item) => {
            item.classList.remove("active");
            if (item.href.split("/")[3] == location.pathname.split("/")[1])
                item.classList.add("active");
        });
    }, [location.pathname]);

    const {
        authState: { user, isAuthenticated },
        logoutUser,
    } = useContext(AuthContext);

    return (
        <>
            <header>
                <div className="top-bar d-none d-md-block">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="top-bar-left">
                                    <div className="text">
                                        <i className="fa fa-phone-alt" />
                                        <p>(+84)335 183 057</p>
                                    </div>
                                    <div className="text">
                                        <i className="fa fa-envelope" />
                                        <p>duongquocan222@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="top-bar-right">
                                    <div className="social">
                                        {/* <a href="">
                                            <i className="fab fa-twitter" />
                                        </a> */}
                                        <a href="https://www.facebook.com/CrisAn.2001">
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                        {/* <a href="">
                                            <i className="fab fa-linkedin-in" />
                                        </a>
                                        <a href="">
                                            <i className="fab fa-instagram" />
                                        </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Top Bar End */}

                {/* Nav Bar Start */}
                <div className="navbar navbar-expand-lg bg-dark navbar-dark">
                    <div className="container-fluid">
                        <a href="/" className="navbar-brand">
                            Helpz
                        </a>
                        <button
                            type="button"
                            className="navbar-toggler"
                            data-toggle="collapse"
                            data-target="#navbarCollapse"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div
                            className="collapse navbar-collapse justify-content-between"
                            id="navbarCollapse"
                        >
                            <div
                                className="navbar-nav ml-auto"
                                id="setStyleNavbar"
                                style={{
                                    fontFamily: `Arial,Poppins-Regular, Times`,
                                }}
                            >
                                <a
                                    className="nav-link header-nav-link"
                                    href="/"
                                    style={{
                                        fontFamily: `Arial,Poppins-Regular, Times`,
                                    }}
                                >
                                    Trang Chủ
                                </a>
                                <Link
                                    to="/events"
                                    className="nav-link header-nav-link"
                                    style={{
                                        fontFamily: `Arial,Poppins-Regular, Times`,
                                    }}
                                >
                                    Sự Kiện
                                </Link>

                                <Link
                                    to="/contact"
                                    className="nav-link header-nav-link"
                                    style={{
                                        fontFamily: `Arial,Poppins-Regular, Times`,
                                    }}
                                >
                                    Liên Hệ
                                </Link>
                                <Link
                                    to="/about"
                                    className="nav-link header-nav-link"
                                    style={{
                                        fontFamily: `Arial,Poppins-Regular, Times`,
                                    }}
                                >
                                    Giời Thiệu
                                </Link>
                                <div className="nav-link">&emsp;</div>
                                {!isAuthenticated ? (
                                    <>
                                        <Link to="/login" className="nav-link">
                                            Login
                                        </Link>
                                        <Link to="/register" className="nav-link">
                                            Register
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <div className="nav-item dropdown">
                                            <div
                                                style={{ cursor: "pointer" }}
                                                className="nav-link dropdown-toggle"
                                                onMouseEnter={mouseIn}
                                                onMouseLeave={mouseOut}
                                            >
                                                {user?.data.fullName}
                                                <div
                                                    className="dropdown-menu"
                                                    id="dropdown-menu"
                                                    style={{ marginLeft: 15, top: 40 }}
                                                >
                                                    <Link
                                                        to={"/my-profile"}
                                                        style={{ fontSize: "unset" }}
                                                        className="dropdown-item"
                                                    >
                                                        Tài Khoản
                                                    </Link>
                                                    <Link
                                                        to={"/charity-call-request"}
                                                        style={{ fontSize: "unset" }}
                                                        className="dropdown-item"
                                                    >
                                                        Tạo Lời Kêu Gọi
                                                    </Link>
                                                    <div
                                                        className="dropdown-item"
                                                        style={{ fontSize: "unset" }}
                                                        onMouseEnter={mouseIn_Sub}
                                                        onMouseLeave={mouseOut_Sub}
                                                    >
                                                        <div className="nav-item dropdown">
                                                            <div
                                                                style={{
                                                                    fontSize: "unset",
                                                                    padding: 0,
                                                                }}
                                                                className="nav-link dropdown-toggle"
                                                            >
                                                                Lịch Sử Hoạt Động
                                                                <div
                                                                    id="dropdown-sub-menu"
                                                                    className="dropdown-menu dropdown-submenu"
                                                                    style={{
                                                                        top: "-5px",
                                                                        position: "absolute",
                                                                        left: "-184px",
                                                                        background:
                                                                            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
                                                                    }}
                                                                >
                                                                    <Link
                                                                        className="dropdown-item"
                                                                        style={{
                                                                            fontSize: "unset",
                                                                        }}
                                                                    >
                                                                        Quyên Góp
                                                                    </Link>
                                                                    <Link
                                                                        className="dropdown-item"
                                                                        style={{
                                                                            fontSize: "unset",
                                                                        }}
                                                                    >
                                                                        Kêu Gọi
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div
                                                        onClick={logoutUser}
                                                        style={{ cursor: "pointer" }}
                                                        className="dropdown-item"
                                                    >
                                                        Đăng xuất
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Nav Bar End */}
            </header>
        </>
    );
};

export default memo(Header);
