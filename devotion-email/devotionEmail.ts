import { api } from "encore.dev/api";


export const sendDevotionEmail = api({ method: "POST" }, async (email) => {
  // Send Daily emails

});

// const _ = new CronJob("daily-email", {
//   title: "Daily Word of God",
//   every: "24h",
//   endpoint: sendDevotionEmail()
// });
