import React, { Suspense, useEffect } from "react";
import Loading from "../layouts/Loading";
import ListEvents from "../events/ListEvents";
import { useDispatch, useSelector } from "react-redux";
import { events$ } from "../../redux/selectors";
import { getEvents } from "../../redux/actions/events";
import { Link } from "react-router-dom";

const Home = () => {
    const events = useSelector(events$);
    const dispatch = useDispatch();

    useEffect(() => {
        if (events.data.length === 0) {
            dispatch(getEvents.getEventsRequest());
        }
    }, []);

    return (
        <>
            {/* Carousel Start */}
            <div className="carousel">
                <div className="container-fluid" style={{ maxWidth: "unset" }}>
                    <div className="owl-carousel">
                        <div className="carousel-item">
                            <div className="carousel-img" style={{ maxHeight: 738 }}>
                                <img
                                    src="img/main3.jpg"
                                    alt="Image"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className="carousel-text">
                                <h2>Đội Ngũ Hùng Hậu</h2>
                                <p>
                                    Với đội ngũ hùng hậu luôn luôn hoạt động để kiểm duyệt mọi lời
                                    kêu gọi
                                </p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-img" style={{ maxHeight: 738 }}>
                                <img
                                    src="img/main2.jpg"
                                    alt="Image"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className="carousel-text">
                                <h2>Chung Tay Quyên Góp</h2>
                                <p>
                                    Mỗi một quyên góp của bạn là mỗi một hành động ý nghĩa. Và cũng
                                    là một ngày ấm no cho những hoàn cảnh khó khăn ngoài kia
                                </p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-img" style={{ maxHeight: 738 }}>
                                <img
                                    src="img/main1.jpg"
                                    alt="Image"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className="carousel-text">
                                <h2>Một Nụ Cười Bằng Mười Than Thuốc Bổ</h2>
                                <p>
                                    Hãy cùng chúng tôi mang đến những nụ cười thật ý nghĩa đến với
                                    những người trong hoàn cảnh khó khăn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Carousel End */}

            {/* Video Modal Start*/}
            <div
                className="modal fade"
                id="videoModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                            {/* 16:9 aspect ratio */}
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                    className="embed-responsive-item"
                                    src=""
                                    id="video"
                                    allowscriptaccess="always"
                                    allow="autoplay"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Video Modal End */}

            {/* Service Start */}
            <div className="service">
                <div className="container">
                    <div className="section-header text-center">
                        <p>Chúng tôi làm những gì?</p>
                        <h2 style={{ fontSize: 25 }}>
                            Chúng tôi tin rằng chúng tôi và bạn có thể cùng chung tay giúp đỡ những
                            hòa cảnh khó khăn ngoài kia
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-8">
                            <div className="service-item" style={{ justifyContent: "left" }}>
                                <div className="service-icon">
                                    <i className="flaticon-diet" />
                                </div>
                                <div className="service-text">
                                    <h3>Thức ăn</h3>
                                    <p>
                                        Thức ăn là nhu cầu thiết yếu của con người. Cung cấp nguyên
                                        liệu nấu ăn đó là mục tiêu của chúng tôi.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-8">
                            <div className="service-item" style={{ justifyContent: "left" }}>
                                <div className="service-icon">
                                    <i className="flaticon-water" />
                                </div>
                                <div className="service-text">
                                    <h3>Nước uống</h3>
                                    <p>
                                        Nếu không uống nước trong vòng 3 ngày bạn sẽ chết. Nhưng
                                        chúng tôi sẽ không để bạn vì khát mà phải uống nước "bẩn".
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-8">
                            <div className="service-item" style={{ justifyContent: "left" }}>
                                <div className="service-icon">
                                    <i className="flaticon-healthcare" />
                                </div>
                                <div className="service-text">
                                    <h3>Sức khỏe</h3>
                                    <p>
                                        Sức khỏe rất quan trọng "Có Sức Khỏe, Có Tất Cả". Chúng tôi
                                        sẽ giúp bạn thực hiện kêu gọi sự trợ giúp của mọi người.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-8">
                            <div className="service-item" style={{ justifyContent: "left" }}>
                                <div className="service-icon">
                                    <i className="flaticon-education" />
                                </div>
                                <div className="service-text">
                                    <h3>Giáo dục</h3>
                                    <p>
                                        Ai cũng có quyền được ước mơ, học hỏi, phát triển,... Chúng
                                        tôi sẽ không để bạn cảm thấy bản thân mình kém may mắn.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Service End */}

            {/* Causes Start */}
            <Suspense fallback={<Loading />}>
                <ListEvents events={events?.data} />
                {/* <ListPosts posts={posts} /> */}
            </Suspense>
            {/* Causes End */}

            {/* Donate Start */}
            <div className="donate" data-parallax="scroll" data-image-src="img/donate.jpg">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <div className="donate-content">
                                <div className="section-header">
                                    <p>Quyên Góp Ngay</p>
                                    <h2 style={{ fontSize: 35, textAlign: "justify" }}>
                                        Hãy quyên góp cho chúng tôi nếu bạn có nguyên liệu dư thừa!
                                    </h2>
                                </div>
                                <div className="donate-text">
                                    <p>
                                        Mỗi một phần đóng góp là mỗi một hành động bảo vệ môi
                                        trường, đồng thời cũng giúp cho những hoàn cảnh khó khăn có
                                        những bữa ăn ngon. Nâng cao giá trị nhân văn và gắn kết tình
                                        cảm giữa con người với con người.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="donate-form">
                                <Link
                                    to={`/material-donation-request`}
                                    className="btn btn-custom"
                                    type="submit"
                                >
                                    Quyên Góp
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonial Start */}
            {/* <div className="testimonial">
                <div className="container">
                    <div className="section-header text-center">
                        <p>Testimonial</p>
                        <h2>What people are talking about our charity activities</h2>
                    </div>
                    <div className="owl-carousel testimonials-carousel">
                        <div className="testimonial-item">
                            <div className="testimonial-profile">
                                <img src="img/testimonial-1.jpg" alt="Image" />
                                <div className="testimonial-name">
                                    <h3>Person Name</h3>
                                    <p>Profession</p>
                                </div>
                            </div>
                            <div className="testimonial-text">
                                <p>
                                    Lorem ipsum dolor sit amet elit. Phasel preti mi facilis ornare
                                    velit non vulputa. Aliqu metus tortor, auctor id gravid vivera
                                    quis
                                </p>
                            </div>
                        </div>
                        <div className="testimonial-item">
                            <div className="testimonial-profile">
                                <img src="img/testimonial-2.jpg" alt="Image" />
                                <div className="testimonial-name">
                                    <h3>Person Name</h3>
                                    <p>Profession</p>
                                </div>
                            </div>
                            <div className="testimonial-text">
                                <p>
                                    Lorem ipsum dolor sit amet elit. Phasel preti mi facilis ornare
                                    velit non vulputa. Aliqu metus tortor, auctor id gravid vivera
                                    quis
                                </p>
                            </div>
                        </div>
                        <div className="testimonial-item">
                            <div className="testimonial-profile">
                                <img src="img/testimonial-3.jpg" alt="Image" />
                                <div className="testimonial-name">
                                    <h3>Person Name</h3>
                                    <p>Profession</p>
                                </div>
                            </div>
                            <div className="testimonial-text">
                                <p>
                                    Lorem ipsum dolor sit amet elit. Phasel preti mi facilis ornare
                                    velit non vulputa. Aliqu metus tortor, auctor id gravid vivera
                                    quis
                                </p>
                            </div>
                        </div>
                        <div className="testimonial-item">
                            <div className="testimonial-profile">
                                <img src="img/testimonial-4.jpg" alt="Image" />
                                <div className="testimonial-name">
                                    <h3>Person Name</h3>
                                    <p>Profession</p>
                                </div>
                            </div>
                            <div className="testimonial-text">
                                <p>
                                    Lorem ipsum dolor sit amet elit. Phasel preti mi facilis ornare
                                    velit non vulputa. Aliqu metus tortor, auctor id gravid vivera
                                    quis
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* Testimonial End */}
        </>
    );
};

export default Home;
