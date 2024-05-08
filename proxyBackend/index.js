const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 8080;

const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/api/:id", async (req, res) => {
  try {
    const params = req.params;

    const response = await axios.get(
      "https://freeapi.miniprojectideas.com/api/TrainApp/" + params.id
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/:id", async (req, res) => {
  try {
    const params = req.params;

    const response = await axios.post(
      "https://freeapi.miniprojectideas.com/api/TrainApp/" + params.id,
      req.body
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
