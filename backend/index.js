require("dotenv").config();

const natural = require("natural");
const app = require("./app");

const PORT = process.env.PORT || 5000;

console.log("Natural package loaded:", typeof natural);

app.listen(PORT, () => {
  console.log(`GiftLink Backend running on port ${PORT}`);
});