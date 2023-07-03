import { AdminRoutes } from '@staff/admin/AdminRoutes.js';
import { AcademicYearRoutes } from '@academic/academic-year/AcademicYearRoutes.js';
import { AcademicTermRoutes } from '@academic/academic-term/AcademicTermRoutes.js';
import { ClassLevelRoutes } from '@academic/class-level/ClassLevelRoutes.js';
import { ProgramRoutes } from '@academic/program/ProgramRoutes.js';
import { SubjectRoutes } from '@academic/subjects/SubjectRoutes.js';
import { YearGroupRoutes } from '@academic/year-group/YearGroupRoutes.js';
import { TeacherRoutes } from '@staff/teacher/TeacherRoutes.js';
import { ExamRoutes } from '@academic/exams/ExamRoutes.js';
import { StudentRoutes } from '@academic/students/StudentRoutes.js';
import { QuestionRoutes } from '@academic/questions/QuestionRoutes.js';

class RouteManager {
  constructor(app) {
    this.app = app;
    this.adminRoutes = new AdminRoutes();
    this.academicYearRoutes = new AcademicYearRoutes();
    this.academicTermRoutes = new AcademicTermRoutes();
    this.classLevelRoutes = new ClassLevelRoutes();
    this.programRoutes = new ProgramRoutes();
    this.subjectRoutes = new SubjectRoutes();
    this.yearGroupRoutes = new YearGroupRoutes();
    this.teacherRoutes = new TeacherRoutes();
    this.examRoutes = new ExamRoutes();
    this.studentRoutes = new StudentRoutes();
    this.questionRoutes = new QuestionRoutes();
  }

  mountRoutes() {
    this.app.use('/api/v1/admin', this.adminRoutes.router);
    this.app.use('/api/v1/academic-year', this.academicYearRoutes.router);
    this.app.use('/api/v1/academic-term', this.academicTermRoutes.router);
    this.app.use('/api/v1/class-level', this.classLevelRoutes.router);
    this.app.use('/api/v1/program', this.programRoutes.router);
    this.app.use('/api/v1/subject', this.subjectRoutes.router);
    this.app.use('/api/v1/year-group', this.yearGroupRoutes.router);
    this.app.use('/api/v1/teacher', this.teacherRoutes.router);
    this.app.use('/api/v1/exam', this.examRoutes.router);
    this.app.use('/api/v1/question', this.questionRoutes.router);
    this.app.use('/api/v1/student', this.studentRoutes.router);
  }
}

export { RouteManager };
