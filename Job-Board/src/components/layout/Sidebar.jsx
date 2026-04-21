import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  FileText,
  Settings,
  Users,
  PlusCircle,
} from "lucide-react";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const candidateLinks = [
    { name: "Overview", icon: LayoutDashboard, path: "/candidate/dashboard" },
    { name: "Applied Jobs", icon: Briefcase, path: "/candidate/applications" },
    { name: "Saved Jobs", icon: Bookmark, path: "/candidate/saved" },
    { name: "My Resume", icon: FileText, path: "/candidate/resume" },
    { name: "Settings", icon: Settings, path: "/candidate/settings" },
  ];

  const employerLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/employer/dashboard" },
    { name: "Post a Job", icon: PlusCircle, path: "/employer/post-job" },
    { name: "Manage Jobs", icon: Briefcase, path: "/employer/manage-jobs" },
    { name: "Applicants", icon: Users, path: "/employer/applicants" },
    { name: "Settings", icon: Settings, path: "/employer/settings" },
  ];

  const links = user?.role === "employer" ? employerLinks : candidateLinks;

  if (!user) return null;

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white min-h-[calc(100vh-73px)] p-6 hidden lg:block">
      <div className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-50 text-brand-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Icon size={18} />
              {link.name}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
