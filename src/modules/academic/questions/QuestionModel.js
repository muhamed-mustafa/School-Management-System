import { Schema, model } from 'mongoose';

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },

    optionA: {
      type: String,
      required: true,
    },

    optionB: {
      type: String,
      required: true,
    },

    optionC: {
      type: String,
      required: true,
    },

    optionD: {
      type: String,
      required: true,
    },

    correctAnswer: {
      type: String,
      required: true,
    },

    isCorrect: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export const QuestionModel = model('Question', questionSchema);
