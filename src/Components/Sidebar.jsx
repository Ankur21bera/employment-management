import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  CalendarIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon
} from 'lucide-react';
import { useAuth } from '../Context/Authcontext';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, loading, logout } = useAuth();

  // ✅ directly use context user
  const userName = user ? `${user.email?.split("@")[0]}` : "";
  const role = user?.role;

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: UserIcon }
      : { name: "Attendance", href: "/attendance", icon: CalendarIcon },
    { name: "Leave", href: "/leave", icon: FileTextIcon },
    { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon }
  ];

  // ✅ FIXED LOGOUT
  const handleLogout = () => {
    logout();              // clear token + user
    navigate("/login");    // redirect
  };

  const sidebarContent = (
    <>
      {/* HEADER */}
      <div className='px-5 py-5 border-b border-white/10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-indigo-500/10 rounded-lg'>
              <UserIcon className='text-indigo-400 size-5' />
            </div>
            <div>
              <p className='text-sm font-semibold text-white'>EMS</p>
              <p className='text-xs text-slate-400'>Employee System</p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className='lg:hidden text-slate-400 hover:text-white'
          >
            <XIcon size={20} />
          </button>
        </div>
      </div>

      {/* USER CARD */}
      {user && (
        <div className='mx-4 mt-4 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-semibold'>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className='min-w-0'>
              <p className='text-sm font-medium text-white truncate'>
                {userName}
              </p>
              <p className='text-xs text-slate-400'>
                {role === "ADMIN" ? "Administrator" : "Employee"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* NAV */}
      <div className='px-5 mt-6 mb-2'>
        <p className='text-[10px] font-semibold uppercase tracking-widest text-slate-500'>
          Navigation
        </p>
      </div>

      <div className='flex-1 px-3 space-y-1 overflow-y-auto'>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
              ${isActive
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              <item.icon
                className={`w-[18px] h-[18px]
                ${isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-white"}`}
              />

              <span className='flex-1'>{item.name}</span>

              {isActive && (
                <ChevronRightIcon className='w-4 h-4 text-indigo-400' />
              )}
            </Link>
          );
        })}
      </div>

      {/* LOGOUT */}
      <div className='p-3 border-t border-white/10'>
        <button
          onClick={handleLogout}
          className='flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all'
        >
          <LogOutIcon className='w-[18px] h-[18px]' />
          <span>Log Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setMobileOpen(true)}
        className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow border border-white/10'
      >
        <MenuIcon size={20} />
      </button>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40'
        />
      )}

      {/* DESKTOP */}
      <aside className='hidden lg:flex flex-col h-screen w-64 bg-slate-950 text-white border-r border-white/10'>
        {sidebarContent}
      </aside>

      {/* MOBILE */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-slate-950 text-white z-50 flex flex-col transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;