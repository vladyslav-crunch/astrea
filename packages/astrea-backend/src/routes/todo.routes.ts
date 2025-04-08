import { Todo } from "../models/todo.model";
import { Router, type Request, type Response } from "express";
const router = Router();

// Create
router.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Read all
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Read one
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.status(200).json(todo);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ message: "Deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
