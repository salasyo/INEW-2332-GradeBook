
import { IGrade } from "@/lib/mongo/models/grade.model"
import { ISection } from "@/lib/mongo/models/section.model"

type IndividualGradeStudentViewProps = {
  section: ISection,
  grades: IGrade[],
}

const IndividualGradeStudentView = ({
  section,
  grades
}: IndividualGradeStudentViewProps) => {

  let sumOfPercScoresForSection = 0;
  let numOfScoresForSection = 0;
  let letterGrade = "";

  grades.map((grade) => {
    
    if (grade.section._id === section._id) {
      sumOfPercScoresForSection += parseFloat(grade.percentageScore);
      numOfScoresForSection += 1;
    }

    
  })

  const finalPercScore = Math.round(sumOfPercScoresForSection / numOfScoresForSection);

  if (finalPercScore <= 59) {
    letterGrade = "F"
  }
  else if (finalPercScore < 70) {
    letterGrade = "D"
  }
  else if (finalPercScore < 80) {
    letterGrade = "C"
  }
  else if (finalPercScore < 90) {
    letterGrade = "B"
  }
  else {
    letterGrade = "A"
  }

  return (
    <>
      Grade for Course: {finalPercScore}% ({letterGrade})
    </>
  )
}

export default IndividualGradeStudentView