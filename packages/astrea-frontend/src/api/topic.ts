import {request} from "./request.ts";
import {Topic} from "astrea-shared";

const BASE_URL = 'http://localhost:3000/api/topics';

export async function createTopic(body: Topic) {
    const topic = await request<{ message: string; topic: Topic }>(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }, true);

    console.log('Created topic:', topic);
}

export async function getAllTopics() {
    const data = await request<{ topics: Topic[] }>(BASE_URL, {
        method: 'GET',
    }, true);

    console.log('Get all topics:', data);
    return data;
}

export async function getTopicById(topicId: string) {
    const topic = await request<Topic>(`${BASE_URL}/${topicId}`, {
        method: 'GET',
    }, true);

    console.log('Topic:', topic);
    return topic;
}

export async function updateTopic(topicId: string, body: Topic) {
    const result = await request<{ message: string; topic: Topic }>(`${BASE_URL}/${topicId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }, true);

    console.log('Updated topic:', result);
}

export async function deleteTopic(topicId: string) {
    const result = await request<{ message: string }>(`${BASE_URL}/${topicId}`, {
        method: 'DELETE',
    }, true);

    console.log('Deleted:', result.message);
}
