import {request} from "./request.ts";
import {Topic} from "astrea-shared";

const BASE_URL = 'http://localhost:3000/api/topics';
const AUTH_TOKEN = localStorage.getItem("accessToken");
const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AUTH_TOKEN}`,
};

export async function createTopic(body: Topic) {

    const topic = await request<{ message: string; topic: Topic }>(BASE_URL, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(body),
    });

    console.log('Created topic:', topic);
}


export async function getAllTopics() {
    const data = await request<{ topics: Topic[] }>(BASE_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
    });
    console.log('Get all topics:', data);
    return data;
}

export async function getTopicById(topicId: string) {
    const topic = await request<Topic>(`${BASE_URL}/${topicId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
    });

    console.log('Topic:', topic);
}

export async function updateTopic(topicId: string, body: Topic) {

    const result = await request<{ message: string; topic: Topic }>(`${BASE_URL}/${topicId}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(body),
    });

    console.log('Updated topic:', result);
}

export async function deleteTopic(topicId: string) {
    const result = await request<{ message: string }>(`${BASE_URL}/${topicId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
    });

    console.log('Deleted:', result.message);
}

