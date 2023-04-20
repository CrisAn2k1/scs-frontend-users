import { memo } from "react";
// import { useTranslation } from "react-i18next";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom";

const ListEvents = ({ events }) => {
    const carouselOptions = {
        loop: true,
        margin: 0,
        items: 1,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    };
    // const { t } = useTranslation(events$);
    console.log("tong so:");
    console.log(events?.data);
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
                                        <strong>Raised:</strong> $100000
                                    </p>
                                    <p>
                                        <strong>Goal:</strong> $50000
                                    </p>
                                </div>
                            </div>
                            <div className="causes-text">
                                <h3>Lorem ipsum dolor sit</h3>
                                <p>
                                    Lorem ipsum dolor sit amet elit. Phasell nec pretium mi. Curabit
                                    facilis ornare velit non vulputa
                                </p>
                            </div>
                            <div className="causes-btn">
                                <a className="btn btn-custom">Learn More</a>
                                <a className="btn btn-custom">Donate Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        // <section className="latest-product spad">
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-lg-4 col-md-6">
        //                 <div className="latest-product__text">
        //                     <h4>{t("home.latestProduct.latest")}</h4>
        //                     <div className="latest-product__slider">
        //                         {events.latestEvents.length > 0 &&
        //                             [0, 1, 2].map((number) => (
        //                                 <div className="latest-product__slider__item" key={number}>
        //                                     <OwlCarousel options={carouselOptions}>
        //                                         {events.latestEvents
        //                                             ?.slice(number, number + 2)
        //                                             ?.map((item) => (
        //                                                 <Link
        //                                                     to={`/events/${item.seoUrl}`}
        //                                                     key={item.id}
        //                                                     className="latest-product__item"
        //                                                 >
        //                                                     <div className="latest-product__item__pic">
        //                                                         {/* <img src={item?.images[0]?.imageUrl} alt="" /> */}
        //                                                         <LazyLoadImage
        //                                                             effect="blur"
        //                                                             src={item?.images[0]?.imageUrl}
        //                                                             alt="latest product"
        //                                                             placeholderSrc="img/logo.png"
        //                                                         />
        //                                                     </div>
        //                                                     <div className="latest-product__item__text">
        //                                                         <h6>{item.name}</h6>
        //                                                         <span>
        //                                                             {item?.quantity > 0
        //                                                                 ? `${String(
        //                                                                       item?.price,
        //                                                                   ).replace(
        //                                                                       /(.)(?=(\d{3})+$)/g,
        //                                                                       "$1,",
        //                                                                   )} ₫`
        //                                                                 : "Hết hàng"}
        //                                                         </span>
        //                                                     </div>
        //                                                 </Link>
        //                                             ))}
        //                                     </OwlCarousel>
        //                                 </div>
        //                             ))}
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="col-lg-4 col-md-6">
        //                 <div className="latest-product__text">
        //                     <h4>{"home.latestProduct.topReviews"}</h4>
        //                     <div className="latest-product__slider">
        //                         {events.topRatingProducts.length > 0 &&
        //                             [0, 1, 2].map((number) => (
        //                                 <div className="latest-product__slider__item" key={number}>
        //                                     <OwlCarousel options={carouselOptions}>
        //                                         {events.topRatingProducts
        //                                             ?.slice(number, number + 2)
        //                                             ?.map((item) => (
        //                                                 <Link
        //                                                     to={`/events/${item.seoUrl}`}
        //                                                     key={item.id}
        //                                                     className="latest-product__item"
        //                                                 >
        //                                                     <div className="latest-product__item__pic">
        //                                                         {/* <img src={item?.images[0]?.imageUrl} alt="" /> */}
        //                                                         <LazyLoadImage
        //                                                             effect="blur"
        //                                                             src={item?.images[0]?.imageUrl}
        //                                                             alt="latest product"
        //                                                             placeholderSrc="img/logo.png"
        //                                                         />
        //                                                     </div>
        //                                                     <div className="latest-product__item__text">
        //                                                         <h6>{item.name}</h6>
        //                                                         <span>
        //                                                             {item?.quantity > 0
        //                                                                 ? `${String(
        //                                                                       item?.price,
        //                                                                   ).replace(
        //                                                                       /(.)(?=(\d{3})+$)/g,
        //                                                                       "$1,",
        //                                                                   )} ₫`
        //                                                                 : "Hết hàng"}
        //                                                         </span>
        //                                                     </div>
        //                                                 </Link>
        //                                             ))}
        //                                     </OwlCarousel>
        //                                 </div>
        //                             ))}
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="col-lg-4 col-md-6">
        //                 <div className="latest-product__text">
        //                     <h4>{"home.latestProduct.topDiscount"}</h4>
        //                     <div className="latest-product__slider">
        //                         {events.topDiscountProducts.length > 0 &&
        //                             [0, 1, 2].map((number) => (
        //                                 <div className="latest-product__slider__item" key={number}>
        //                                     <OwlCarousel options={carouselOptions}>
        //                                         {events.topDiscountProducts
        //                                             ?.slice(number, number + 2)
        //                                             ?.map((item) => (
        //                                                 <Link
        //                                                     to={`/events/${item.seoUrl}`}
        //                                                     key={item.id}
        //                                                     className="latest-product__item"
        //                                                 >
        //                                                     <div className="latest-product__item__pic">
        //                                                         {/* <img src={item?.images[0]?.imageUrl} alt="" /> */}
        //                                                         <LazyLoadImage
        //                                                             effect="blur"
        //                                                             src={item?.images[0]?.imageUrl}
        //                                                             alt="latest product"
        //                                                             placeholderSrc="img/logo.png"
        //                                                         />
        //                                                     </div>
        //                                                     <div className="latest-product__item__text">
        //                                                         <h6>{item.name}</h6>
        //                                                         <span>
        //                                                             {item?.quantity > 0
        //                                                                 ? `${String(
        //                                                                       item?.price,
        //                                                                   ).replace(
        //                                                                       /(.)(?=(\d{3})+$)/g,
        //                                                                       "$1,",
        //                                                                   )} ₫`
        //                                                                 : "Hết hàng"}
        //                                                         </span>
        //                                                     </div>
        //                                                 </Link>
        //                                             ))}
        //                                     </OwlCarousel>
        //                                 </div>
        //                             ))}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
};

export default ListEvents;
