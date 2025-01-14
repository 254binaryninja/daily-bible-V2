import { Topic } from "encore.dev/pubsub";

export interface SignupEvent {
  name: string;
  email: string;
}

export const signups = new Topic<SignupEvent>("signups", {
  deliveryGuarantee: "at-least-once"
});