import { useEffect, useCallback } from "react";
import { StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import * as DocumentPicker from "expo-document-picker";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { speak } from "../../speech/textToSpeech";

const WELCOME_MESSAGE =
  "Welcome. Choose an option to get started.";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const tint = useThemeColor({}, "tint");
  const colorScheme = useColorScheme();
  const buttonBg =
    colorScheme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(10, 126, 164, 0.2)";

  useEffect(() => {
    speak(WELCOME_MESSAGE);
  }, []);

  const pickDocument = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        speak("No file selected.");
        return;
      }

      const file = result.assets[0];
      speak(`Form selected: ${file.name}. We'll use this form in the next step.`);
      // TODO: navigate to form-filling flow with file.uri
    } catch (err) {
      speak("Could not open files. Please try again.");
    }
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        V ASSIST
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Choose how you want to add your form.
      </ThemedText>

      <TouchableOpacity
        style={[
          styles.uploadButton,
          {
            minWidth: Math.min(width * 0.8, 320),
            borderColor: tint,
            backgroundColor: buttonBg,
          },
        ]}
        onPress={pickDocument}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Upload form from files"
        accessibilityHint="Opens your files so you can select a form to fill"
      >
        <ThemedText style={styles.uploadButtonText}>Upload form</ThemedText>
        <ThemedText style={styles.uploadButtonHint}>
          Choose a form from Downloads or Files
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 40,
    opacity: 0.9,
  },
  uploadButton: {
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  uploadButtonHint: {
    fontSize: 14,
    opacity: 0.85,
  },
});
