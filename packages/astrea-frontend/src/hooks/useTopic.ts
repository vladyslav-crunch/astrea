import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTopic,
  deleteTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
} from "../api/topic.ts";

// React Query Hooks

export function useTopics() {
  return useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const data = await getAllTopics();
      return data.topics;
    },
  });
}

export function useTopic(topicId: string) {
  return useQuery({
    queryKey: ["topic", topicId],
    queryFn: () => getTopicById(topicId),
    enabled: !!topicId,
    retry: true,
  });
}

export function useCreateTopic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["topics"],
      });
    },
  });
}

export function useUpdateTopic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      topicId,
      body,
    }: {
      topicId: string;
      body: { title: string; color: string; icon: string };
    }) => updateTopic(topicId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["topics"],
      });
      queryClient.invalidateQueries({
        queryKey: ["topic"],
      });
    },
  });
}

export function useDeleteTopic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (topicId: string) => deleteTopic(topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["topics"],
      });
    },
  });
}
