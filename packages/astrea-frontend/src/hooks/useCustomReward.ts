import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as CustomRewardAPI from "../api/custom-reward";
import { toast } from "sonner";
import { playSound } from "@/utility/playSound.ts";

export const useCustomRewards = () => {
  return useQuery({
    queryKey: ["custom-rewards"],
    queryFn: CustomRewardAPI.getCustomRewards,
  });
};

export const useCreateCustomReward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      coins,
      description,
    }: {
      title: string;
      coins: number;
      description?: string;
    }) => CustomRewardAPI.createCustomReward(title, coins, description),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["custom-rewards"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateCustomReward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rewardId,
      title,
      coins,
      description,
    }: {
      rewardId: string;
      title: string;
      coins: number;
      description?: string;
    }) =>
      CustomRewardAPI.updateCustomReward(rewardId, title, coins, description),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["custom-rewards"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useClaimCustomReward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rewardId: string) =>
      CustomRewardAPI.claimCustomReward(rewardId),
    onSuccess: (data) => {
      toast.success(data.message);
      playSound("/sounds/coin-spent.mp3");
      queryClient.invalidateQueries({ queryKey: ["custom-rewards"] });
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCustomReward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rewardId: string) =>
      CustomRewardAPI.deleteCustomReward(rewardId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["custom-rewards"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
