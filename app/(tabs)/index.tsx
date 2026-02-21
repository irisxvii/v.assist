import { useEffect, useCallback, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { speak } from "../../speech/textToSpeech";

const WELCOME_MESSAGE = "Welcome. Choose an option to get started.";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const tint = useThemeColor({}, "tint");
  const colorScheme = useColorScheme();

  const cardBg =
    colorScheme === "dark" ? "rgba(255,255,255,0.06)" : "#fff";

  const [pressed, setPressed] = useState(false);

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
      speak(`Form selected: ${file.name}`);
    } catch {
      speak("Could not open files. Please try again.");
    }
  }, []);

  const scanForm = () => {
    speak("Camera feature coming soon.");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        V ASSIST
      </ThemedText>

      <ThemedText style={styles.subtitle}>
        Choose how you want to add your form
      </ThemedText>

      <View
        style={[
          styles.card,
          {
            width: Math.min(width * 0.9, 360),
            backgroundColor: cardBg,
          },
        ]}
      >
        <Pressable
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          onPress={pickDocument}
          style={({ pressed }) => [
            styles.button,
            { transform: [{ scale: pressed ? 0.96 : 1 }] },
          ]}
        >
          <Ionicons name="cloud-upload-outline" size={26} color={tint} />
          <View>
            <ThemedText style={styles.buttonText}>Upload Form</ThemedText>
            <ThemedText style={styles.hint}>
              Choose from Files or Downloads
            </ThemedText>
          </View>
        </Pressable>

        <Pressable
          onPress={scanForm}
          style={({ pressed }) => [
            styles.button,
            { transform: [{ scale: pressed ? 0.96 : 1 }] },
          ]}
        >
          <Ionicons name="scan-outline" size={26} color={tint} />
          <View>
            <ThemedText style={styles.buttonText}>Scan with Camera</ThemedText>
            <ThemedText style={styles.hint}>
              Take photo of your form
            </ThemedText>
          </View>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: 1,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
    opacity: 0.8,
    fontSize: 15,
  },
  card: {
    borderRadius: 24,
    padding: 18,
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
  },
  hint: {
    fontSize: 13,
    opacity: 0.7,
  },
});