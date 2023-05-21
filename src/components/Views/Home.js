import React, { Suspense, useEffect } from "react";
import Loading from "../layouts/Loading";
import ListEvents from "../events/ListEvents";
import { useDispatch, useSelector } from "react-redux";
import { events$ } from "../../redux/selectors";
import { getEvents } from "../../redux/actions/events";

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
                            <div className="carousel-img">
                                <img src="img/carousel-1.jpg" alt="Image" />
                            </div>
                            <div className="carousel-text">
                                <h1>Let's be kind for children</h1>
                                <p>
                                    Lorem ipsum dolor sit amet elit. Phasellus ut mollis mauris.
                                    Vivamus egestas eleifend dui ac consequat at lectus in malesuada
                                </p>
                                <div className="carousel-btn">
                                    <a className="btn btn-custom" href="">
                                        Donate Now
                                    </a>
                                    <a
                                        className="btn btn-custom btn-play"
                                        data-toggle="modal"
                                        data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                                        data-target="#videoModal"
                                    >
                                        Watch Video
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-img">
                                <img src="img/carousel-2.jpg" alt="Image" />
                            </div>
                            <div className="carousel-text">
                                <h1>Get Involved with helping hand</h1>
                                <p>
                                    Morbi sagittis turpis id suscipit feugiat. Suspendisse eu augue
                                    urna. Morbi sagittis, orci sodales varius fermentum, tortor
                                </p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-img">
                                <img src="img/carousel-3.jpg" alt="Image" />
                            </div>
                            <div className="carousel-text">
                                <h1>Bringing smiles to millions</h1>
                                <p>
                                    Sed ultrices, est eget feugiat accumsan, dui nibh egestas
                                    tortor, ut rhoncus nibh ligula euismod quam. Proin pellentesque
                                    odio
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
                                <button className="btn btn-custom" type="submit">
                                    Quyên Góp
                                </button>
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
