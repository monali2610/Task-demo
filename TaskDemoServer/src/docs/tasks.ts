const taskResponse = {
  _id: {
    type: "string",
    example: "60564fcb544047cdc3844818",
  },
  title: {
    type: "string",
    example: "task title",
  },
  description: {
    type: "string",
    example: "this is a description",
  },
  createdAt: {
    type: "string",
    example: "2021-03-20T19:40:59.495Z",
  },
  updatedAt: {
    type: "string",
    example: "2021-03-20T21:23:10.879Z",
  },
};

const internalServerError = {
  description: "Internal Server Error",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Internal Server Error",
          },
        },
      },
    },
  },
};

const taskNotFound = {
  description: "Resource not found",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: 'Task with id: "71675fcb655047cdc4955929" not found',
          },
        },
      },
    },
  },
};

const invalidTaskData = {
  description: "Invalid Data provided",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "All fields are required",
          },
        },
      },
    },
  },
};

const security = [
  {
    bearerAuth: [],
  },
];

const createTaskBody = {
  type: "object",
  properties: {
    title: {
      type: "string",
      example: "task title",
    },
    description: {
      type: "string",
      example: "description of the task",
    },
  },
};

const updateTaskBody = {
  type: "object",
  properties: {
    title: {
      type: "string",
      example: "task title",
    },
    description: {
      type: "string",
      example: "description of the task",
    },
  },
};

const createTask = {
  tags: ["Tasks"],
  description: "Create a new task in the system",
  operationId: "createTask",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createTaskBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "201": {
      description: "Task created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                example: "60564fcb544047cdc3844818",
              },
              title: {
                type: "string",
                example: "task title",
              },
              description: {
                type: "string",
                example: "description of the task",
              },
              createdAt: {
                type: "string",
                example: "2021-03-20T19:40:59.495Z",
              },
              updatedAt: {
                type: "string",
                example: "2021-03-20T21:23:10.879Z",
              },
            },
          },
        },
      },
    },
    "422": invalidTaskData,
    "500": internalServerError,
  },
};

const getTasks = {
  tags: ["Tasks"],
  description: "Retrieve all the tasks",
  operationId: "getTasks",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    "200": {
      description: "Tasks retrieved successfully!",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: taskResponse,
            },
          },
        },
      },
    },
    "500": internalServerError,
  },
};

const getTask = {
  tags: ["Tasks"],
  description: "Retrieve one task",
  operationId: "getTask",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Task ID",
      required: true,
      type: "string",
    },
  ],
  responses: {
    "200": {
      description: "Task retrieved successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: taskResponse,
          },
        },
      },
    },
    "404": taskNotFound,
    "500": internalServerError,
  },
};

const updateTask = {
  tags: ["Tasks"],
  description: "Update a task",
  operationId: "updateTask",
  security,
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Task ID",
      required: true,
      type: "string",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/updateTaskBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Task retrieved successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: taskResponse,
          },
        },
      },
    },
    "404": taskNotFound,
    "422": invalidTaskData,
    "500": internalServerError,
  },
};

const deleteTask = {
  tags: ["Tasks"],
  description: "Delete a task",
  operationId: "deleteTask",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Task ID",
      required: true,
      type: "string",
    },
  ],
  responses: {
    "200": {
      description: "Task deleted successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Task deleted successfully!",
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Internal Server Error",
              },
            },
          },
        },
      },
    },
  },
};

export {
  createTask,
  createTaskBody,
  deleteTask,
  getTasks,
  getTask,
  updateTaskBody,
  updateTask,
};
