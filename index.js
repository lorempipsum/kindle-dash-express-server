const { readFileSync } = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT || 3030;

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
  "Moon spiders",
  "Moon light",
  "Moon watchers",
  "Moon watch",
  "Moon face",
  "Moon demons",
  "Moon gods",
  "Moon visions",
  "Moon darkness",
  "Moon lost",
  "Moon Capitalism",
  "Moon Americans",
  "Moon Russians",
  "Moon Cosmos",
  "Moon soviets",
  "Moon fire",
  "Alone on the Moon",
  "Moon caves",
  "It is dark in the cave",
  "The burning Sun on the Moon",
  "The Moon is a lie",
  "The Moonspiracy",
  "Moon astronaut",
  "Moon mission 42",
  "Moon mission 420",
  "Moon weed",
  "Moon drugs",
  "Moon and Soviet DMT",
  "Moon and Soviet LSD",
  "KGB Moon base",
  "Russian Moon Lithium Mine",
  "Moon power"
];

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getOpenAiResponse = async () => {
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

  const response = await openai.createCompletion({
    model: "text-davinci-002",
  prompt: `An API that generates micro cosmic horror stories based on the topics given to it, and never repeats a story twice.  They should all be from a first-person perspective, with a theme of insanity.\n\nTopic: Breakfast\nResponse: He always stops crying when I pour the milk on his cereal. I just have to remember not to let him see his face on the carton.\n    \nTopic: Moon and The Soviets\nResponse: The Soviets were the first to learn about the Anomaly when they sent a manned mission to the Lunar surface. They never returned home.\n\nTopic: Moon\nResponse: I can hear them sometimes, scratching at the door of my airlock. I don't know how they got here, but I know they're not human.\n\nTopic: Moon demons\nResponse: I am the only one left. The others, they couldn't take it.  I can hear the Moon whispering to me sometimes, telling me to come outside and play.\n\nTopic: Moon face\nResponse: I wake up in a cold sweat. I can't shake the feeling that there's something wrong with the Moon. That it's watching me.\n\nTopic: Moon spiders\nResponse: I can feel them crawling on me, inside my suit. I knew there was something wrong with this mission. I should have never come to the Moon.\n\nTopic: Moon soviets\nResponse: I am the last of my unit. We were sent to investigate the Soviet base on the Moon, but we found something else entirely. I can still hear their screams in my nightmares.\n\nTopic: Moon gods\nResponse: They're coming for me. I can feel it. The Moon is their eyes, and they are coming to take me away.\n\nTopic: Moon Cosmos\nResponse: I am lost in the Cosmos. I float aimlessly through the void, forever alone. The only light in this darkness is the Moon, and it mocks me with its bright face.\n\nTopic: Moon Russians\nResponse: I can see them, even now. The Russians, crawling across the lunar surface. They come for me in my dreams, and I wake up screaming.\n\nTopic: Moon Capitalism\nResponse: I am a ghost. I haunt this lunar base, these halls that were once my home. I can't rest until the capitalists are driven from this place. From all of our places.\n\nTopic: Moon Americans\nResponse: I can hear them, even now. The Americans, laughing and joking as they walk on the Moon. They have no idea what's coming for them.\n\nTopic: Moon Lost\nResponse: I am lost on the Moon. I wander these hallways, searching for a way home. But there is no home for me now, only the cold embrace of the Moon.\n\nTopic: Moon Dementia\nResponse: I can feel myself slipping. I forget my name, my mission. The only thing that is real to me now is the Moon, and her bright face that smiles down on me in the darkness.\n\nTopic: Moon visions\nResponse:  The Moon, the stars, the planets. They're all dark. Yet I still see them, even when I close my eyes.\n\nTopic: Moon darkness\nResponse: The darkness is everywhere. It surrounds me, suffocates me. I can't escape it, no matter how hard I try.\n\nTopic: ${topic}\nResponse:`,

    temperature: 0.86,
    max_tokens: 60,
    top_p: 1,
    best_of: 1,
    frequency_penalty: 1.82,
    presence_penalty: 1.86,
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
    data = { quote: { body: openAIText.data.choices[0].text } };
    res.render("index", { ...data, currency });
  } catch (err) {
    res.status(500).send("Could not open or parse data.json");
  }
});

app.listen(port, () => console.log(`Running at http://localhost:${port}`));
