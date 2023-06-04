import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import Loading from "../../../../layouts/Loading";
import { apiURL } from "../../../../../api";
import axios from "axios";

export default function CheckoutForm({ charityCallId }) {
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
        });

        console.log(res);
        const { client_secret: clientSecret } = await res.json();

        // Confirm the PaymentIntent using the details collected by the Payment Element
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: "https://www.youtube.com/watch?v=unVAYw3tXOw",
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the payment. Show the error to your customer (for example, payment details incomplete)
            handleError(error);
        } else {
            // Your customer is redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer is redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
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
