import { Subscription } from "encore.dev/pubsub";
import { signups } from "../users/signUp";

const _ = new Subscription(signups, "send-welcome-email", {
  handler: async (event) => {
    // Send a welcome email using the event using nodemailer
    console.log(event);
  }
});

