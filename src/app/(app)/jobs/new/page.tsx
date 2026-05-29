import { createJob } from "@/lib/actions/job";
import Link from "next/link";

export default function NewJobPage() {
  return (
    <div className="max-w-2xl">
      <Link href="/jobs" className="text-sm text-gray-600 hover:text-gray-900">
        ← Back to Jobs
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-8">
        Nayi Job Banao
      </h1>

      <form action={createJob} className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title *
          </label>
          <input
            type="text"
            name="title"
            required
            className="input"
            placeholder="Senior Software Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            required
            rows={5}
            className="input"
            placeholder="Role ke baare mein detail mein likho..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            className="input"
            placeholder="Ahmedabad, Gujarat"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Required Skills (comma separated)
          </label>
          <input
            type="text"
            name="skills"
            className="input"
            placeholder="React, Node.js, TypeScript"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Salary (₹)
            </label>
            <input
              type="number"
              name="minSalary"
              className="input"
              placeholder="500000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Salary (₹)
            </label>
            <input
              type="number"
              name="maxSalary"
              className="input"
              placeholder="1000000"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" className="btn btn-primary">
            Job Banao
          </button>
          <Link href="/jobs" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
