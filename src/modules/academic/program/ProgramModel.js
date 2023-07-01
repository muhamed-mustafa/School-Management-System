import { Schema, model } from 'mongoose';

class ProgramSchema extends Schema {
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

        duration: {
          type: String,
          required: true,
          default: '4 years',
        },

        code: {
          type: String,
          default: function () {
            return (
              this.name
                .split(' ')
                .map((name) => name[0])
                .join('')
                .toUpperCase() +
              Math.floor(10 + Math.random() * 90) +
              Math.floor(10 + Math.random() * 90)
            );
          },
        },

        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'Admin',
          required: true,
        },

        teachers: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Teacher',
          },
        ],

        students: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            default: [],
          },
        ],

        subjects: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Subject',
            default: [],
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

const programSchema = new ProgramSchema();
export const ProgramModel = model('Program', programSchema);
