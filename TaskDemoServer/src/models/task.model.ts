import mongoose, { Schema, Model, Document } from 'mongoose';

type TaskDocument = Document & {
  title: string;
  description: string;
};

type TaskInput = {
  title: TaskDocument['title'];
  description: TaskDocument['description']
};

const tasksSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    }
  },
  {
    collection: 'tasks',
    timestamps: true,
  },
);

const Task: Model<TaskDocument> = mongoose.model<TaskDocument>('Task', tasksSchema);

export { Task, TaskInput, tasksSchema };