import express, { urlencoded } from "express";

import cors from "cors";
import cookiesParser from "cookies-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); // this line basically work ki wo json file ki kitni stoage wala accept kar sakta hai
app.use(express(urlencoded({ extended: true, limit: "16kb" }))); // it help to encoded the link like when we search in anything in google we saw they give me in + formate like that
app.use(express.static("public"));
app.use(cookiesParser());

export { app };
