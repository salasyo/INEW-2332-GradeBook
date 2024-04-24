import { IEnrollment } from "@/lib/mongo/models/enrollment.model";
import { IGrade } from "@/lib/mongo/models/grade.model"

type CurrentSemesterGPAViewProps = {
  enrollments: IEnrollment[],
  grades: IGrade[],
}

const CurrentSemesterGPAView = ({
  enrollments,
  grades
}: CurrentSemesterGPAViewProps) => {

  const filterEnrollments = (enrollments: IEnrollment[]) => {
    let currentEnrollmentArray: IEnrollment[] = [];

    enrollments.map((enrollment) => {
      if (enrollment.section.semester == "SP-2024 (Jan 16 - May 9)") {
        currentEnrollmentArray.push(enrollment);
      }
    })

    return currentEnrollmentArray
  }

  const filterGrades = (grades: IGrade[]) => {
    let currentGradeArray: IGrade[] = [];

    grades.map((grade) => {
      if (grade.section.semester == "SP-2024 (Jan 16 - May 9)") {
        currentGradeArray.push(grade);
      }
    })

    return currentGradeArray
  }

  const currentEnrollments = filterEnrollments(enrollments);
  const currentGrades = filterGrades(grades);

  let totalPercScoresForCurrentEnrollmentsArray: number[] = [];

  currentEnrollments.map((enrollment) => {
    
    let sumOfCurrentEnrollmentAssignmentScores = 0;
    let numOfScoresForCurrentEnrollment = 0;

    currentGrades.map((grade) => {
      if (enrollment.section._id === grade.section._id) {
        sumOfCurrentEnrollmentAssignmentScores += parseFloat(grade.percentageScore);
        numOfScoresForCurrentEnrollment += 1;
      }
    })

    const averagePercScoreForCurrentEnrollment = sumOfCurrentEnrollmentAssignmentScores / numOfScoresForCurrentEnrollment;

    totalPercScoresForCurrentEnrollmentsArray.push(averagePercScoreForCurrentEnrollment);
  })

  let sumOfTotalsForCurrentSemester = 0;
  const numOfTotalsForCurrentSemester = totalPercScoresForCurrentEnrollmentsArray.length;

  totalPercScoresForCurrentEnrollmentsArray.map((percScore) => {
    sumOfTotalsForCurrentSemester += percScore;
  })

  const semesterPercentage = sumOfTotalsForCurrentSemester / numOfTotalsForCurrentSemester;
  const semesterGPA = 4 * (semesterPercentage / 100);

  return (
    <>
      {semesterGPA.toFixed(2)}
    </>
  )
}

export default CurrentSemesterGPAView