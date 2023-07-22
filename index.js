import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const baseURL = "https://v2.jokeapi.dev/joke/";

app.get("/", async (req, res) => {
  try {
    let result = await axios.get(baseURL + "Any");
    var data = result.data;
    console.log(data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    res.render("index.ejs", { content: error });
  }
});

app.post("/", async (req, res) => {
  var input = req.body["choice"];

  //when an array with a single item is passed in the request body,
  //it could be parsed as a string rather than an array.
  if (typeof input === "string") {
    // If input is a string, convert it to an array
    input = [input];
  }
  // Check if input is an array and not empty(i.e., that at least one checkbox was selected).
  if (Array.isArray(input) && input.length) {
    var joinedInput = input.join(",");
    console.log(joinedInput); // Outputs the joined string e.g. "Programming, Dark, Pun"
  } else {
    console.log("No choices were selected or input is not an array.");
  }

  try {
    let result = await axios.get(baseURL + joinedInput);
    var data = result.data;
    console.log(result.data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    res.render("index.ejs", { content: "error" });
  }
});

app.listen(port, () => {
  console.log(`Server started at port: ${port}\n http://localhost:3000/`);
});
