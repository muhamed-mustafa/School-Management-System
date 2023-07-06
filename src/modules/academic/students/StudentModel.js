import { model, Schema } from 'mongoose';
import { userSchema, UserSchema } from '@staff/common/UserModel.js';

class StudentSchema extends UserSchema {
  constructor() {
    super(
      {
        ...userSchema.obj,

        studentId: {
          type: String,
          required: true,
          default: function () {
            return (
              'STU' +
              Math.floor(100 + Math.random() * 900) +
              Date.now().toString().slice(2, 4) +
              this.name
                .split(' ')
                .map((name) => name[0])
                .join('')
                .toUpperCase()
            );
          },
        },

        role: {
          type: String,
          default: 'student',
        },

        classLevels: [{ type: String }],

        currentClassLevel: {
          type: String,

          default: function () {
            return this.classLevels[this.classLevels.length - 1];
          },
        },

        academicYear: {
          type: Schema.Types.ObjectId,
          ref: 'AcademicYear',
        },

        dateAdmitted: {
          type: Date,
          default: Date.now,
        },

        examResults: [{ type: Schema.Types.ObjectId, ref: 'ExamResult' }],

        program: {
          type: Schema.Types.ObjectId,
          ref: 'Program',
        },

        isPromotedToLevel200: {
          type: Boolean,
          default: false,
        },

        isPromotedToLevel300: {
          type: Boolean,
          default: false,
        },

        isPromotedToLevel400: {
          type: Boolean,
          default: false,
        },

        isGraduated: {
          type: Boolean,
          default: false,
        },

        isWithdrawn: {
          type: Boolean,
          default: false,
        },

        isSuspended: {
          type: Boolean,
          default: false,
        },

        prefectName: {
          type: String,
        },

        yearGraduated: { type: Date },
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

    this.pre('save', function (next) {
      this.role = 'student';
      next();
    });
  }
}

const studentSchema = new StudentSchema();
export const StudentModel = model('Student', studentSchema);
