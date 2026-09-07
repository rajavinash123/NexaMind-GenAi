import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Brain,
    BriefcaseBusiness,
    CheckCircle2,
    ChevronRight,
    Clock3,
    FileText,
    History,
    Sparkles,
    Target,
    Trash2,
    Upload,
    X,
    Zap,
} from "lucide-react";

import { useInterview } from "../hooks/useInterview.js";
import { AppShell } from "../../shared/SiteChrome";

const Home = () => {
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resume, setResume] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const {
        history,
        historyLoading,
        loading,
        generateReport,
        loadHistory,
    } = useInterview();

    useEffect(() => {
        loadHistory().catch(() =>
            setError("Could not load your report history.")
        );
    }, [loadHistory]);

    const handleResumeChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (file.type !== "application/pdf") {
            setError("Please upload a PDF resume.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Resume size must be less than 5MB.");
            return;
        }

        setError("");
        setResume(file);
    };

    const removeResume = () => {
        setResume(null);

        const input = document.getElementById("resume");

        if (input) {
            input.value = "";
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!jobDescription.trim()) {
            return setError("Please add the target job description.");
        }

        if (!resume && !selfDescription.trim()) {
            return setError(
                "Upload a PDF resume or add a self-description."
            );
        }

        try {
            const report = await generateReport({
                jobDescription,
                selfDescription,
                resume,
            });

            navigate(`/interview/${report._id}`);
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                    "Report generation failed. Please try again."
            );
        }
    };

    return (
        <AppShell>
            <div className="min-h-screen bg-[#060a13] text-white">

                {/* Background glow */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-pink-600/10 blur-[120px]" />
                    <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />
                </div>

                <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                    {/* HERO */}
                    <section className="mb-10">

                        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

                            <div className="max-w-3xl">

                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1.5 text-xs font-semibold text-pink-400">
                                    <Sparkles size={14} />
                                    AI Interview Preparation
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                    Prepare smarter.
                                    <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                        Interview with confidence.
                                    </span>
                                </h1>

                                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                                    Tell NexaMind about your target role and
                                    experience. We'll analyze your profile and
                                    create a personalized interview strategy.
                                </p>

                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                                <StatCard
                                    icon={Target}
                                    value={history.length}
                                    label="Reports"
                                />

                                <StatCard
                                    icon={Zap}
                                    value="AI"
                                    label="Powered"
                                />

                                <StatCard
                                    icon={Clock3}
                                    value="24/7"
                                    label="Practice"
                                />

                            </div>

                        </div>
                    </section>

                    {/* MAIN GRID */}
                    <div className="grid gap-8 xl:grid-cols-[1fr_360px]">

                        {/* GENERATOR */}
                        <section>

                            <form
                                onSubmit={handleSubmit}
                                className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0b111d] shadow-2xl shadow-black/20"
                            >

                                {/* Form Header */}
                                <div className="border-b border-slate-800 px-6 py-5 sm:px-8">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                                            <Brain size={21} />
                                        </div>

                                        <div>
                                            <h2 className="font-semibold">
                                                Generate Interview Strategy
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Takes less than a minute
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                <div className="p-6 sm:p-8">

                                    {/* JOB DESCRIPTION */}
                                    <div>

                                        <div className="mb-3 flex items-center justify-between">

                                            <div className="flex items-center gap-2">
                                                <BriefcaseBusiness
                                                    size={16}
                                                    className="text-pink-400"
                                                />

                                                <label className="text-sm font-semibold">
                                                    Target Job Description
                                                </label>

                                                <span className="rounded-md bg-pink-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-pink-400">
                                                    Required
                                                </span>
                                            </div>

                                            <span className="text-xs text-slate-500">
                                                {jobDescription.length}/5000
                                            </span>

                                        </div>

                                        <textarea
                                            value={jobDescription}
                                            onChange={(event) =>
                                                setJobDescription(
                                                    event.target.value
                                                )
                                            }
                                            maxLength={5000}
                                            rows={11}
                                            placeholder={`Paste the job description here...

Example:
• Required skills
• Responsibilities
• Experience
• Qualifications`}
                                            className="w-full resize-none rounded-xl border border-slate-800 bg-[#101827] p-5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-pink-500/70 focus:ring-2 focus:ring-pink-500/10"
                                        />

                                    </div>

                                    {/* PROFILE */}
                                    <div className="mt-8">

                                        <div className="mb-5">

                                            <div className="flex items-center gap-2">
                                                <FileText
                                                    size={16}
                                                    className="text-blue-400"
                                                />

                                                <h3 className="text-sm font-semibold">
                                                    Your Profile
                                                </h3>
                                            </div>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Provide your resume or describe
                                                your experience.
                                            </p>

                                        </div>

                                        <div className="grid gap-6 lg:grid-cols-2">

                                            {/* RESUME */}
                                            <div>

                                                <div className="mb-3 flex items-center justify-between">
                                                    <label className="text-sm font-medium">
                                                        Resume
                                                    </label>

                                                    <span className="rounded-md bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-400">
                                                        PDF • MAX 5MB
                                                    </span>
                                                </div>

                                                {!resume ? (
                                                    <label
                                                        htmlFor="resume"
                                                        className="group flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#101827] px-5 text-center transition hover:border-pink-500/60 hover:bg-[#121c2d]"
                                                    >

                                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 transition group-hover:scale-105">
                                                            <Upload size={22} />
                                                        </div>

                                                        <p className="text-sm font-medium">
                                                            Upload your resume
                                                        </p>

                                                        <p className="mt-2 text-xs text-slate-500">
                                                            Click to browse PDF
                                                        </p>

                                                    </label>
                                                ) : (
                                                    <div className="min-h-[180px] rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">

                                                        <div className="flex items-start justify-between">

                                                            <div className="flex gap-3">

                                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                                                                    <FileText size={21} />
                                                                </div>

                                                                <div className="min-w-0">
                                                                    <p className="truncate text-sm font-medium">
                                                                        {resume.name}
                                                                    </p>

                                                                    <p className="mt-1 text-xs text-slate-500">
                                                                        {(
                                                                            resume.size /
                                                                            1024 /
                                                                            1024
                                                                        ).toFixed(
                                                                            2
                                                                        )}{" "}
                                                                        MB
                                                                    </p>
                                                                </div>

                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    removeResume
                                                                }
                                                                className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                                                            >
                                                                <Trash2
                                                                    size={17}
                                                                />
                                                            </button>

                                                        </div>

                                                        <div className="mt-8 flex items-center gap-2 text-xs text-emerald-400">
                                                            <CheckCircle2
                                                                size={15}
                                                            />
                                                            Resume ready for
                                                            analysis
                                                        </div>

                                                    </div>
                                                )}

                                                <input
                                                    id="resume"
                                                    type="file"
                                                    accept=".pdf,application/pdf"
                                                    onChange={
                                                        handleResumeChange
                                                    }
                                                    className="hidden"
                                                />

                                            </div>

                                            {/* SELF DESCRIPTION */}
                                            <div>

                                                <div className="mb-3 flex items-center justify-between">
                                                    <label className="text-sm font-medium">
                                                        Self Description
                                                    </label>

                                                    <span className="text-[10px] uppercase tracking-wide text-slate-500">
                                                        Optional
                                                    </span>
                                                </div>

                                                <textarea
                                                    value={selfDescription}
                                                    onChange={(event) =>
                                                        setSelfDescription(
                                                            event.target.value
                                                        )
                                                    }
                                                    maxLength={2000}
                                                    rows={7}
                                                    placeholder="Describe your skills, projects, experience, education, and career goals..."
                                                    className="h-[180px] w-full resize-none rounded-xl border border-slate-800 bg-[#101827] p-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/10"
                                                />

                                                <div className="mt-2 text-right text-[11px] text-slate-600">
                                                    {selfDescription.length}/2000
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* FORM FOOTER */}
                                <div className="border-t border-slate-800 bg-[#09101b] px-6 py-5 sm:px-8">

                                    {error && (
                                        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                                            <X size={16} />
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Sparkles
                                                size={14}
                                                className="text-pink-400"
                                            />
                                            AI-generated personalized strategy
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-600/20 transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    Generate Strategy
                                                    <ArrowRight
                                                        size={17}
                                                        className="transition-transform group-hover:translate-x-1"
                                                    />
                                                </>
                                            )}
                                        </button>

                                    </div>

                                </div>

                            </form>

                        </section>

                        {/* RIGHT SIDEBAR */}
                        <aside className="space-y-5">

                            {/* HOW IT WORKS */}
                            <div className="rounded-2xl border border-slate-800 bg-[#0b111d] p-6">

                                <div className="mb-5 flex items-center gap-2">
                                    <Zap
                                        size={17}
                                        className="text-pink-400"
                                    />

                                    <h3 className="font-semibold">
                                        How it works
                                    </h3>
                                </div>

                                <div className="space-y-5">

                                    <ProcessStep
                                        number="01"
                                        title="Analyze the role"
                                        description="NexaMind extracts skills and expectations from the job description."
                                    />

                                    <ProcessStep
                                        number="02"
                                        title="Analyze your profile"
                                        description="Your resume and experience are compared against the target role."
                                    />

                                    <ProcessStep
                                        number="03"
                                        title="Build your strategy"
                                        description="Get questions, skill gaps and a focused preparation roadmap."
                                    />

                                </div>

                            </div>

                            {/* HISTORY */}
                            <div className="rounded-2xl border border-slate-800 bg-[#0b111d]">

                                <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

                                    <div className="flex items-center gap-2">
                                        <History
                                            size={17}
                                            className="text-blue-400"
                                        />

                                        <h3 className="text-sm font-semibold">
                                            Recent Reports
                                        </h3>
                                    </div>

                                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-400">
                                        {history.length}
                                    </span>

                                </div>

                                <div className="p-3">

                                    {historyLoading ? (
                                        <div className="p-5 text-center text-xs text-slate-500">
                                            Loading reports...
                                        </div>
                                    ) : history.length === 0 ? (
                                        <div className="px-4 py-8 text-center">

                                            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-500">
                                                <History size={19} />
                                            </div>

                                            <p className="text-sm text-slate-400">
                                                No reports yet
                                            </p>

                                            <p className="mt-1 text-xs text-slate-600">
                                                Your generated reports will
                                                appear here.
                                            </p>

                                        </div>
                                    ) : (
                                        <div className="space-y-2">

                                            {history
                                                .slice(0, 5)
                                                .map((item) => (
                                                    <button
                                                        key={item._id}
                                                        type="button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/interview/${item._id}`
                                                            )
                                                        }
                                                        className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-800/60"
                                                    >

                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                                                            <FileText
                                                                size={16}
                                                            />
                                                        </div>

                                                        <div className="min-w-0 flex-1">

                                                            <p className="truncate text-xs font-medium text-slate-200">
                                                                {item.title ||
                                                                    "Interview report"}
                                                            </p>

                                                            <p className="mt-1 text-[10px] text-slate-600">
                                                                {item.createdAt
                                                                    ? new Date(
                                                                          item.createdAt
                                                                      ).toLocaleDateString()
                                                                    : "Recently generated"}
                                                            </p>

                                                        </div>

                                                        <div className="flex items-center gap-1">

                                                            <span className="text-xs font-bold text-pink-400">
                                                                {item.matchScore ??
                                                                    0}
                                                                %
                                                            </span>

                                                            <ChevronRight
                                                                size={14}
                                                                className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-400"
                                                            />

                                                        </div>

                                                    </button>
                                                ))}

                                        </div>
                                    )}

                                </div>

                            </div>

                        </aside>

                    </div>

                    {/* BOTTOM VALUE STRIP */}
                    <section className="mt-8 grid gap-4 sm:grid-cols-3">

                        <ValueCard
                            icon={Target}
                            title="Role-focused"
                            description="Questions tailored to the job you're targeting."
                        />

                        <ValueCard
                            icon={Brain}
                            title="AI-powered"
                            description="Analyze your strengths and identify skill gaps."
                        />

                        <ValueCard
                            icon={CheckCircle2}
                            title="Actionable"
                            description="Follow a practical roadmap instead of guessing."
                        />

                    </section>

                </main>
            </div>
        </AppShell>
    );
};


/* ---------------- COMPONENTS ---------------- */

const StatCard = ({ icon: Icon, value, label }) => {
    return (
        <div className="rounded-xl border border-slate-800 bg-[#0b111d] px-4 py-3">
            <div className="flex items-center gap-2">
                <Icon size={14} className="text-pink-400" />
                <span className="text-lg font-bold">{value}</span>
            </div>

            <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-600">
                {label}
            </p>
        </div>
    );
};


const ProcessStep = ({ number, title, description }) => {
    return (
        <div className="flex gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-[10px] font-bold text-pink-400">
                {number}
            </div>

            <div>
                <h4 className="text-sm font-medium text-slate-200">
                    {title}
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                    {description}
                </p>
            </div>

        </div>
    );
};


const ValueCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-[#0b111d] p-5">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                <Icon size={18} />
            </div>

            <div>
                <h3 className="text-sm font-semibold">
                    {title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                    {description}
                </p>
            </div>

        </div>
    );
};


export default Home;