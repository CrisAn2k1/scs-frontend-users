import React, { useCallback, useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../layouts/Loading";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { events$ } from "../../../../../redux/selectors";
import { getEventDetail } from "../../../../../redux/actions/events";
import Swal from "sweetalert2";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe(
    "pk_test_51KkIaFKMTZjXsvPFEDrEMfFhgdDH7PSGRmSemHIoKruZIrIxBpYWhNsMilLziAhZMF8MTX56VrTSsBydCPIN86hG00qKtamo4q",
);

const CreateMoneyDonation = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const events = useSelector(events$);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        authState: { user, isAuthenticated, authLoading },
        loadUser,
    } = useContext(AuthContext);

    if (!authLoading && !isAuthenticated) {
        navigate(`/login`);
    }
    console.log(user);

    const clearData = useCallback(() => {
        setMoneyDonationForm({
            amount: moneyDonationForm.amount,
            description: "",
            eventId: id,
            userId: user?.data?.id,
            isAnonymous: false,
        });
    }, [user]);

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

    useEffect(() => {
        dispatch(getEventDetail.getEventDetailRequest(id));
    }, [id]);

    useEffect(() => {
        events?.singleEventDetail ? setIsLoading(false) : setIsLoading(true);
        console.log(events);
    }, [events]);

    const [moneyDonationForm, setMoneyDonationForm] = useState({
        amount: 0,
        description: "",
        eventId: id,
        userId: "",
        isAnonymous: false,
    });

    const { amount, description, isAnonymous } = moneyDonationForm;

    const onChangeData = useCallback(
        (event) => {
            if (event.target.name === "amount") {
                event.target.value = event.target.value.replace(/\D/g, "");
            }
            if (event.target.name == "isAnonymous") {
                event.target.value = event.target.value == "false" ? true : false;
            }

            setMoneyDonationForm({ ...moneyDonationForm, [event.target.name]: event.target.value });
        },
        [moneyDonationForm],
    );
    moneyDonationForm.amount = +moneyDonationForm.amount;

    const options = {
        mode: "payment",
        amount: 100000,
        currency: "vnd",
        paymentMethodCreation: "manual",
        // automatic_payment_methods: {enabled: true}
    };

    const showDetailAnonymous = () => {
        Swal.fire({
            position: "top-center",
            icon: "info",
            title: "Quyên Góp Ẩn Danh?",
            html: `<div class="detail-info-anonymous" style="text-align: justify;text-indent: 20px;">Khi bạn chọn chế độ <strong>"Quyên Góp Ẩn Danh"</strong> thì mọi người sẽ không biết bất kỳ thông tin nào về bạn trong danh sách những người quyên góp.</div>`,
            showClass: {
                popup: "animated fadeInDown faster",
                icon: "animated heartBeat delay-1s",
            },
            hideClass: {
                popup: "animated fadeOutDown faster",
            },
        });
    };

    console.log(moneyDonationForm);
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
                                                <div
                                                    className="col-md-12"
                                                    style={{
                                                        marginTop: 15,
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <input
                                                        id="isAnonymous"
                                                        style={{
                                                            textAlign: "left",
                                                            width: 20,
                                                            marginRight: 10,
                                                            cursor: "pointer",
                                                        }}
                                                        type="checkbox"
                                                        className="form-control"
                                                        name="isAnonymous"
                                                        value={isAnonymous}
                                                        onChange={onChangeData}
                                                    />
                                                    <label className="labels" htmlFor="isAnonymous">
                                                        <strong
                                                            style={{
                                                                color: "red",
                                                                fontSize: 15,
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            Quyên góp ẩn danh
                                                        </strong>
                                                        <br></br>
                                                    </label>
                                                    <i
                                                        class="bi bi-info-circle"
                                                        style={{
                                                            cursor: "pointer",
                                                            marginLeft: 10,
                                                            fontSize: 15,
                                                        }}
                                                        onClick={showDetailAnonymous}
                                                    ></i>
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
                                                <CheckoutForm
                                                    charityCallId={
                                                        events?.singleEventDetail?.charityCall?.id
                                                    }
                                                    moneyDonationForm={moneyDonationForm}
                                                />
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
