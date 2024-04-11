"use client"

import { IAssignment } from "@/lib/mongo/models/assignment.model"
import { ISection } from "@/lib/mongo/models/section.model"
import { newGradeFormSchema } from "@/lib/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { IUser } from "@/lib/mongo/models/user.model"
import { createGrade } from "@/lib/actions/grade.actions"

type CreateGradeFormProps = {
  section: ISection,
  assignment: IAssignment,
  student: IUser
}

const CreateGradeForm = ({ section, assignment, student }: CreateGradeFormProps) => {
  const initialValues = {
    assignment: assignment._id,
    student: student._id,
    percentageScore: ''
  }

  // Define your form.
  const form = useForm<z.infer<typeof newGradeFormSchema>>({
    resolver: zodResolver(newGradeFormSchema),
    defaultValues: initialValues
  })

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof newGradeFormSchema>) {

    try {
      const calculatedPercent = "" + ((parseFloat(values.pointsEarned) / parseFloat(assignment.totalPoints)) * 100);
      
      const gradeObject = {
        assignmentId: values.assignment,
        studentId: values.student,
        percentageScore: calculatedPercent
      }

      const newAssignment = await createGrade(gradeObject);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 px-28 py-5">
          <FormField
            control={form.control}
            name="assignment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input disabled placeholder="Assignment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="student"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input disabled placeholder="Student" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pointsEarned"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Points Earned" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        
        <Button 
          type="submit" 
          size="lg" 
          disabled={form.formState.isSubmitting}
          className="button"
        >
          {form.formState.isSubmitting ? ('Submitting...') : ('Create Grade')}
        </Button>
      </form>
    </Form>
  )
}

export default CreateGradeForm