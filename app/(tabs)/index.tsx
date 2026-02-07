import { useEffect } from "react";
import { speak } from "../../speech/textToSpeech";
import { listen } from "../../speech/speechToText";

export default function HomeScreen() {
  useEffect(() => {
    async function run() {
      speak("What is your full name?");
      const text = await listen();
      console.log("USER SAID:", text);
    }

    run();
  }, []);

  return null;
}