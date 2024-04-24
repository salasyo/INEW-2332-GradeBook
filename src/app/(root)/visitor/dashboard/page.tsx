import { Button } from "@/components/ui/button";
import Link from "next/link";
 
export default function VisitorDashboard() {
  return (
    <>
      <section className="bg-primary-50 bg-contain py-5 md:py-10">
        <div className="wrapper gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col gap-8">
            <h1 className="h1-bold">Visitor Dashboard</h1>
            <div>
              <p className="flex-center p-regular-20 md:p-regular-24">
                Please choose from the following directory:
              </p>
            </div>
            
            <div className="flex flex-col flex-center gap-8">
              <Button size="lg" asChild className="button w-full sm:w-fit">
                <Link href="../../sections/view">
                  View Class Sections
                </Link>
              </Button>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}