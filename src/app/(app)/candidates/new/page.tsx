import { createCandidate } from "@/lib/actions/candidate";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NewCandidatePage() {
  async function action(formData: FormData) {
    "use server";
    await createCandidate(formData);
    redirect("/candidates");
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/candidates"
        className="text-sm text-gray-600 hover:text-gray-900"
      >
        ← Back to Candidates
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-8">
        Naya Candidate Add Karo
      </h1>

      <form action={action} className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            name="name"
            required
            className="input"
            placeholder="Ravi Kumar"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              className="input"
              placeholder="ravi@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              className="input"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="input"
              placeholder="Ahmedabad"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience (years)
            </label>
            <input
              type="number"
              name="experience"
              className="input"
              placeholder="3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills (comma separated)
          </label>
          <input
            type="text"
            name="skills"
            className="input"
            placeholder="React, TypeScript, Node.js"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resume / Bio
          </label>
          <textarea
            name="resumeText"
            rows={5}
            className="input"
            placeholder="Candidate ke baare mein detail..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" className="btn btn-primary">
            Add Candidate
          </button>
          <Link href="/candidates" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
