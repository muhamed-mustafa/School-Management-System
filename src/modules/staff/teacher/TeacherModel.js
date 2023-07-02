import { model, Schema } from 'mongoose';
import { userSchema, UserSchema } from '@staff/common/UserModel.js';

class TeacherSchema extends UserSchema {
  constructor() {
    super(
      {
        ...userSchema.obj,

        dateEmployed: {
          type: Date,
          default: Date.now,
        },

        teacherId: {
          type: String,
          required: true,
          default: function () {
            return (
              'TEA' +
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

        isWithdrawn: {
          type: Boolean,
          default: false,
        },

        isSuspended: {
          type: Boolean,
          default: false,
        },

        subject: {
          type: Schema.Types.ObjectId,
          ref: 'Subject',
        },

        applicationStatus: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },

        program: {
          type: String,
        },

        classLevel: {
          type: String,
        },

        academicYear: {
          type: String,
        },

        examsCreated: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Exam',
          },
        ],

        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'Admin',
        },

        academicTerm: {
          type: String,
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

    this.pre('save', function (next) {
      this.role = 'teacher';
      next();
    });
  }
}

const teacherSchema = new TeacherSchema();
export const TeacherModel = model('Teacher', teacherSchema);
