import app from "./server/server";
import dotenv from "dotenv";
import routes from "./routes/routes";
import "./config/mongodb";


dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/api/v1",routes())


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});