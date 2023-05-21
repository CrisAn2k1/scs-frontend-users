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
