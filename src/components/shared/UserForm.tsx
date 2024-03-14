"use client"

import { userDefaultValues } from "@/constants";
import { userFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IUser } from "@/lib/mongo/models/user.model";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.actions";

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

    console.log(values);
    //if (type === 'Update') {
    //  if(!userId) {
    //    console.log("No user provided");
    //    //router.back();
    //    return;
    //  }
    //  try {
    //    const userObject = {
    //      username: user?.username!,
    //      firstName: user?.firstName!,
    //      lastName: user?.lastName!,
    //      role: user?.role!
    //    }
    //    const updatedUser = await updateUser(userId, userObject)
    //    if (updatedUser) {
    //      form.reset();
    //    }
    //  } catch (error) {
    //    console.log(error);
    //  }
    //}
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
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 px-28 py-5">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
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
                <FormControl>
                  <Input placeholder="Username" {...field} />
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
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                <FormControl>
                  <Input placeholder="Role" {...field} />
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
          {form.formState.isSubmitting ? ('Submitting...') : `${type} Event`}
        </Button>
      </form>
    </Form>
  )
}

export default UserForm