import {
  Briefcase,
  Bookmark,
  FileText,
  CheckCircle,
  Clock,
} from "lucide-react";

const DashboardOverview = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex justify-between items-center bg-gradient-to-r from-white to-brand-50">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Welcome back, James! 👋
          </h1>
          <p className="text-slate-500">
            Here is what's happening with your job search today.
          </p>
        </div>
        <button className="btn-primary hidden md:flex">Update Profile</button>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Briefcase size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">12</div>
            <div className="text-sm font-medium text-slate-500">
              Applied Jobs
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Bookmark size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">24</div>
            <div className="text-sm font-medium text-slate-500">Saved Jobs</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">85%</div>
            <div className="text-sm font-medium text-slate-500">
              Profile Strength
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Applications
          </h2>
          <button className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
                <th className="px-6 py-4">Job Title</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Date Applied</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">
                  Senior React Developer
                </td>
                <td className="px-6 py-4 text-slate-600">Stripe</td>
                <td className="px-6 py-4 text-slate-500">Oct 24, 2026</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                    <Clock size={12} /> In Review
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">
                  Product Designer
                </td>
                <td className="px-6 py-4 text-slate-600">Figma</td>
                <td className="px-6 py-4 text-slate-500">Oct 20, 2026</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <CheckCircle size={12} /> Interview
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
