const express = require('express');
const app = express();
const cors = require("cors");
const dotEnv = require("dotenv")

dotEnv.config()

const PORT = process.env.PORT

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
// const routes = require("./routes/index.routes");
// app.use("/", routes);


db.sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
        console.log("SERVER RUNNING ON PORT 4000");
    });

    // app.listen(PORT,HOST,() => console.log(`Server running on ${HOST} at ${PORT}`));
})
 