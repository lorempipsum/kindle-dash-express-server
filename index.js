const { readFileSync } = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT;

const { Configuration, OpenAIApi } = require("openai");

const TOPICS = [
  "Moon",
  "Moon and Soviets",
  "Soviet Moon Experiment",
  "Nazis and the Moon",
  "Moon and hell",
  "Moon inside the Earth",
  "Too many moons",
  "Moon on fire",
  "Moon in the basement",
  "Moon fall",
  "Moon death",
  "Moon Madness",
  "Moon dementia",
  "Moon conspiracy",
  "Flat Moon",
  "Cube Moon",
  "Moon in the daytime",
  "Moon ate the sun",
  "The moon doesn't exist",
];

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getOpenAiResponse = async () => {
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `An API that generates micro horror stories based on the topics given to it, and never repeats a story twice. \n\nTopic: Breakfast\nResponse: He always stops crying when I pour the milk on his cereal. I just have to remember not to let him see his face on the carton.\n    \nTopic: Moon and Death\nResponse: The moon was so bright last night. I couldn't help but stare at it until I saw the face of death looking back at me.\n\nTopc: Moon and portals\nTwo-Sentence Horror Story: I was walking on the moon last night when I saw a portal open up. I didn't know what to do, so I just stood there and watched as death came spilling out.\n\nTopic: ${topic}\nResponse:`,
    temperature: 0.8,
    max_tokens: 60,
    top_p: 0.78,
    best_of: 4,
    frequency_penalty: 2,
    presence_penalty: 1.28,
  });

  return response;
};
const currency = (code) => {
  switch (code) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    default:
      return code;
  }
};

app.set("view engine", "pug");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const openAIText = await getOpenAiResponse();
    console.log(openAIText.data.choices[0].text);
    let data = JSON.parse(readFileSync("data.json", "utf8"));
    data = { ...data, quote: { body: openAIText.data.choices[0].text } };
    res.render("index", { ...data, currency });
  } catch (err) {
    res.status(500).send("Could not open or parse data.json");
  }
});

app.listen(port, () => console.log(`Running at http://localhost:${port}`));
