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

  let totalPercScoresForAllEnrollmentsArray: string | number[] = [];

  enrollments.map((enrollment) => {
    
    let sumOfAssignmentScoresForThisEnrollment = 0;
    let numOfScoresForThisEnrollment = 0;

    grades.map((grade) => {
      if (enrollment.section._id === grade.section._id) {
        sumOfAssignmentScoresForThisEnrollment += parseFloat(grade.percentageScore);
        numOfScoresForThisEnrollment += 1;
      }
    })

    const averagePercScoreForThisEnrollment = sumOfAssignmentScoresForThisEnrollment / numOfScoresForThisEnrollment;

    totalPercScoresForAllEnrollmentsArray.push(averagePercScoreForThisEnrollment);
  })

  let sumOfTotalsForAllTime = 0;
  const numOfTotalsForAllTime = totalPercScoresForAllEnrollmentsArray.length;

  totalPercScoresForAllEnrollmentsArray.map((percScore) => {
    sumOfTotalsForAllTime += percScore;
  })

  const semesterPercentage = sumOfTotalsForAllTime / numOfTotalsForAllTime;
  const semesterGPA = 4 * (semesterPercentage / 100);

  return (
    <>
      {semesterGPA.toFixed(2)}
    </>
  )
}

export default CurrentSemesterGPAView