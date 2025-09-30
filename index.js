import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const Host = "http://localhost:"
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${Host+PORT}`);
});
