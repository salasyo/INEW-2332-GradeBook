"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ISection } from "@/lib/mongo/models/section.model";
import { createAttendanceRecord } from "@/lib/actions/attendance.actions";
import { Record, Status, StudentObject } from "../../../types";
import { newAttendanceRecordSchema } from "@/lib/validator";

type AttendanceFormProps = {
  enrolledStudents: StudentObject[],
  section: ISection,
  sectionId: string;
}

const AttendanceForm = ({ enrolledStudents, section, sectionId }: AttendanceFormProps) => {

  // Define your form.
  const form = useForm<z.infer<typeof newAttendanceRecordSchema>>({
    resolver: zodResolver(newAttendanceRecordSchema),
    defaultValues: {
      date: new Date(),
      className: section.class.name,
      classAbbr: section.subjectAbbr,
      classNumber: section.class.number,
      sectionNumber: section.sectionNumber
    }
  })

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof newAttendanceRecordSchema>) {
    try {

      let recordsObjArray: Record[] = [];

      values.records.map((record, index) => {
        recordsObjArray.push({
          studentId: enrolledStudents[index].studentId,
          firstName: enrolledStudents[index].firstName,
          lastName: enrolledStudents[index].lastName,
          status: record.status
        });
      })

      const attendanceRecordObj = {
        attendanceRecord: {
          date: values.date,
          sectionId: sectionId,
          className: values.className,
          classAbbr: values.classAbbr,
          classNumber: values.classNumber,
          sectionNumber: values.sectionNumber,
          records: recordsObjArray,
        }
      };

      const newAttendanceRecord = await createAttendanceRecord(attendanceRecordObj);
      form.reset();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="className"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input disabled placeholder="Class Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="classAbbr"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input disabled placeholder="Class Abbreviation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="classNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input disabled placeholder="Class Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sectionNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input disabled placeholder="Section Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {enrolledStudents.map((user, index) => (
          <div key={user.studentId} className="flex items-center justify-between">
            <span>{user.firstName} {user.lastName}</span>

            <FormField 
              control={form.control} 
              name={`records.${index}.status`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="input">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem  value={Status.Present} className="select-item p-regular-14">{Status.Present}</SelectItem>
                        <SelectItem  value={Status.Absent} className="select-item p-regular-14">{Status.Absent}</SelectItem>
                        <SelectItem  value={Status.Tardy} className="select-item p-regular-14">{Status.Tardy}</SelectItem>
                        <SelectItem  value={Status.Excused} className="select-item p-regular-14">{Status.Excused}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} 
            />
          </div>
        ))}

        <Button 
          type="submit" 
          size="lg" 
          disabled={form.formState.isSubmitting}
          className="button"
        >
          {form.formState.isSubmitting ? ('Submitting...') : ('Submit Attendance')}
        </Button>
      </form>
    </Form>
  );
};

export default AttendanceForm;
