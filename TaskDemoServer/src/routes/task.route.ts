import { Router } from 'express';
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from '../controllers/task.controller';

const taskRoute = () => {
  const router = Router();

  router.post('/tasks', createTask);

  router.get('/tasks', getAllTasks);

  router.get('/tasks/:id', getTask);

  router.put('/tasks/:id', updateTask);

  router.delete('/tasks/:id', deleteTask);

  return router;
};

export { taskRoute };