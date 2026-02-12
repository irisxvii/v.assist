import * as IntentLauncher from "expo-intent-launcher";

type SpeechResult = {
  extra?: {
    [key: string]: any;
  };
};

export async function listen(): Promise<string> {

  const result = (await IntentLauncher.startActivityAsync(
    "android.speech.action.RECOGNIZE_SPEECH",
    {
      extra: {
        "android.speech.extra.LANGUAGE_MODEL":
          "android.speech.extra.LANGUAGE_MODEL_FREE_FORM",
        "android.speech.extra.LANGUAGE": "en-US",
        "android.speech.extra.MAX_RESULTS": 1,
      },
    }
  )) as SpeechResult;

  const matches = result.extra?.["android.speech.extra.RESULTS"];

  if (Array.isArray(matches) && matches.length > 0) {
    return matches[0];
  }

  throw new Error("No speech detected");
}