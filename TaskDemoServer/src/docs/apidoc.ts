import { createTask,
  createTaskBody,
  deleteTask,
  getTasks,
  getTask,
  updateTaskBody,
  updateTask, } from './tasks';

const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Task Demo API - Documentation',
    description: 'demo API for task management'
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local Server',
    },
  ],
  tags: [
    {
      name: 'Tasks',
    },
  ],
  paths: {
    '/tasks': {
      post: createTask,
      get: getTasks,
    },
    '/tasks/{id}': {
      delete: deleteTask,
      get: getTask,
      patch: updateTask,
    },
  },
  components: {
    // securitySchemes: {
    //   bearerAuth: {
    //     type: 'http',
    //     scheme: 'bearer',
    //     bearerFormat: 'JWT',
    //   },
    // },
    schemas: {
      createTaskBody,
      updateTaskBody,
    },
  },
};

export { apiDocumentation };