import { useEffect } from "react";
import { speak } from "../../speech/textToSpeech";

export default function HomeScreen() {
  useEffect(() => {
    speak("What is your full name?");
  }, []);

  return null;
}
