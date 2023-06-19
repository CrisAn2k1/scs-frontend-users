import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiURL } from "../../../../../api";
import { HOST } from "../../../../../constants";
import Loading from "../../../../layouts/Loading";

export default function CheckoutForm({ charityCallId, moneyDonationForm }) {
    const [isDisable, setIsDisable] = useState(true);

    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleError = (error) => {
        setLoading(false);
        setErrorMessage(error.message);
    };

    useEffect(() => {
        if (
            !charityCallId ||
            moneyDonationForm.amount?.toString().length < 5 ||
            moneyDonationForm.description?.length < 1
        ) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [moneyDonationForm.amount, charityCallId, moneyDonationForm.description]);

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (moneyDonationForm.amount < 50000) {
            Swal.fire(
                "Thông Báo!",
                `Số Tiền Quyên Góp Ít Nhất 50.000 vnđ <br style="margin:50px 0"><br/> Xin cảm ơn!`,
                "info",
            );
            return;
        }

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            setLoading(false);
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        // Create the PaymentIntent and obtain clientSecret
        const res = await axios.post(`${apiURL}/stripe/payment-sheet`, {
            charityCallId: charityCallId,
            amount: +moneyDonationForm.amount,
        });

        // return;
        const clientSecret = res.data.data.paymentIntent;

        // Confirm the PaymentIntent using the details collected by the Payment Element
        try {
            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${HOST}/events/${moneyDonationForm.eventId}`,
                },
                redirect: "if_required",
            });

            if (error) {
                Swal.fire("Thông Báo!", "Quyên Góp Không Thành Công!", "error");
            } else {
                const resMoneyDonation = axios.post(`${apiURL}/money-donations`, {
                    amount: moneyDonationForm.amount,
                    description: moneyDonationForm.description,
                    userId: moneyDonationForm.userId,
                    eventId: +moneyDonationForm.eventId,
                    paymentGatewayId: 1,
                    paymentStatus: "paid",
                    isAnonymous: moneyDonationForm.isAnonymous == "true",
                });
                Swal.fire({
                    title: "Thông Báo!",
                    text: "Quyên Góp  Thành Công!",
                    icon: "success",
                    showConfirmButton: true,
                    timer: 5000,
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/events/${moneyDonationForm.eventId}`);
                    }
                });
                setTimeout(() => {
                    navigate(`/events/${moneyDonationForm.eventId}`);
                }, 5000);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Loading hidden={!loading} />

            <form onSubmit={handleSubmit}>
                <div style={{ width: "100%" }}>
                    <PaymentElement />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: 15,
                        }}
                    >
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={!stripe || loading || isDisable}
                        >
                            Quyên Góp
                        </button>
                    </div>
                    {errorMessage && <div>{errorMessage}</div>}
                </div>
            </form>
        </>
    );
}
