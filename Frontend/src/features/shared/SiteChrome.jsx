import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";

const getInitial = (user) => (user?.email || user?.username || "U").charAt(0).toUpperCase();

export const Navbar = () => {
    const { user, handleLogout, loading } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await handleLogout();
            navigate("/");
        } catch {
            navigate("/");
        }
    };

    return (
        <nav className="border-b border-slate-800/80 bg-[#091321]/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
                <Link to="/" className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500 font-black text-white shadow-lg shadow-pink-500/20">N</span>
                    <span className="text-lg font-bold tracking-tight text-white">Nexa<span className="text-pink-400">Mind</span></span>
                </Link>

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <Link to="/app" className="hidden text-sm text-slate-400 transition hover:text-white sm:block">Workspace</Link>
                            <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
                                <span title={user.email} className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-bold text-white">{getInitial(user)}</span>
                                <span className="hidden max-w-32 truncate text-sm text-slate-300 md:block">{user.email}</span>
                                <button type="button" onClick={logout} disabled={loading} className="ml-1 text-sm text-slate-400 transition hover:text-pink-400 disabled:opacity-50">Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium text-slate-300 transition hover:text-white">Login</Link>
                            <Link to="/register" className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-400">Get started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export const Footer = () => (
    <footer className="border-t border-slate-800 bg-[#091321]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <p>© {new Date().getFullYear()} NexaMind. Prepare with clarity.</p>
            <p>AI-guided interview preparation</p>
        </div>
    </footer>
);

export const AppShell = ({ children }) => (
    <div className="min-h-screen bg-[#070d18] text-white">
        <Navbar />
        {children}
        <Footer />
    </div>
);
