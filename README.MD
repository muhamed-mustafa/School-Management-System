# School Management System

The School Management System is a web-based application designed to streamline administrative tasks and enhance the management of academic years, terms, staff members, class levels, programs, subjects, and YearGroups in a school setting.

## Features

- **Admin Authentication**: Secure login system for administrators to access the system.
- **Academic Year Management**: Create, update, and delete academic years with validation for uniqueness and proper formatting of year names.
- **Academic Term Management**: Create, update, and delete academic terms with validation to prevent overlapping term dates and conflict resolution.
- **Staff Management**: Add, update, and delete staff members with data validation, password encryption, and efficient search capabilities.
- **Class Level Management**: Manage different class levels with CRUD operations, validation for level names, and handling class level conflicts.
- **Program Management**: Add, update, and delete programs with validation for program names and their association with class levels.
- **Subject Management**: Add, update, and delete subjects with validation for subject codes and their association with programs.
- **YearGroup Management**: Add, update, and delete YearGroups with validation for YearGroup names and their association with class levels.
- **Teacher Management**: Allow admins to add new teachers and manage their profiles, including association with programs, subjects, class levels, and academic years.
- **Exam Management**: Enable teachers to create, retrieve, update, and delete exams. Includes functionalities such as creating new exams, accessing specific exams, and
  updating/deleting existing exams.
- **Question Management**: Allow teachers to create, retrieve, update, and delete questions. Provides functionalities for creating new questions, accessing specific
  questions, and updating/deleting existing questions.
- **Student Management**: Enable admins to create students and manage student profiles. Allows students to log in and update their profiles.

## Project Structure

The project follows a modular structure for better organization and maintainability. Each folder within the project represents a separate module and contains the necessary files and sub-folders related to that module.

The School Management System project is built using object-oriented programming (OOP) principles to improve code structure, reusability, and maintainability. The project structure includes the following:

- `src`: Contains the source code of the project.
  - `modules`: Contains modules related to different management functionalities.
    - `admin`: Handles admin authentication and related functionality.
    - `academic`: Manages academic years, terms, yearGroups, classLevel, programs, and subjects.
    - `staff`: Handles staff management and related operations.
    - `teacher`: Allows admins to add new teachers and manage their profiles.
    - `exam`: Handles exam management, including creating, retrieving, updating, and deleting exams.
    - `question`: Manages questions, including creating, retrieving, updating, and deleting questions.
    - `student`: Handles student management, including student creation, profile management, and authentication.
  - `middlewares`: Contains middleware functions used throughout the application.
  - `utils`: Contains utility functions used across the project.
  - `app.js`: Entry point of the application.
  - `server.js`: File responsible for setting up and starting the server.

## Getting Started

To run the School Management System locally on your machine, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Configure the database connection and other environment variables.
4. Run the application: `npm start`
