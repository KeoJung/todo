import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json(todo);
};

export const getTodosByUser = async (req, res) => {
  const todos = await Todo.find({ userId: req.params.userId });
  res.json(todos);
};
