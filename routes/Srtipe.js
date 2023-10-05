// This is your test secret API key.
const Stripe = require('stripe')
const express = require('express');
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY)
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

const StripeRouter = (app) => {
    app.post('/create-checkout-session', async (req, res) => {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: '{{PRICE_ID}}',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        });

        res.send({ utl: session.url });
    });
}


module.exports = StripeRouter;
