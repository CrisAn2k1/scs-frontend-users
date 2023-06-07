import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import Loading from "../../../../layouts/Loading";
import { apiURL } from "../../../../../api";
import axios from "axios";
import { HOST } from "../../../../../constants";

export default function CheckoutForm({ charityCallId, amount }) {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleError = (error) => {
        setLoading(false);
        setErrorMessage(error.message);
    };

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

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
            amount: amount,
        });

        // return;
        const clientSecret = res.data.data.paymentIntent;

        // Confirm the PaymentIntent using the details collected by the Payment Element
        console.log(clientSecret);
        try {
            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${HOST}/events/`,
                },
            });
        } catch (e) {
            console.log(e);
        }

        console.log("123");
        // if (error) {
        //     // This point is only reached if there's an immediate error when
        //     // confirming the payment. Show the error to your customer (for example, payment details incomplete)
        //     handleError(error);
        // } else {
        //     window.location.href = "https://www.youtube.com/watch?v=e-whXipfRvg";
        //     console.log("123111");
        //     // Your customer is redirected to your `return_url`. For some payment
        //     // methods like iDEAL, your customer is redirected to an intermediate
        //     // site first to authorize the payment, then redirected to the `return_url`.
        // }
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
                            disabled={!stripe || loading}
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
