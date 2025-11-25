import getAuthToken from "./auth";
import { config } from "./config";

// TODO - Load from OpenAPI spec
interface CreateTaskRequest {
  codeRepoIds: string[];
  description: string;
  prompt: string;
  queueRightAway: boolean;
}

interface CreateSubtaskRequest {
  title: string;
  description: string;
  prompt: string;
  repositoryIds?: string[];
  queueRightAway: boolean;
  issueSourceId?: string;
}

export class TemboClient {
  getRepositories(): Promise<any[]> {
    return this.fetch("/repository/list", {
      method: "GET",
    }).then((response) => {
      return response.codeRepositories;
    });
  }

  private readonly baseUrl: string =
    process.env.TEMBO_API_URL || "https://api.tembo.io";

  private readonly authToken: string;

  static fromEnv() {
    return new TemboClient(getAuthToken());
  }

  static fromToken(authToken: string) {
    return new TemboClient(authToken);
  }

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  async fetch(
    path: string,
    options: Omit<RequestInit, "body"> & { body?: any }
  ) {
    config.get("debug") && console.log(`Fetching ${this.baseUrl}${path}`);

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      body: options.body ? JSON.stringify(options.body) : undefined,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    return response.json();
  }

  async createTask(createTaskRequest: CreateTaskRequest) {
    const response = await this.fetch(`/task/create`, {
      method: "POST",
      body: createTaskRequest,
    });
    return response;
  }

  async createSubtask(createSubtaskRequest: CreateSubtaskRequest) {
    const response = await this.fetch(`/task/create`, {
      method: "POST",
      body: {
        title: createSubtaskRequest.title,
        description: createSubtaskRequest.description,
        prompt: createSubtaskRequest.prompt,
        codeRepoIds: createSubtaskRequest.repositoryIds,
        queueRightAway: createSubtaskRequest.queueRightAway,
        issueSourceId: createSubtaskRequest.issueSourceId,
      },
    });
    return response;
  }
}
