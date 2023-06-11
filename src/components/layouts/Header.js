import React, { memo, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import Notification from "./Notification";

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
    const navigate = useNavigate();

    useEffect(() => {
        Array.from(document.getElementsByClassName("nav-link header-nav-link")).forEach((item) => {
            item.classList.remove("active");
            if (item.href.split("/")[3] === location.pathname.split("/")[1])
                item.classList.add("active");
        });
    }, [location.pathname]);

    const {
        authState: { user, isAuthenticated, isCallingCharity, isLoveKitchen },
        logoutUser,
    } = useContext(AuthContext);

    const checkIsCallingChariry = () => {
        if (isCallingCharity) {
            Swal.fire({
                position: "top-center",
                icon: "warning",
                title: "Thông Báo!\n\nBạn đã gửi lời kêu gọi trước đó",
                html: `<div>
                            Chúng tôi sẽ xử lý và liên hệ với bạn trong thời gian sớm nhất.
                            <br />
                            <hr />
                            Hoặc bạn có thể liên hệ qua:
                            <div
                                style="display: flex;
                                    justify-content: center;
                                    padding: 5px 100px;
                                    flex-direction: column;
                                    align-items: flex-start;"
                            >
                                <p>
                                    <i class="bi bi-dot"></i> <i class="bi bi-facebook"></i> Facebook:
                                    <a
                                        style="color: blue; font-style: italic;font-weight: bold;"
                                        href="https://www.facebook.com/CrisAn.2001"
                                    >
                                        SCS - HELPZ
                                    </a>
                                </p>
                                <p>
                                    <i class="bi bi-dot"></i> <i class="bi bi-telephone-inbound-fill"></i> Phone:
                                    <a
                                        href="tel:0335183057"
                                        style="color: blue; font-style: italic;font-weight: bold;"
                                    >
                                        0335.183.057
                                    </a>
                                </p>
                            </div>
                        </div>`,
                showConfirmButton: true,
                timer: 10000,
            });
        } else {
            navigate("/charity-call-request");
        }
    };

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
                            style={{ marginRight: 100 }}
                        >
                            <div
                                className="navbar-nav ml-auto"
                                id="setStyleNavbar"
                                style={{
                                    fontFamily: `Muli, sans-serif, "Comic Sans MS", Poppins-Regular, Arial, Times`,
                                }}
                            >
                                <a className="nav-link header-nav-link style-nav-link" href="/">
                                    Trang Chủ
                                </a>
                                <Link
                                    to="/events"
                                    className="nav-link header-nav-link style-nav-link"
                                >
                                    Sự Kiện
                                </Link>

                                <Link
                                    to="/about"
                                    className="nav-link header-nav-link style-nav-link"
                                >
                                    Giới Thiệu
                                </Link>
                                <div className="nav-link">&emsp;</div>
                                {!isAuthenticated ? (
                                    <>
                                        <Link to="/login" className="nav-link style-nav-link">
                                            Đăng Nhập
                                        </Link>
                                        <Link to="/register" className="nav-link style-nav-link">
                                            Đăng Ký
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        {isLoveKitchen && <Notification />}

                                        <div className="nav-item dropdown">
                                            <div
                                                style={{ cursor: "pointer" }}
                                                className="nav-link style-nav-link dropdown-toggle"
                                                onMouseEnter={mouseIn}
                                                onMouseLeave={mouseOut}
                                            >
                                                {user?.data.fullName}
                                                <div
                                                    className="dropdown-menu"
                                                    id="dropdown-menu"
                                                    style={{ top: 40 }}
                                                >
                                                    <Link
                                                        to={"/my-profile"}
                                                        style={{ fontSize: "unset" }}
                                                        className="dropdown-item"
                                                    >
                                                        Tài Khoản
                                                    </Link>
                                                    <div
                                                        style={{ fontSize: "unset" }}
                                                        className="dropdown-item"
                                                        onClick={checkIsCallingChariry}
                                                    >
                                                        Kêu Gọi Từ Thiện
                                                    </div>
                                                    {isLoveKitchen && (
                                                        <Link
                                                            to={"/receive-material-request"}
                                                            style={{ fontSize: "unset" }}
                                                            className="dropdown-item"
                                                        >
                                                            Yêu Cầu Nhận Nguyên Liệu
                                                        </Link>
                                                    )}
                                                    <Link
                                                        to={"/material-donation-request"}
                                                        style={{ fontSize: "unset" }}
                                                        className="dropdown-item"
                                                    >
                                                        Quyên Góp Nguyên Liệu
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
                                                                        to={`/donations-history`}
                                                                        className="dropdown-item"
                                                                        style={{
                                                                            fontSize: "unset",
                                                                        }}
                                                                    >
                                                                        Quyên Góp
                                                                    </Link>
                                                                    <Link
                                                                        to={`/charity-call-history`}
                                                                        className="dropdown-item"
                                                                        style={{
                                                                            fontSize: "unset",
                                                                        }}
                                                                    >
                                                                        Kêu Gọi
                                                                    </Link>
                                                                    <Link
                                                                        to={`/schedule-history`}
                                                                        className="dropdown-item"
                                                                        style={{
                                                                            fontSize: "unset",
                                                                        }}
                                                                    >
                                                                        Lịch Trình
                                                                    </Link>
                                                                    {isLoveKitchen && (
                                                                        <Link
                                                                            to={`/confirmations-history`}
                                                                            className="dropdown-item"
                                                                            style={{
                                                                                fontSize: "unset",
                                                                            }}
                                                                        >
                                                                            Nhận nguyên liệu
                                                                        </Link>
                                                                    )}
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
