require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mailRoute = require("./routes/sendMail.routes");
const port = process.env.PORT || 8000;

//let's initialize some middlewares
app.use(cors());
app.use(express.json());


app.get("/",(request,response)=>{
    return response.send("hello world");
});

app.use("/api/v1",mailRoute);
app.listen(port,()=>{
    console.log("connected to the server");
})


