"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helmet_1 = require("helmet");
var dotenv_1 = require("dotenv");
var geoapify_1 = require("./controllers/geoapify");
var google_1 = require("./controllers/google");
var express = require('express');
var morgan = require('morgan');
(0, dotenv_1.config)();
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.json());
app.use((0, helmet_1.default)());
app.use(morgan("dev"));
app.get("/", function (_, res) {
    res.json({
        success: true,
        message: "UP",
    });
});
app.post("/location", geoapify_1.geoapify);
app.post("/location-google", google_1.getLocationGoogle);
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT, "."));
});
