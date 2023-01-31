const express = require("express");
const bodyParser = require("body-parser");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// New app using express module
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", async function (req, res) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic bHJvamFzOkdydXBvcGlzYQ==");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "metodoNombre": "MTD092",
        "metodopEntrada": [
            {
                "llave": "string",
                "valor": "21"
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("https://10.174.14.198:8444/InterCMaS_Finae/webresources/Items/METODOS", requestOptions)
        .then(response => response.text())
        .then(result => result)
        .catch(error => error);

    res.status(200).json({ message: response });
});

app.listen(3000, function () {
    console.log("server is running on port 3000");
})
