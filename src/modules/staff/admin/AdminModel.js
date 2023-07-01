import { model, Schema } from 'mongoose';
import { userSchema, UserSchema } from '@staff/common/UserModel.js';

class AdminSchema extends UserSchema {
  constructor() {
    super(
      {
        ...userSchema.obj,

        academicTerms: [
          {
            type: Schema.Types.ObjectId,
            ref: 'AcademicTerm',
          },
        ],

        programs: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Program',
          },
        ],

        yearGroups: [
          {
            type: Schema.Types.ObjectId,
            ref: 'YearGroup',
          },
        ],

        academicYears: [
          {
            type: Schema.Types.ObjectId,
            ref: 'AcademicYear',
          },
        ],

        classLevels: [
          {
            type: Schema.Types.ObjectId,
            ref: 'ClassLevel',
          },
        ],

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

    this.pre(/^find/, function (next) {
      this.populate([{ path: 'academicYears', model: 'AcademicYear' }]);
      next();
    });

    this.pre('save', function (next) {
      this.role = 'admin';
      next();
    });
  }
}

const adminSchema = new AdminSchema();
export const AdminModel = model('Admin', adminSchema);
