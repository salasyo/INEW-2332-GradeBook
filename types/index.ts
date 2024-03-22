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
    startDate: Date
    endDate: Date
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

export type GetRelatedSectionsByClassParams = {
  categoryId: string
  eventId: string
  limit?: number
  page: number | string
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

