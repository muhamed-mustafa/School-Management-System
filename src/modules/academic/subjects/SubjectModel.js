import { Schema, model } from 'mongoose';

class SubjectSchema extends Schema {
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

        teacher: {
          type: Schema.Types.ObjectId,
          ref: 'Teacher',
        },

        academicTerm: {
          type: Schema.Types.ObjectId,
          ref: 'AcademicTerm',
          required: true,
        },

        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'Admin',
          required: true,
        },

        duration: {
          type: String,
          required: true,
          default: '3 months',
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

const subjectSchema = new SubjectSchema();
export const SubjectModel = model('Subject', subjectSchema);
