import { memo, useCallback } from "react";
// import { useTranslation } from "react-i18next";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom";

const ListPosts = ({ posts }) => {
    // const carouselOptions = {
    //     loop: true,
    //     margin: 0,
    //     items: 1,
    //     smartSpeed: 1200,
    //     autoHeight: false,
    //     autoplay: true,
    // };

    return (
        <>
            <div className="causes">
                <div className="container">
                    <div className="section-header text-center">
                        <p>Popular Causes</p>
                        <h2>Let's know about charity causes around the world</h2>
                    </div>
                    <div className="owl-carousel causes-carousel">
                        <div className="causes-item">
                            <div className="causes-img">
                                <img src="img/causes-1.jpg" alt="Image" />
                            </div>
                            <div className="causes-progress">
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow={85}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <span>85%</span>
                                    </div>
                                </div>
                                <div className="progress-text">
                                    <p>
                                        <strong>Raised:</strong>{" "}
                                        {posts.data.items?.[0]?.event?.amount ?? 20000}${" "}
                                    </p>
                                    <p>
                                        <strong>Goal: </strong>
                                        {posts.data.items?.[0]?.event?.amountLimit ?? 50000}$
                                    </p>
                                </div>
                            </div>
                            <div className="causes-text">
                                <h3>{posts.data.items?.[0]?.title}</h3>
                                <p>{posts.data.items?.[0]?.description}</p>
                            </div>
                            <div className="causes-btn">
                                <a className="btn btn-custom">Learn More</a>
                                <a className="btn btn-custom">Donate Now</a>
                            </div>
                        </div>

                        <div className="causes-item">
                            <div className="causes-img">
                                <img src="img/causes-1.jpg" alt="Image" />
                            </div>
                            <div className="causes-progress">
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow={85}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <span>85%</span>
                                    </div>
                                </div>
                                <div className="progress-text">
                                    <p>
                                        <strong>Raised:</strong>{" "}
                                        {posts.data.items?.[0]?.event?.amount ?? 20000}${" "}
                                    </p>
                                    <p>
                                        <strong>Goal: </strong>
                                        {posts.data.items?.[0]?.event?.amountLimit ?? 50000}$
                                    </p>
                                </div>
                            </div>
                            <div className="causes-text">
                                <h3>{posts.data.items?.[0]?.title}</h3>
                                <p>{posts.data.items?.[0]?.description}</p>
                            </div>
                            <div className="causes-btn">
                                <a className="btn btn-custom">Learn More</a>
                                <a className="btn btn-custom">Donate Now</a>
                            </div>
                        </div>

                        <div className="causes-item">
                            <div className="causes-img">
                                <img src="img/causes-1.jpg" alt="Image" />
                            </div>
                            <div className="causes-progress">
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow={85}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <span>85%</span>
                                    </div>
                                </div>
                                <div className="progress-text">
                                    <p>
                                        <strong>Raised:</strong>{" "}
                                        {posts.data.items?.[0]?.event?.amount ?? 20000}${" "}
                                    </p>
                                    <p>
                                        <strong>Goal: </strong>
                                        {posts.data.items?.[0]?.event?.amountLimit ?? 50000}$
                                    </p>
                                </div>
                            </div>
                            <div className="causes-text">
                                <h3>{posts.data.items?.[0]?.title}</h3>
                                <p>{posts.data.items?.[0]?.description}</p>
                            </div>
                            <div className="causes-btn">
                                {console.log(posts.data.items?.[0]?.id)}
                                <Link
                                    className="btn btn-custom"
                                    to={`/posts/${posts.data.items?.[0]?.id}`}
                                >
                                    Xem them{" "}
                                </Link>
                                {/* <a className="btn btn-custom">Learn More</a> */}
                                <a className="btn btn-custom">Donate Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListPosts;
