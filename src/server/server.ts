import express, { Application } from "express";
import morgan from "morgan";
import routes from "../routes/routes";
import cors from "cors";

const app: Application = express();
/*Middlewares*/
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

/*Routes*/
app.use("/api/v1", routes());

export default app