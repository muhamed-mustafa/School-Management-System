import { Schema, model } from 'mongoose';

class AcademicTermSchema extends Schema {
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
          default: '3 months',
        },

        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'Admin',
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

const academicTermSchema = new AcademicTermSchema();
export const AcademicTermModel = model('AcademicTerm', academicTermSchema);
