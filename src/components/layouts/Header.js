import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
                                        <p>+123 456 7890</p>
                                    </div>
                                    <div className="text">
                                        <i className="fa fa-envelope" />
                                        <p>info@example.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="top-bar-right">
                                    <div className="social">
                                        <a href="">
                                            <i className="fab fa-twitter" />
                                        </a>
                                        <a href="">
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                        <a href="">
                                            <i className="fab fa-linkedin-in" />
                                        </a>
                                        <a href="">
                                            <i className="fab fa-instagram" />
                                        </a>
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
                        <a href="index.html" className="navbar-brand">
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
                            <div className="navbar-nav ml-auto">
                                <a href="/" className="nav-link">
                                    Home
                                </a>
                                <Link to="/event" className="nav-link">
                                    Events
                                </Link>
                                {/* <div className="nav-item dropdown">
                                    <a
                                        href="#"
                                        className="nav-link dropdown-toggle"
                                        data-toggle="dropdown"
                                    >
                                        Pages
                                    </a>
                                    <div className="dropdown-menu">
                                        <a href="single.html" className="dropdown-item">
                                            Detail Page
                                        </a>
                                        <a href="service.html" className="dropdown-item">
                                            What We Do
                                        </a>
                                        <a href="team.html" className="dropdown-item">
                                            Meet The Team
                                        </a>
                                        <a href="donate.html" className="dropdown-item">
                                            Donate Now
                                        </a>
                                        <a href="volunteer.html" className="dropdown-item">
                                            Become A Volunteer
                                        </a>
                                    </div>
                                </div> */}
                                <Link to="/contact" className="nav-link">
                                    Contact
                                </Link>
                                <Link to="/about" className="nav-link">
                                    About Us
                                </Link>
                                <div className="nav-link">&emsp;</div>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                                <Link to="/register" className="nav-link">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Nav Bar End */}
                {/* Page Header Start */}
                <div className="page-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2>About Us</h2>
                            </div>
                            <div className="col-12">
                                <a href="">Home</a>
                                <a href="">About Us</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Page Header End */}
            </header>
        </>
    );
};

export default Header;
