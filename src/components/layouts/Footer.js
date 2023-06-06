import React, { memo } from "react";

const Footer = () => {
    return (
        <>
            <footer>
                {/* <!-- Footer Start --> */}
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-contact">
                                    <h2>Về Chúng Tôi</h2>
                                    <p>
                                        <i className="fa fa-map-marker-alt"></i>Hutech Quận 9,
                                        Tp.HCM
                                    </p>
                                    <p>
                                        <i className="fa fa-phone-alt"></i>0335 183 057
                                    </p>
                                    <p>
                                        <i className="fa fa-envelope"></i>scs-helpz@support.com
                                    </p>
                                    <div className="footer-social">
                                        <a className="btn btn-custom" href="">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="btn btn-custom" href="">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="btn btn-custom" href="">
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                        <a className="btn btn-custom" href="">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                        <a className="btn btn-custom" href="">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-link">
                                    <h2>Popular Links</h2>
                                    <a href="">About Us</a>
                                    <a href="">Contact Us</a>
                                    <a href="">Popular Causes</a>
                                    <a href="">Upcoming Events</a>
                                    <a href="">Latest Blog</a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-link">
                                    <h2>Useful Links</h2>
                                    <a href="">Terms of use</a>
                                    <a href="">Privacy policy</a>
                                    <a href="">Cookies</a>
                                    <a href="">Help</a>
                                    <a href="">FQAs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container copyright">
                        <p style={{ textAlign: "center" }}>
                            &copy; <a href="#">HELPZ</a>, All Right Reserved.
                        </p>
                    </div>
                </div>
                {/* <!-- Footer End --> */}

                {/* <!-- Back to top button --> */}
                <a href="#" className="back-to-top">
                    <i className="fa fa-chevron-up"></i>
                </a>
            </footer>
            {/* <!-- Footer Section End --> */}
        </>
    );
};

export default memo(Footer);
