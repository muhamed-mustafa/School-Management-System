import { Schema, model } from 'mongoose';

class ClassLevelSchema extends Schema {
  constructor() {
    super(
      {
        name: {
          type: String,
          required: true,
        },

        description: {
          type: String,
        },

        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'Admin',
          required: true,
        },

        students: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Student',
          },
        ],

        subjects: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Subject',
          },
        ],

        teachers: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Teacher',
          },
        ],
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

const classLevelSchema = new ClassLevelSchema();
export const ClassLevelModel = model('ClassLevel', classLevelSchema);
