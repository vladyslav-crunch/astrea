import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ShopAPI from "../api/shop";
import { toast } from "sonner";
import { playSound } from "@/utility/playSound.ts";

export const useShopItems = () => {
  return useQuery({
    queryKey: ["shop", "items"],
    queryFn: ShopAPI.getShopItems,
  });
};

export const useInventory = () => {
  return useQuery({
    queryKey: ["shop", "inventory"],
    queryFn: ShopAPI.getUserInventory,
  });
};

export const usePurchaseItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => ShopAPI.purchaseItem(itemId),
    onSuccess: (data) => {
      toast.success(data.message);
      playSound("/sounds/coin-spent.mp3");
      queryClient.invalidateQueries({ queryKey: ["session"] });
      queryClient.invalidateQueries({ queryKey: ["shop", "inventory"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useEquipItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      type,
    }: {
      itemId: string;
      type: "border" | "title";
    }) => ShopAPI.equipItem(itemId, type),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
