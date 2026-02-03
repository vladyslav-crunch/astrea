import { request } from "./request.ts";
import { Topic, TopicBase, TopicWithStats } from "astrea-shared";

const BASE_URL = "/api/topics";

type CreateTopicInput = {
  title: string;
  color: string;
  icon: string;
};

export async function createTopic(body: CreateTopicInput) {
  const topic = await request<{ message: string; topic: Topic }>(
    BASE_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
    true,
  );

  console.log("Created topic:", topic);
}

export async function getAllTopics() {
  return await request<{ topics: TopicWithStats[] }>(
    `${BASE_URL}/with-task-stats`,
    {
      method: "GET",
    },
    true,
  );
}

export async function getTopicById(topicId: string) {
  try {
    return await request<Topic>(
      `${BASE_URL}/${topicId}`,
      {
        method: "GET",
      },
      true,
    );
  } catch (error) {
    console.error("Error fetching topic:", error);
    throw error;
  }
}

export async function updateTopic(topicId: string, body: Partial<TopicBase>) {
  const result = await request<{ message: string; topic: Topic }>(
    `${BASE_URL}/${topicId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
    true,
  );

  console.log("Updated topic:", result);
}

export async function deleteTopic(topicId: string) {
  const result = await request<{ message: string }>(
    `${BASE_URL}/${topicId}`,
    {
      method: "DELETE",
    },
    true,
  );

  console.log("Deleted:", result.message);
}
