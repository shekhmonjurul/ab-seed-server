import { configDotenv } from "dotenv"

configDotenv()

const fraudEndPoint = process.env.FRAUD_END_POINT
const fraudApiOtion = {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.FRAUD_CHECKER_API_KEY}`
  },
}


export default {
  fraudEndPoint,
  fraudApiOtion
}