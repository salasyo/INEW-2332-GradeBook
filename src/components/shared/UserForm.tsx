"use client"

import { userDefaultValues } from "@/constants";
import { userFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IUser } from "@/lib/mongo/models/user.model";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.actions";
import RoleDropdown from "./RoleDropdown";

type UserFormProps = {
  type: "Create" | "Update"
  user?: IUser,
  userId?: string
}

const UserForm = ({ type, user, userId }: UserFormProps) => {
  
  const initialValues = user && type === 'Update' ? user : userDefaultValues;
  //const router = useRouter();
  
  // Define your form.
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialValues
  })

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof userFormSchema>) {

    if (type === 'Update') {
      if(!userId) {
        console.log("No user provided");
        //router.back();
        return;
      }
      try {
        
        const clerkId = values.clerkId;

        const userObject = {
          email: values.email,
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          role: values.role
        }

        const updatedUser = await updateUser(clerkId, userObject)

        console.log(updatedUser);

      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 px-28 py-5">
          <FormField
            control={form.control}
            name="clerkId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Clerk Id:</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Clerk Id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name:</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name:</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username:</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          

          <FormField 
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Role:</FormLabel>
                <FormControl>
                  <RoleDropdown onChangeHandler={field.onChange} value={field.value} />
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
          {form.formState.isSubmitting ? ('Submitting...') : `${type} User`}
        </Button>
      </form>
    </Form>
  )
}

export default UserForm