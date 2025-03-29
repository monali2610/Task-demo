import { Request, Response } from 'express';
import crypto from 'crypto';

import { Task, TaskInput } from '../models/task.model';

const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');

  // Hashing salt and password with 100 iterations, 64 length and sha512 digest
  return crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`);
};

const createTask = async (req: Request, res: Response): Promise<any> => {
  const { description, title } = req.body;

  if ( !title) {
    return res.status(422).json({ message: 'Title is required!' });
  }

  const taskInput: TaskInput = {
    title,
    description,
  };

  const taskCreated = await Task.create(taskInput);

  return res.status(201).json({ data: taskCreated });
};

const getAllTasks = async (req: Request, res: Response): Promise<any> => {
  const users = await Task.find().sort('-createdAt').exec();

  return res.status(200).json({ data: users });
};

const getTask = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  if(!id){
    return res.status(422).json({ message: 'Task id is required!' });
  }

  const user = await Task.findOne({ _id: id }).exec();

  if (!user) {
    return res.status(404).json({ message: `Task with id "${id}" not found.` });
  }

  return res.status(200).json({ data: user });
};

const updateTask = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { title, description } = req.body;

  if(!id){
    return res.status(422).json({ message: 'Task id is required!' });
  }

  const user = await Task.findOne({ _id: id });

  if (!user) {
    return res.status(404).json({ message: `Task with id "${id}" not found.` });
  }

  if (!title) {
    return res.status(422).json({ message: 'Title is required!' });
  }

  await Task.updateOne({ _id: id }, { title, description });

  const userUpdated = await Task.findById(id);

  return res.status(200).json({ data: userUpdated });
};

const deleteTask = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  await Task.findByIdAndDelete(id);

  return res.status(200).json({ message: 'Task deleted successfully.' });
};

export { createTask, deleteTask, getAllTasks, getTask, updateTask };