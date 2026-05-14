// src/app/(app)/assessments/page.tsx

export default function AssessmentsPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
          🚀
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Assessments Coming Soon
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          We’re building personalized career assessments to help you discover
          your strengths, interests, and the perfect career path for you.
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          Stay tuned, something exciting is on the way ✨
        </p>
      </div>
    </div>
  );
}