import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
export default function CheckoutForm() {
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

        if (!stripe) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true);

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        // Create the PaymentMethod using the details collected by the Payment Element
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            elements,
            params: {
                billing_details: {
                    name: "Jenny Rosen",
                },
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // creating the PaymentMethod. Show the error to your customer (for example, payment details incomplete)
            handleError(error);
            return;
        }

        // Create the PaymentIntent
        const res = await fetch("http://localhost:3000/create-confirm-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
            }),
        });

        const data = await res.json();

        console.log(data);

        // Handle any next actions or errors. See the Handle any next actions step for implementation.
        handleServerResponse(data);
        const handleServerResponse = async (response) => {
            if (response.error) {
                // Show error from server on payment form
            } else if (response.status === "requires_action") {
                // Use Stripe.js to handle the required next action
                const { error, paymentIntent } = await stripe.handleNextAction({
                    clientSecret: response.clientSecret,
                });

                if (error) {
                    // Show error from Stripe.js in payment form
                } else {
                    // Actions handled, show success message
                }
            } else {
                // No actions needed, show success message
            }
        };
    };

    return (
        <>
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
        </>
    );
}
