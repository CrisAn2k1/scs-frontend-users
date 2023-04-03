import React from "react";

const Contact = () => {
    return (
        <>
            {/* Contact Start */}
            <div className="contact">
                <div className="container">
                    <div className="section-header text-center">
                        <p>Get In Touch</p>
                        <h2>Contact for any query</h2>
                    </div>
                    <div className="contact-img">
                        <img src="img/contact.jpg" alt="Image" />
                    </div>
                    <div className="contact-form">
                        <div id="success" />
                        <form name="sentMessage" id="contactForm" noValidate="novalidate">
                            <div className="control-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Your Name"
                                    required="required"
                                    data-validation-required-message="Please enter your name"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div className="control-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Your Email"
                                    required="required"
                                    data-validation-required-message="Please enter your email"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div className="control-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="subject"
                                    placeholder="Subject"
                                    required="required"
                                    data-validation-required-message="Please enter a subject"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div className="control-group">
                                <textarea
                                    className="form-control"
                                    id="message"
                                    placeholder="Message"
                                    required="required"
                                    data-validation-required-message="Please enter your message"
                                    defaultValue={""}
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div>
                                <button
                                    className="btn btn-custom"
                                    type="submit"
                                    id="sendMessageButton"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Contact End */}
        </>
    );
};

export default Contact;
