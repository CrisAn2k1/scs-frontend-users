import React from "react";

import EventDetail from "../events/EventDetail";
import { Link } from "react-router-dom";

const Event = () => {
    return (
        <>
            {/* Page Header Start */}
            <div className="page-header" style={{ padding: "150px 0px 20px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>HELPZ</h2>
                        </div>
                        <div className="col-12">
                            <a>Give Is Receive</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Header End */}
            {/* Event Start */}
            <div className="event">
                <div className="container">
                    <div className="section-header text-center">
                        <p>Upcoming Events</p>
                        <h2>Be ready for our upcoming charity events</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="event-item">
                                <img src="img/event-1.jpg" alt="Image" />
                                <div className="event-content">
                                    <div className="event-meta">
                                        <p>
                                            <i className="fa fa-calendar-alt" />
                                            01-Jan-45
                                        </p>
                                        <p>
                                            <i className="far fa-clock" />
                                            8:00 - 10:00
                                        </p>
                                        <p>
                                            <i className="fa fa-map-marker-alt" />
                                            New York
                                        </p>
                                    </div>
                                    <div className="event-text">
                                        <h3>Lorem ipsum dolor sit</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet elit. Neca pretim miura bitur
                                            facili ornare velit non vulpte liqum metus tortor
                                        </p>
                                        <a className="btn btn-custom" href="">
                                            Join Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="event-item">
                                <img src="img/event-2.jpg" alt="Image" />
                                <div className="event-content">
                                    <div className="event-meta">
                                        <p>
                                            <i className="fa fa-calendar-alt" />
                                            01-Jan-45
                                        </p>
                                        <p>
                                            <i className="far fa-clock" />
                                            8:00 - 10:00
                                        </p>
                                        <p>
                                            <i className="fa fa-map-marker-alt" />
                                            New York
                                        </p>
                                    </div>
                                    <div className="event-text">
                                        <h3>Lorem ipsum dolor sit</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet elit. Neca pretim miura bitur
                                            facili ornare velit non vulpte liqum metus tortor
                                        </p>
                                        <a className="btn btn-custom" href="">
                                            <Link to={"/event:id"} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="event-item">
                                <img src="img/event-1.jpg" alt="Image" />
                                <div className="event-content">
                                    <div className="event-meta">
                                        <p>
                                            <i className="fa fa-calendar-alt" />
                                            01-Jan-45
                                        </p>
                                        <p>
                                            <i className="far fa-clock" />
                                            8:00 - 10:00
                                        </p>
                                        <p>
                                            <i className="fa fa-map-marker-alt" />
                                            New York
                                        </p>
                                    </div>
                                    <div className="event-text">
                                        <h3>Lorem ipsum dolor sit</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet elit. Neca pretim miura bitur
                                            facili ornare velit non vulpte liqum metus tortor
                                        </p>
                                        <a className="btn btn-custom" href="">
                                            Join Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="event-item">
                                <img src="img/event-2.jpg" alt="Image" />
                                <div className="event-content">
                                    <div className="event-meta">
                                        <p>
                                            <i className="fa fa-calendar-alt" />
                                            01-Jan-45
                                        </p>
                                        <p>
                                            <i className="far fa-clock" />
                                            8:00 - 10:00
                                        </p>
                                        <p>
                                            <i className="fa fa-map-marker-alt" />
                                            New York
                                        </p>
                                    </div>
                                    <div className="event-text">
                                        <h3>Lorem ipsum dolor sit</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet elit. Neca pretim miura bitur
                                            facili ornare velit non vulpte liqum metus tortor
                                        </p>
                                        <a className="btn btn-custom" href="">
                                            Join Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Event End */}
        </>
    );
};

export default Event;
