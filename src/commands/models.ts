import { Command } from "commander";
import { getAvailableModels, isModelAvailable } from "../models";
import getAuthToken from "../auth";

const models = new Command();

models
  .name("models")
  .description("List available models or check model availability");

models
  .command("list")
  .description("List all available models for the current user")
  .option("--user-id <userId>", "User ID for feature flag checking")
  .action(async (options) => {
    const userId = options.userId || getAuthToken().substring(0, 10); // Use part of auth token as user ID if not provided

    try {
      const availableModels = await getAvailableModels(userId);

      if (availableModels.length === 0) {
        console.log("No models available for this user.");
        return;
      }

      console.log("Available models:");
      for (const model of availableModels) {
        console.log(`  - ${model.id} (${model.name}) - Provider: ${model.provider}`);
        if (model.requiresFeatureFlag) {
          console.log(`    Requires feature flag: ${model.requiresFeatureFlag}`);
        }
      }
    } catch (error) {
      console.error("Error fetching available models:", error);
      process.exit(1);
    }
  });

models
  .command("check")
  .description("Check if a specific model is available")
  .argument("<modelId>", "The model ID to check")
  .option("--user-id <userId>", "User ID for feature flag checking")
  .action(async (modelId, options) => {
    const userId = options.userId || getAuthToken().substring(0, 10);

    try {
      const available = await isModelAvailable(modelId, userId);

      if (available) {
        console.log(`✓ Model "${modelId}" is available for this user.`);
      } else {
        console.log(`✗ Model "${modelId}" is NOT available for this user.`);
      }
    } catch (error) {
      console.error("Error checking model availability:", error);
      process.exit(1);
    }
  });

export default models;
