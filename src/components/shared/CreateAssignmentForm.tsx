"use client"

import { ISection } from "@/lib/mongo/models/section.model"
import { newAssignmentFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createAssignment } from "@/lib/actions/assignment.actions";

type CreateAssignmentFormProps = {
  section: ISection,
  sectionId: string
}

const CreateAssignmentForm = ({ section, sectionId }: CreateAssignmentFormProps) => {
  const initialValues = {
    section: sectionId,
    name: '',
    description: '',
    totalPoints: '',
    dueDate: ''
  }

  // Define your form.
  const form = useForm<z.infer<typeof newAssignmentFormSchema>>({
    resolver: zodResolver(newAssignmentFormSchema),
    defaultValues: initialValues
  })

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof newAssignmentFormSchema>) {

    try {

      const assignmentObject = {
        assignment: {
          sectionId: values.section,
          name: values.name,
          description: values.description,
          totalPoints: values.totalPoints,
          dueDate: values.dueDate,
        }
      }

      const newAssignment = await createAssignment(assignmentObject);
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
            name="section"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input disabled placeholder="Section" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Assignment Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Assignment Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalPoints"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Total Points" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Due Date" {...field} />
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
          {form.formState.isSubmitting ? ('Submitting...') : ('Create Assignment')}
        </Button>
      </form>
    </Form>
  )
}

export default CreateAssignmentForm