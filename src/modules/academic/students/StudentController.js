import { Student } from '@academic/students/Student.js';
import { TokenResponseHandler } from '@root/utils/tokenHandler.js';
import asyncHandler from 'express-async-handler';
import i18n from 'i18n';
import { ErrorResponse } from '@root/utils/errorResponse.js';
import { ExamResult } from '@academic/exam-results/ExamResult.js';
import { Exam } from '@academic/exams/Exam.js';

class StudentController {
  static create = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      data: await Student.create(req.body),
      message: 'studentCreated',
      statusCode: 201,
      res,
    });
  });

  static login = asyncHandler(async (req, res) => {
    let student = await StudentController.getStudentByID(req.user.id);

    if (student.isWithdrawn)
      throw new Error(i18n.__('studentIsWithdrawn'), 400);

    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      message: 'studentLoggedIn',
      statusCode: 200,
      res,
    });
  });

  static getStudentProfile = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.user, {
      populate: 'examResults',
    });

    const studentProfile = {
      name: student?.name,
      email: student?.email,
      currentClassLevel: student?.currentClassLevel,
      program: student?.program,
      dateAdmitted: student?.dateAdmitted,
      isSuspended: student?.isSuspended,
      isWithdrawn: student?.isWithdrawn,
      studentId: student?.studentId,
      prefectName: student?.prefectName,
    };

    const currentExamResult =
      student.examResults[student.examResults.length - 1];

    const isPublished = currentExamResult?.isPublished;

    TokenResponseHandler.sendTokenResponse({
      message: 'profileOpened',
      statusCode: 200,
      res,
      req,
      data: {
        ...studentProfile,
        currentExamResult: isPublished ? currentExamResult : [],
      },
    });
  });

  static getAllStudents = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      users: res.advancedResults,
      message: 'studentsRetrievedSuccessfully',
      statusCode: 200,
      res,
    });
  });

  static getStudentByAdmin = asyncHandler(async (req, res) => {
    const student = await StudentController.getStudentByID(req.params.id);

    TokenResponseHandler.sendTokenResponse({
      data: student,
      message: 'studentRetrievedSuccessfully',
      statusCode: 200,
      res,
    });
  });

  static updateStudentProfile = asyncHandler(async (req, res) => {
    const student = await Student.updateOne(
      { _id: req.user._id },
      { $set: req.body },
      { new: true }
    );

    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      data: student,
      message: 'profileUpdateSuccess',
      statusCode: 200,
      res,
    });
  });

  static updateStudentPassword = asyncHandler(async (req, res) => {
    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      message: 'passwordUpdated',
      statusCode: 200,
      res,
    });
  });

  static updateStudentProfileByAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
      classLevels,
      name,
      email,
      academicYear,
      program,
      prefectName,
      isSuspended,
      isWithdrawn,
    } = req.body;

    let student = await StudentController.getStudentByID(id);
    if (student.isWithdrawn)
      throw new Error(i18n.__('studentIsWithdrawn'), 400);

    student = await Student.updateOne(
      { _id: id },
      {
        $set: {
          name,
          email,
          academicYear,
          program,
          prefectName,
          isSuspended,
          isWithdrawn,
        },
        $addToSet: { classLevels },
      },
      { new: true }
    );

    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      data: student,
      message: 'profileUpdateSuccess',
      statusCode: 200,
      res,
    });
  });

  static getStudentByID = async (id) => {
    return (
      (await Student.findById(id)) ||
      Promise.reject(new ErrorResponse(i18n.__('studentNotFound'), 400))
    );
  };

  static writeExam = asyncHandler(async (req, res) => {
    const { answers: studentAnswers } = req.body;

    const student = await StudentController.getStudentByID(req.user.id);

    if (student.isWithdrawn && student.isSuspended) {
      throw new ErrorResponse(i18n.__('suspensionMessage'), 400);
    }

    const exam = await Exam.findById(req.params.examID, {
      populate: ['questions', 'academicTerm'],
    });

    const { questions } = exam;

    let correctAnswers = 0;
    let wrongAnswers = 0;
    let score = 0;

    const answeredQuestions = questions.map((question, i) => {
      const isCorrect = question.correctAnswer === studentAnswers[i];

      if (isCorrect) {
        correctAnswers++;
        score++;
      } else {
        wrongAnswers++;
      }

      return {
        question: question.toObject().question,
        correctAnswer: question.toObject().correctAnswer,
        isCorrect,
      };
    });

    const grade = (correctAnswers / questions.length) * 100;

    const gradeThresholds = [
      { threshold: 80, remarks: 'Excellent' },
      { threshold: 70, remarks: 'Very Good' },
      { threshold: 60, remarks: 'Good' },
      { threshold: 50, remarks: 'Fair' },
    ];

    const { remarks } = gradeThresholds.find(
      ({ threshold }) => grade >= threshold
    ) || { remarks: 'Poor' };
    const status = grade >= 50 ? 'Pass' : 'Fail';

    const examResults = await ExamResult.create({
      student: student?.studentId,
      exam: exam?._id,
      grade,
      score,
      status,
      remarks,
      classLevel: exam?.classLevel,
      academicTerm: exam?.academicTerm,
      academicYear: exam?.academicYear,
      answeredQuestions,
    });

    await Student.updateOne(
      { _id: req.user.id },
      { $addToSet: { examResults: examResults._id } },
      { new: true }
    );

    const classLevelIncrements = {
      'Level 100': 'Level 200',
      'Level 200': 'Level 300',
      'Level 300': 'Level 400',
    };

    if (exam.academicTerm.name === '3rd term' && status === 'Pass') {
      const nextClassLevel = classLevelIncrements[student.currentClassLevel];

      if (nextClassLevel) {
        student.classLevels.push(nextClassLevel);
        student.currentClassLevel = nextClassLevel;
      } else {
        student.isGraduated = true;
        student.yearGraduated = new Date();
      }

      await student.save();
    }

    TokenResponseHandler.sendTokenResponse({
      user: req.user,
      message: 'submissionMessage',
      statusCode: 200,
      res,
      data: answeredQuestions,
    });
  });
}

export { StudentController };
