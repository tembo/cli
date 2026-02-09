import { isFeatureFlagEnabled } from "./feature-flags";

export interface Model {
  id: string;
  name: string;
  provider: string;
  requiresFeatureFlag?: string;
}

/**
 * Available models in the system
 */
const MODELS: Model[] = [
  {
    id: "kimi",
    name: "Kimi",
    provider: "moonshot",
    requiresFeatureFlag: "is-internal",
  },
  // Add other models here as needed
];

/**
 * Get all available models for a given user
 * @param userId The user's distinct ID for feature flag checking
 * @returns Promise<Model[]> List of available models
 */
export async function getAvailableModels(userId: string): Promise<Model[]> {
  const availableModels: Model[] = [];

  for (const model of MODELS) {
    if (model.requiresFeatureFlag) {
      // Check if user has access to this model via feature flag
      const hasAccess = await isFeatureFlagEnabled(
        model.requiresFeatureFlag,
        userId,
        false // Default to false - deny access if flag check fails
      );

      if (hasAccess) {
        availableModels.push(model);
      }
    } else {
      // No feature flag required, model is available to all users
      availableModels.push(model);
    }
  }

  return availableModels;
}

/**
 * Check if a specific model is available for a user
 * @param modelId The model ID to check
 * @param userId The user's distinct ID for feature flag checking
 * @returns Promise<boolean> True if the model is available
 */
export async function isModelAvailable(
  modelId: string,
  userId: string
): Promise<boolean> {
  const model = MODELS.find((m) => m.id === modelId);

  if (!model) {
    return false;
  }

  if (model.requiresFeatureFlag) {
    return await isFeatureFlagEnabled(
      model.requiresFeatureFlag,
      userId,
      false
    );
  }

  return true;
}

/**
 * Get model by ID (without feature flag check)
 * @param modelId The model ID to retrieve
 * @returns Model | undefined
 */
export function getModelById(modelId: string): Model | undefined {
  return MODELS.find((m) => m.id === modelId);
}
