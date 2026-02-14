import { z } from "zod";

export const purchaseItemSchema = z.object({
  itemId: z.string(),
});

export const equipItemSchema = z.object({
  itemId: z.string(),
  type: z.enum(["border", "title"]),
});

export type PurchaseItemInput = z.infer<typeof purchaseItemSchema>;
export type EquipItemInput = z.infer<typeof equipItemSchema>;
