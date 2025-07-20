"use client";
export default function StaffSection() {
  return (
    <section className="space-y-4 max-w-7xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Course Assistants</h3>
          <p className="text-sm text-muted-foreground">
            Manage assistants for this course
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-lg">Available Staff</h3>
        <p className="text-sm text-muted-foreground">
          Staff members who can be assigned to this course.
        </p>
      </div>
    </section>
  );
}