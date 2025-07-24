import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
    createGoal,
    deleteGoal, getDraftGoal,
    getGoalById,
    getGoalsByTopic, reorderGoals,
    updateGoal,
} from '../api/goal.ts';
import type {CreateGoalInput} from '../api/goal.ts'; // Optional if you have it typed separately

// ⬇️ Get all goals for a topic
export function useGoalsByTopic(topicId: string) {
    return useQuery({
        queryKey: ['goals', topicId],
        queryFn: () => getGoalsByTopic(topicId),
        enabled: !!topicId,
        select: (data) => data.goals,
        retry: false
    });
}

// ⬇️ Get one goal by ID
export function useGoal(goalId: string, options?: { enabled?: boolean }) {
    return useQuery({
        queryKey: ['goal', goalId],
        queryFn: () => getGoalById(goalId),
        enabled: !!goalId && (options?.enabled ?? true),
        select: (data) => data,
    });
}

// ⬇️ Create a new goal
export function useCreateGoal(topicId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: CreateGoalInput) => createGoal(topicId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['goals', topicId]});
        },
    });
}

// ⬇️ Update a goal
export function useUpdateGoal(topicId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({goalId, body}: { goalId: string; body: Partial<CreateGoalInput> }) =>
            updateGoal(goalId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['goals', topicId]});
        },
    });
}

// ⬇️ Delete a goal
export function useDeleteGoal(topicId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (goalId: string) => deleteGoal(goalId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['goals', topicId]});
        },
    });
}

export function useReorderGoals(topicId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reorderGoals,
        onSuccess: () => {
            // Invalidate and refetch to ensure correct order
            queryClient.invalidateQueries({queryKey: ['goals', topicId]});
        },
    });
}

export function useDraftGoal(
    topicId: string,
    options?: { enabled?: boolean }
) {
    return useQuery({
        queryKey: ['goals', topicId, 'default'],
        queryFn: () => getDraftGoal(topicId),
        select: (data) => data.goal,
        retry: false,
        enabled: !!topicId && (options?.enabled ?? true),
    });
}
