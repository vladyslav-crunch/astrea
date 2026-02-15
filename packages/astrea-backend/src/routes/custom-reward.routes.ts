import { Router } from "express";
import {
  getUserCustomRewards,
  createCustomReward,
  updateCustomReward,
  claimCustomReward,
  deleteCustomReward,
} from "../controllers/custom-reward.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = Router();

router.get("/", isAuthenticated, getUserCustomRewards);
router.post("/", isAuthenticated, createCustomReward);
router.put("/", isAuthenticated, updateCustomReward);
router.post("/claim", isAuthenticated, claimCustomReward);
router.delete("/:rewardId", isAuthenticated, deleteCustomReward);

export default router;
