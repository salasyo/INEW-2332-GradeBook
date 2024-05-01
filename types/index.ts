// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string
  username: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export type AdminCreateUserParams = {
  emailAddress: string[]
  username: string
  password: string
  firstName: string
  lastName: string
}

export type UpdateUserParams = {
  username: string
  firstName: string
  lastName: string
  role: string
}

export type GetAllUsersParams = {
  query: string
  userType: string
  limit: number
  page: number
}

export type GetAllInstructorUserParams = {
  limit: number
  page: number
}

// ====== SECTION PARAMS
export type CreateSectionParams = {
  section: {
    sectionNumber: string;
    classId: string;
    meetingDays: string
    startTime: string
    endTime: string
    semester: string
    roomNumber: string
    instructorId: string
  }
}

export type UpdateSectionParams = {
  section: {
    _id: string
    title: string
    imageUrl: string
    description: string
    location: string
    startDateTime: Date
    endDateTime: Date
    categoryId: string
    price: string
    isFree: boolean
    url: string
  }
}

export type DeleteSectionParams = {
  eventId: string
  path: string
}

export type GetAllSectionsParams = {
  query: string
  classType: string
  limit: number
  page: number
}

export type GetInstructorSectionsParams = {
  instructorId: string
  limit: number
  page: number
}

export type GetRelatedSectionsByClassParams = {
  categoryId: string
  eventId: string
  limit?: number
  page: number | string
}

export type GetSectionsBySemesterParams = {
  semester: string
}

// =========== ENROLLMENT PARAMS
export type CreateEnrollmentParams = {
  sectionId: string,
  studentId: string
}

export type GetEnrollmentsByUserParams = {
  userId: string | null
  limit?: number
  page: number | number | null
}

// =========== CLASS PARAMS
export type GetClassesBySubjectParams = {
  subject: string,
  limit: number,
  page: number
}

// =========== ASSIGNMENT PARAMS
export type CreateAssignmentParams = {
  assignment: {
    sectionId: string;
    name: string;
    description: string;
    totalPoints: string;
    dueDate: string;
  }
}

export type GetAssignmentsBySectionParams = {
  sectionId: string
}

// =========== GRADE PARAMS
export type CreateGradeParams = {
  assignmentId: string;
  studentId: string;
  sectionId: string;
  percentageScore: string;
}

// =========== ATTENDANCE PARAMS
export enum Status {
  Present = "Present",
  Absent = "Absent",
  Tardy = "Tardy",
  Excused = "Excused"
}

export type StudentObject = {
  studentId: string,
  firstName: string,
  lastName: string
}

export type Record = {
  studentId: string;
  firstName: string;
  lastName: string;
  status: string;
}

export type CreateAttendanceRecordParams = {
  attendanceRecord: {
    date: Date;
    sectionId: string;
    className: string;
    classAbbr: string;
    classNumber: string;
    sectionNumber: string;
    records: Record[];
  }
}

