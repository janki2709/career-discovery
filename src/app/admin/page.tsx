export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="mt-6 grid gap-4">
        <a
          href="/admin/careers"
          className="rounded border p-4"
        >
          Careers
        </a>

        <a
          href="/admin/skills"
          className="rounded border p-4"
        >
          Skills
        </a>

        <a
          href="/admin/categories"
          className="rounded border p-4"
        >
          Categories
        </a>
      </div>
    </div>
  )
}