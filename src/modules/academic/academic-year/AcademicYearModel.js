import { Schema, model } from 'mongoose';

class AcademicYearSchema extends Schema {
  constructor() {
    super(
      {
        name: {
          type: String,
          required: true,
        },

        fromYear: {
          type: Date,
          required: true,
        },

        toYear: {
          type: Date,
          required: true,
        },

        isCurrent: {
          type: Boolean,
          default: false,
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

const academicYearSchema = new AcademicYearSchema();
export const AcademicYearModel = model('AcademicYear', academicYearSchema);
