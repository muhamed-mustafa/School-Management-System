import { Schema, model } from 'mongoose';

class YearGroupSchema extends Schema {
  constructor() {
    super(
      {
        name: {
          type: String,
          required: true,
        },

        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'Admin',
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

const yearGroupSchema = new YearGroupSchema();
export const YearGroupModel = model('YearGroup', yearGroupSchema);
