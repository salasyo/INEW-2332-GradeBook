import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col gap-8">
            <h1 className="h1-bold">Welcome to the Database Management System of Some College!</h1>
            <p className="flex-center p-regular-20 md:p-regular-24 ">
              Please choose from the following directory:
            </p>

            <div className="flex flex-col flex-center gap-8">
              <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="/">
                Add/View Sections
              </Link>
            </Button>

            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="/">
                Add/View Students
              </Link>
            </Button>

            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="/">
                Add/View Instructors
              </Link>
            </Button>
            </div>

            
          </div>
        </div>
      </section>
    </>
  );
}

