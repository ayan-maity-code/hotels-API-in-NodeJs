const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send("Hello World");
});
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// run();

app.get("/api/content", async (req, res) => {
  try {
        const data = req.body.question;
        const result = await run(data);

        res.send({
           "Answer" : result 
        })

     
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
