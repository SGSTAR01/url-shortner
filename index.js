import express, { json } from 'express';
import 'dotenv/config';
import connectDB from './connection.js';
import urlRouter from './routes/url.js';
import staticRouter from './routes/staticRoutes.js';

const app = express();
const PORT = process.env.PORT

// Connect to MongoDB
const uri = process.env.DB_CONNECTION_STRING;
const options = {
    dbName: DB_NAME,
};
connectDB(uri,options);

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", staticRouter);
app.use("/url", urlRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});