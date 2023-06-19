import React, { memo } from "react";
import { Link } from "react-router-dom";

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
                                        <a
                                            href="https://goo.gl/maps/CLRGX9Zu9AYiugxe9"
                                            target="_blank"
                                        >
                                            <i className="fa fa-map-marker-alt"></i>Hutech Quận 9,
                                            Tp.HCM
                                        </a>
                                    </p>
                                    <p>
                                        <a href="tel:0335183057">
                                            <i className="fa fa-phone-alt"></i>0335 183 057
                                        </a>
                                    </p>
                                    <p>
                                        <a href="mailto:duongquocan222@gmail.com" target="_blank">
                                            <i className="fa fa-envelope"></i>scs-helpz@support.com
                                        </a>
                                    </p>

                                    <div className="footer-social">
                                        <a
                                            className="btn btn-custom"
                                            href="https://www.facebook.com/CrisAn.2001"
                                            target="_blank"
                                        >
                                            <i class="fab fa-facebook-f"></i>
                                        </a>

                                        <a className="btn btn-custom" href="">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-link">
                                    <Link to={`/events`}>
                                        <h2>Sự kiện kêu gọi</h2>
                                    </Link>
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
