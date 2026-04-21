import {
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Share2,
  Bookmark,
  CheckCircle,
} from "lucide-react";

const JobDetails = () => {
  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Job Header Hero */}
      <div className="bg-white border-b border-slate-200 pt-10 pb-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex gap-6 items-start">
            <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-3xl font-bold text-brand-600 shadow-sm">
              S
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Senior Frontend Engineer
              </h1>
              <div className="text-lg font-medium text-brand-600 mb-4">
                Stripe
              </div>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg">
                  <MapPin size={16} /> Remote, US
                </span>
                <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg">
                  <DollarSign size={16} /> $140k - $180k
                </span>
                <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg">
                  <Briefcase size={16} /> Full-time
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
            <button className="p-3 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-3 rounded-xl border border-slate-200 text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition-colors">
              <Bookmark size={20} />
            </button>
            <button className="btn-primary flex-1 md:flex-none">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-10 flex flex-col lg:flex-row gap-10">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              About the Role
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We are looking for a Senior Frontend Engineer to join our core
              product team. You will be responsible for architecting and
              building highly scalable, interactive web applications that serve
              millions of users daily. If you are passionate about web
              performance, clean code, and creating magical user experiences, we
              want to talk to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Key Responsibilities
            </h2>
            <ul className="space-y-3">
              {[
                "Lead the development of new features in our React ecosystem.",
                "Collaborate with product designers to implement complex UI components.",
                "Optimize application performance for maximum speed and scalability.",
                "Mentor junior engineers and participate in code reviews.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <CheckCircle
                    size={20}
                    className="text-emerald-500 flex-shrink-0 mt-0.5"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sticky Sidebar Info */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Company Overview
            </h3>
            <div className="space-y-4 mb-6">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Founded
                </div>
                <div className="font-medium text-slate-900">2010</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Company Size
                </div>
                <div className="font-medium text-slate-900">
                  1,000 - 5,000 employees
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Industry
                </div>
                <div className="font-medium text-slate-900">
                  Financial Technology
                </div>
              </div>
            </div>
            <a
              href="#"
              className="block w-full py-2.5 text-center text-sm font-semibold text-brand-600 bg-brand-50 rounded-xl hover:bg-brand-100 transition-colors"
            >
              View Company Profile
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JobDetails;
