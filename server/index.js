const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== "production"; //true false
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); //part of next config

nextApp
  .prepare()
  .then(() => {
    const app = express();
    const showRoutes = require("./routes/index.js");

    app.use("/api", showRoutes(app));

    app.get("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(PORT, err => {
      if (err) throw err;
      console.log(`> I'm listening on port ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
