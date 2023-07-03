import { Schema, model } from 'mongoose';

class ExamSchema extends Schema {
  constructor() {
    super(
      {
        name: {
          type: String,
          required: true,
        },

        description: {
          type: String,
          required: true,
        },

        subject: {
          type: Schema.Types.ObjectId,
          ref: 'Subject',
          required: true,
        },

        program: {
          type: Schema.Types.ObjectId,
          ref: 'Program',
          required: true,
        },

        passMark: {
          type: Number,
          required: true,
          default: 50,
        },

        totalMark: {
          type: Number,
          required: true,
          default: 100,
        },

        academicTerm: {
          type: Schema.Types.ObjectId,
          ref: 'AcademicTerm',
          required: true,
        },

        duration: {
          type: String,
          required: true,
          default: '30 minutes',
        },

        examDate: {
          type: Date,
          required: true,
          default: Date.now(),
        },

        examTime: {
          type: String,
          required: true,
        },

        examType: {
          type: String,
          required: true,
          default: 'Quiz',
        },

        examStatus: {
          type: String,
          required: true,
          default: 'pending',
          enum: ['pending', 'live'],
        },

        questions: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Question',
          },
        ],

        classLevel: {
          type: Schema.Types.ObjectId,
          ref: 'ClassLevel',
          required: true,
        },

        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'Teacher',
          required: true,
        },

        academicYear: {
          type: Schema.Types.ObjectId,
          ref: 'AcademicYear',
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
        versionKey: false,
      }
    );
  }
}

const examSchema = new ExamSchema();
export const ExamModel = model('Exam', examSchema);
