import { connectDb } from './config/db.js';
import { app } from './index.js';

const PORT = 5454;
import dotenv from 'dotenv';
dotenv.config();


app.listen(PORT, async () => {
  await connectDb();
  console.log("listening on the port ", PORT);
});
