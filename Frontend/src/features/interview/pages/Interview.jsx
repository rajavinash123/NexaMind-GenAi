import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Brain,
    CheckCircle2,
    ChevronDown,
    Clock3,
    Download,
    FileText,
    MessageCircle,
    Sparkles,
    Target,
    TrendingUp,
    AlertTriangle,
    BookOpen,
    CircleDot,
    Loader2,
} from "lucide-react";

import { useInterview } from "../hooks/useInterview.js";
import { useParams, useNavigate } from "react-router-dom";
import { AppShell } from "../../shared/SiteChrome";


// ============================================================
// NAVIGATION ITEMS
// ============================================================

const NAV_ITEMS = [
    {
        id: "technical",
        label: "Technical Questions",
        icon: Brain,
    },
    {
        id: "behavioral",
        label: "Behavioral Questions",
        icon: MessageCircle,
    },
    {
        id: "roadmap",
        label: "Preparation Roadmap",
        icon: BookOpen,
    },
];


// ============================================================
// QUESTION CARD
// ============================================================

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false);

    return (
        <article
            className={`overflow-hidden rounded-2xl border transition ${
                open
                    ? "border-pink-500/30 bg-[#0d1524]"
                    : "border-white/10 bg-[#0b111d]"
            }`}
        >
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-white/[0.02]"
            >
                {/* Number */}
                <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        open
                            ? "bg-pink-500 text-white"
                            : "bg-pink-500/10 text-pink-400"
                    }`}
                >
                    {String(index + 1).padStart(2, "0")}
                </div>

                {/* Question */}
                <p className="flex-1 text-sm font-medium leading-6 text-slate-200">
                    {item.question}
                </p>

                {/* Chevron */}
                <ChevronDown
                    size={18}
                    className={`shrink-0 text-slate-500 transition-transform ${
                        open ? "rotate-180 text-pink-400" : ""
                    }`}
                />
            </button>

            {open && (
                <div className="border-t border-white/10 px-5 py-6">

                    {/* Intention */}
                    <div className="rounded-xl border border-blue-500/10 bg-blue-500/[0.03] p-4">

                        <div className="flex items-center gap-2">
                            <Target
                                size={15}
                                className="text-blue-400"
                            />

                            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                                What the interviewer is testing
                            </span>
                        </div>

                        <p className="mt-3 text-sm leading-7 text-slate-400">
                            {item.intention ||
                                "This question evaluates your understanding and practical experience."}
                        </p>

                    </div>

                    {/* Answer */}
                    <div className="mt-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-4">

                        <div className="flex items-center gap-2">
                            <CheckCircle2
                                size={15}
                                className="text-emerald-400"
                            />

                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                Model answer
                            </span>
                        </div>

                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-400">
                            {item.answer ||
                                "Prepare a concise answer using your own project and professional experience."}
                        </p>

                    </div>
                </div>
            )}
        </article>
    );
};


// ============================================================
// ROADMAP CARD
// ============================================================

const RoadMapDay = ({ day, index, total }) => {
    return (
        <div className="relative flex gap-5">

            {/* Timeline */}
            <div className="flex flex-col items-center">

                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-pink-500/20 bg-pink-500/10 text-xs font-bold text-pink-400">
                    {String(day.day).padStart(2, "0")}
                </div>

                {index !== total - 1 && (
                    <div className="mt-2 h-full w-px bg-white/10" />
                )}

            </div>

            {/* Content */}
            <div className="mb-6 flex-1 rounded-2xl border border-white/10 bg-[#0b111d] p-5">

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-pink-400">
                            Day {day.day}
                        </p>

                        <h3 className="mt-1 text-base font-semibold text-white">
                            {day.focus}
                        </h3>
                    </div>

                    <span className="w-fit rounded-full bg-white/5 px-3 py-1 text-[10px] text-slate-500">
                        {day.tasks?.length || 0} tasks
                    </span>

                </div>

                <div className="mt-5 space-y-3">

                    {(day.tasks || []).map((task, taskIndex) => (
                        <div
                            key={taskIndex}
                            className="flex items-start gap-3 rounded-xl bg-white/[0.02] p-3"
                        >
                            <CheckCircle2
                                size={15}
                                className="mt-0.5 shrink-0 text-slate-600"
                            />

                            <p className="text-sm leading-6 text-slate-400">
                                {task}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};


// ============================================================
// SCORE COMPONENT
// ============================================================

const MatchScore = ({ score }) => {

    const scoreValue = Number(score || 0);

    const scoreType =
        scoreValue >= 80
            ? {
                  label: "Excellent match",
                  text: "text-emerald-400",
                  border: "border-emerald-400",
                  bg: "bg-emerald-500/10",
              }
            : scoreValue >= 60
              ? {
                    label: "Good match",
                    text: "text-yellow-400",
                    border: "border-yellow-400",
                    bg: "bg-yellow-500/10",
                }
              : {
                    label: "Needs improvement",
                    text: "text-red-400",
                    border: "border-red-400",
                    bg: "bg-red-500/10",
                };

    return (
        <div className="rounded-2xl border border-white/10 bg-[#0b111d] p-6">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Profile match
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                        Resume vs target role
                    </p>
                </div>

                <TrendingUp
                    size={19}
                    className={scoreType.text}
                />

            </div>

            <div className="mt-7 flex items-center justify-center">

                <div
                    className={`flex h-36 w-36 items-center justify-center rounded-full border-[10px] ${scoreType.border}`}
                >
                    <div className="text-center">

                        <span className="text-4xl font-black text-white">
                            {scoreValue}
                        </span>

                        <span className="text-sm text-slate-500">
                            %
                        </span>

                    </div>
                </div>

            </div>

            <div
                className={`mx-auto mt-5 w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${scoreType.bg} ${scoreType.text}`}
            >
                {scoreType.label}
            </div>

        </div>
    );
};


// ============================================================
// SKILL GAPS
// ============================================================

const SkillGaps = ({ gaps }) => {

    if (!gaps?.length) {
        return (
            <div className="rounded-2xl border border-emerald-500/10 bg-[#0b111d] p-5">

                <div className="flex items-center gap-2">
                    <CheckCircle2
                        size={16}
                        className="text-emerald-400"
                    />

                    <p className="text-sm font-semibold text-white">
                        No major skill gaps
                    </p>
                </div>

                <p className="mt-2 text-xs leading-6 text-slate-600">
                    Your profile appears well aligned with this role.
                </p>

            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-[#0b111d] p-5">

            <div className="flex items-center gap-2">

                <AlertTriangle
                    size={16}
                    className="text-yellow-400"
                />

                <p className="text-sm font-semibold text-white">
                    Skill gaps
                </p>

            </div>

            <p className="mt-1 text-xs text-slate-600">
                Areas worth improving before the interview.
            </p>

            <div className="mt-5 space-y-2">

                {gaps.map((gap, index) => {

                    const severity = gap.severity?.toLowerCase();

                    const style =
                        severity === "high"
                            ? "border-red-500/10 bg-red-500/5 text-red-400"
                            : severity === "medium"
                              ? "border-yellow-500/10 bg-yellow-500/5 text-yellow-400"
                              : "border-emerald-500/10 bg-emerald-500/5 text-emerald-400";

                    return (
                        <div
                            key={index}
                            className={`flex items-center justify-between rounded-xl border px-3 py-3 ${style}`}
                        >

                            <span className="text-xs font-medium">
                                {gap.skill}
                            </span>

                            {gap.severity && (
                                <span className="text-[9px] font-bold uppercase tracking-wider">
                                    {gap.severity}
                                </span>
                            )}

                        </div>
                    );
                })}

            </div>
        </div>
    );
};


// ============================================================
// MAIN COMPONENT
// ============================================================

const Interview = () => {

    const [activeNav, setActiveNav] = useState("technical");

    const {
        report,
        getReportById,
        loading,
        getResumePdf,
    } = useInterview();

    const { interviewId } = useParams();
    const navigate = useNavigate();

    const reportTitle =
        report?.title || "Interview preparation report";


    // ========================================================
    // LOAD REPORT
    // ========================================================

    useEffect(() => {

        if (interviewId) {
            getReportById(interviewId).catch(() => undefined);
        }

    }, [interviewId, getReportById]);


    // ========================================================
    // LOADING
    // ========================================================

    if (loading || !report) {

        return (
            <main className="flex min-h-screen items-center justify-center bg-[#060a13] text-white">

                <div className="text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10">
                        <Loader2
                            size={22}
                            className="animate-spin text-pink-500"
                        />
                    </div>

                    <h1 className="mt-5 text-sm font-semibold">
                        Loading your interview strategy...
                    </h1>

                    <p className="mt-2 text-xs text-slate-600">
                        Preparing your personalized report
                    </p>

                </div>

            </main>
        );
    }


    const technicalQuestions =
        report.technicalQuestion || [];

    const behavioralQuestions =
        report.behaviourQuestion || [];

    const preparationPlan =
        report.preparationPlan || [];

    const skillGaps =
        report.skillGap || [];


    return (
        <AppShell>

            <div className="min-h-screen bg-[#060a13] text-white">

                {/* =================================================
                    TOP REPORT BAR
                ================================================= */}

                <div className="border-b border-white/10 bg-[#080d17]">

                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">

                        <button
                            type="button"
                            onClick={() => navigate("/app")}
                            className="flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
                        >
                            <ArrowLeft size={16} />
                            Back to workspace
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                getResumePdf(interviewId)
                            }
                            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-pink-500/30 hover:text-white"
                        >
                            <Download size={15} />
                            <span className="hidden sm:block">
                                Download Resume
                            </span>
                        </button>

                    </div>

                </div>


                {/* =================================================
                    LAYOUT
                ================================================= */}

                <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">


                    {/* =================================================
                        LEFT NAVIGATION
                    ================================================= */}

                    <aside className="border-b border-white/10 bg-[#080d17] lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">

                        <div className="p-4 lg:sticky lg:top-0 lg:p-5">

                            <div className="mb-4 hidden lg:block">

                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                                    Report sections
                                </p>

                            </div>

                            <div className="flex gap-2 overflow-x-auto lg:flex-col">

                                {NAV_ITEMS.map((item) => {

                                    const Icon = item.icon;

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() =>
                                                setActiveNav(item.id)
                                            }
                                            className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                                                activeNav === item.id
                                                    ? "bg-pink-500/10 text-pink-400"
                                                    : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-200"
                                            }`}
                                        >

                                            <Icon size={17} />

                                            <span>
                                                {item.label}
                                            </span>

                                        </button>
                                    );
                                })}

                            </div>

                        </div>

                    </aside>


                    {/* =================================================
                        CENTER
                    ================================================= */}

                    <main className="min-w-0 flex-1 px-5 py-8 lg:px-8">


                        {/* REPORT HEADER */}
                        <header className="mb-8">

                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">

                                <Sparkles size={14} />

                                AI-generated interview plan

                            </div>

                            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                {reportTitle}
                            </h1>

                            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600">

                                <span className="flex items-center gap-1.5">
                                    <Clock3 size={13} />

                                    {report.createdAt
                                        ? new Date(
                                              report.createdAt
                                          ).toLocaleString()
                                        : "Recently generated"}
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <FileText size={13} />

                                    {technicalQuestions.length +
                                        behavioralQuestions.length}{" "}
                                    questions
                                </span>

                            </div>

                        </header>


                        {/* ROLE + PROFILE */}
                        <div className="mb-10 grid gap-4 md:grid-cols-2">

                            <InfoCard
                                icon={<Target size={17} />}
                                label="Target role"
                                content={report.jobDescription}
                                color="pink"
                            />

                            <InfoCard
                                icon={<FileText size={17} />}
                                label="Candidate profile"
                                content={
                                    report.selfDescription ||
                                    "Profile details were extracted from your uploaded resume."
                                }
                                color="blue"
                            />

                        </div>


                        {/* =================================================
                            TECHNICAL QUESTIONS
                        ================================================= */}

                        {activeNav === "technical" && (

                            <section>

                                <SectionHeader
                                    icon={<Brain size={19} />}
                                    title="Technical Questions"
                                    description="Practice questions generated specifically for your target role."
                                    count={technicalQuestions.length}
                                />

                                {technicalQuestions.length === 0 ? (

                                    <EmptyState text="No technical questions were generated." />

                                ) : (

                                    <div className="space-y-3">

                                        {technicalQuestions.map(
                                            (question, index) => (
                                                <QuestionCard
                                                    key={index}
                                                    item={question}
                                                    index={index}
                                                />
                                            )
                                        )}

                                    </div>
                                )}

                            </section>
                        )}


                        {/* =================================================
                            BEHAVIORAL QUESTIONS
                        ================================================= */}

                        {activeNav === "behavioral" && (

                            <section>

                                <SectionHeader
                                    icon={<MessageCircle size={19} />}
                                    title="Behavioral Questions"
                                    description="Prepare answers that connect your experience to common interview situations."
                                    count={behavioralQuestions.length}
                                />

                                {behavioralQuestions.length === 0 ? (

                                    <EmptyState text="No behavioral questions were generated." />

                                ) : (

                                    <div className="space-y-3">

                                        {behavioralQuestions.map(
                                            (question, index) => (
                                                <QuestionCard
                                                    key={index}
                                                    item={question}
                                                    index={index}
                                                />
                                            )
                                        )}

                                    </div>
                                )}

                            </section>
                        )}


                        {/* =================================================
                            ROADMAP
                        ================================================= */}

                        {activeNav === "roadmap" && (

                            <section>

                                <SectionHeader
                                    icon={<BookOpen size={19} />}
                                    title="Preparation Roadmap"
                                    description="Follow this focused plan to close your biggest gaps before the interview."
                                    count={preparationPlan.length}
                                    countLabel="days"
                                />

                                {preparationPlan.length === 0 ? (

                                    <EmptyState text="No preparation roadmap was generated." />

                                ) : (

                                    <div className="mt-2">

                                        {preparationPlan.map(
                                            (day, index) => (
                                                <RoadMapDay
                                                    key={day.day || index}
                                                    day={day}
                                                    index={index}
                                                    total={
                                                        preparationPlan.length
                                                    }
                                                />
                                            )
                                        )}

                                    </div>
                                )}

                            </section>
                        )}

                    </main>


                    {/* =================================================
                        RIGHT INSIGHTS
                    ================================================= */}

                    <aside className="hidden w-72 shrink-0 border-l border-white/10 bg-[#080d17] p-5 xl:block">

                        <div className="sticky top-5 space-y-4">

                            <MatchScore
                                score={report.matchScore}
                            />

                            <SkillGaps gaps={skillGaps} />

                            {/* Quick Stats */}
                            <div className="rounded-2xl border border-white/10 bg-[#0b111d] p-5">

                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Report overview
                                </p>

                                <div className="mt-4 space-y-3">

                                    <OverviewRow
                                        label="Technical"
                                        value={
                                            technicalQuestions.length
                                        }
                                    />

                                    <OverviewRow
                                        label="Behavioral"
                                        value={
                                            behavioralQuestions.length
                                        }
                                    />

                                    <OverviewRow
                                        label="Preparation days"
                                        value={
                                            preparationPlan.length
                                        }
                                    />

                                    <OverviewRow
                                        label="Skill gaps"
                                        value={
                                            skillGaps.length
                                        }
                                    />

                                </div>

                            </div>


                            {/* CTA */}
                            <div className="rounded-2xl border border-pink-500/20 bg-pink-500/[0.04] p-5">

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400">
                                    <Sparkles size={17} />
                                </div>

                                <h3 className="mt-4 text-sm font-semibold text-white">
                                    Ready to practice?
                                </h3>

                                <p className="mt-2 text-xs leading-6 text-slate-600">
                                    Review your questions and work through
                                    the roadmap before your interview.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveNav("technical")
                                    }
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-pink-500"
                                >
                                    Start practicing
                                    <ArrowRight size={14} />
                                </button>

                            </div>

                        </div>

                    </aside>

                </div>

            </div>

        </AppShell>
    );
};


// ============================================================
// INFO CARD
// ============================================================

const InfoCard = ({
    icon,
    label,
    content,
    color = "pink",
}) => {

    const iconStyle =
        color === "blue"
            ? "bg-blue-500/10 text-blue-400"
            : "bg-pink-500/10 text-pink-400";

    return (
        <div className="rounded-2xl border border-white/10 bg-[#0b111d] p-5">

            <div className="flex items-center gap-3">

                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconStyle}`}
                >
                    {icon}
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {label}
                </p>

            </div>

            <p className="mt-4 max-h-32 overflow-auto whitespace-pre-wrap text-sm leading-7 text-slate-400">
                {content}
            </p>

        </div>
    );
};


// ============================================================
// SECTION HEADER
// ============================================================

const SectionHeader = ({
    icon,
    title,
    description,
    count,
    countLabel = "questions",
}) => {

    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

                <div className="flex items-center gap-2 text-pink-400">
                    {icon}

                    <span className="text-xs font-semibold uppercase tracking-wider">
                        Interview preparation
                    </span>
                </div>

                <h2 className="mt-2 text-2xl font-bold text-white">
                    {title}
                </h2>

                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                    {description}
                </p>

            </div>

            <span className="w-fit rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-500">
                {count} {countLabel}
            </span>

        </div>
    );
};


// ============================================================
// OVERVIEW ROW
// ============================================================

const OverviewRow = ({ label, value }) => (
    <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

            <CircleDot
                size={11}
                className="text-pink-500"
            />

            <span className="text-xs text-slate-500">
                {label}
            </span>

        </div>

        <span className="text-sm font-semibold text-slate-300">
            {value}
        </span>

    </div>
);


// ============================================================
// EMPTY STATE
// ============================================================

const EmptyState = ({ text }) => (
    <div className="rounded-2xl border border-dashed border-white/10 bg-[#0b111d] p-12 text-center">

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-slate-600">
            <FileText size={20} />
        </div>

        <p className="mt-4 text-sm text-slate-600">
            {text}
        </p>

    </div>
);


export default Interview;