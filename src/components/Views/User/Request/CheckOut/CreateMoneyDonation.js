import React, { useCallback, useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../../../../api";
import Loading from "../../../../layouts/Loading";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { events$ } from "../../../../../redux/selectors";
import { getEventDetail } from "../../../../../redux/actions/events";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_oKhSR5nslBRnBZpjO6KuzZeX");

const CreateMoneyDonation = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const events = useSelector(events$);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getEventDetail.getEventDetailRequest(id));
    }, [id]);

    useEffect(() => {
        events?.singleEventDetail ? setIsLoading(false) : setIsLoading(true);
        console.log(events);
    }, [events]);

    const [moneyDonationForm, setMoneyDonationForm] = useState({
        amount: 1000,
        description: "",
        eventId: id,
    });

    const { amount, description } = moneyDonationForm;

    const onChangeData = useCallback(
        (event) => {
            if (event.target.name == "amount") {
                event.target.value = event.target.value.replace(/\D/g, "");
            }
            setMoneyDonationForm({ ...moneyDonationForm, [event.target.name]: event.target.value });
        },
        [moneyDonationForm],
    );
    moneyDonationForm.amount = +moneyDonationForm.amount;
    const {
        authState: { user, isAuthenticated, authLoading },
        loadUser,
    } = useContext(AuthContext);

    if (!authLoading && !isAuthenticated) {
        navigate(`/login`);
    }

    const clearData = useCallback(() => {
        setMoneyDonationForm({
            amount: "",
            description: "",
            eventId: id,
        });
    }, [user?.id]);

    useEffect(
        () => async () => {
            await loadUser();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [authLoading],
    );

    useEffect(() => {
        clearData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadUser]);

    const options = {
        mode: "payment",
        amount: moneyDonationForm.amount || 1000,
        currency: "usd",
        paymentMethodCreation: "manual",
        description: moneyDonationForm.description || "Buy Product",
        // Fully customizable with appearance API.
        appearance: {
            /*...*/
        },
    };
    console.log(options);

    return (
        <>
            <Loading hidden={!isLoading} />
            {events?.singleEventDetail && (
                <div
                    style={{
                        background:
                            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../img/page-header.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        paddingBottom: "40px",
                    }}
                    className="profile donation"
                >
                    <div
                        className="page-header"
                        style={{ padding: "65px", background: "unset" }}
                    ></div>
                    <div
                        className="container rounded bg-white mt-5 mb-5"
                        style={{
                            fontFamily: `"Comic Sans MS", "Poppins-Regular", "Arial", "Times"`,
                        }}
                    >
                        <div className="row">
                            <div
                                className="col-md-7 border-right"
                                style={{
                                    display: "flex",
                                    alignItems: "top",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    className="d-flex flex-column align-items-center text-center p-3 py-4"
                                    style={{ width: "100%" }}
                                >
                                    <h4>Thông Tin Chung</h4>
                                    <div style={{ width: "100%", padding: "0 5%" }}>
                                        <div style={{ marginTop: 15 }}>
                                            {/* start info event */}
                                            <div className="info-event" style={{ fontSize: 17 }}>
                                                <table style={{ width: "100%" }}>
                                                    <tr>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h6>Sự kiện:</h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {events?.singleEventDetail?.title}
                                                            </h6>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h6>Người kêu gọi:</h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {
                                                                    events?.singleEventDetail
                                                                        ?.charityCall?.user
                                                                        ?.fullName
                                                                }
                                                            </h6>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h6>SĐT:</h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {
                                                                    events?.singleEventDetail
                                                                        ?.charityCall?.user?.phone
                                                                }
                                                            </h6>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h6>Địa chỉ:</h6>
                                                        </td>
                                                        <td>
                                                            <h6>
                                                                {
                                                                    events?.singleEventDetail
                                                                        ?.charityCall?.user?.address
                                                                }
                                                            </h6>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h6>Thời gian kêu gọi:</h6>
                                                        </td>
                                                        <td>
                                                            <h6 style={{ color: "unset" }}>
                                                                {Intl.DateTimeFormat("en-US", {
                                                                    year: "numeric",
                                                                    month: "2-digit",
                                                                    day: "2-digit",
                                                                })
                                                                    .format(
                                                                        new Date(
                                                                            events?.singleEventDetail?.createdAt,
                                                                        ),
                                                                    )
                                                                    .replace(",", "")}
                                                                {" ~ "}
                                                                {Intl.DateTimeFormat("en-US", {
                                                                    year: "numeric",
                                                                    month: "2-digit",
                                                                    day: "2-digit",
                                                                })
                                                                    .format(
                                                                        new Date(
                                                                            events?.singleEventDetail?.expiredAt,
                                                                        ),
                                                                    )
                                                                    .replace(",", "")}
                                                            </h6>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            {/* end info event */}

                                            <hr />

                                            <div
                                                style={{
                                                    marginTop: 15,
                                                    textAlign: "left",
                                                }}
                                            >
                                                <div className="form-money-donation">
                                                    <label className="labels">Số tiền ủng hộ</label>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "left",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="amount"
                                                            value={amount}
                                                            onChange={onChangeData}
                                                            maxLength={9}
                                                            style={{
                                                                width: 200,
                                                                textAlign: "right",
                                                                marginRight: 10,
                                                            }}
                                                        />
                                                        VNĐ
                                                    </div>
                                                </div>

                                                <div className="form-money-donation">
                                                    <label className="labels">
                                                        Mô tả quyên góp
                                                    </label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        name="description"
                                                        value={description}
                                                        onChange={onChangeData}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 border-right">
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                    }}
                                >
                                    <div className="px-4 py-3">
                                        <h4 style={{ textAlign: "center" }}>Thông Tin Thẻ</h4>
                                        <hr />
                                        <div className="d-flex justify-content-center align-items-center mb-3">
                                            <Elements stripe={stripePromise} options={options}>
                                                <CheckoutForm />
                                            </Elements>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateMoneyDonation;
