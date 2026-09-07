import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Brain,
    CheckCircle2,
    FileText,
    Sparkles,
    Target,
    TrendingUp,
    Upload,
    Zap,
} from "lucide-react";

import { AppShell } from "../shared/SiteChrome";

const features = [
    {
        icon: Target,
        number: "01",
        title: "Role-aware analysis",
        description:
            "NexaMind analyzes the target job description and identifies the skills, technologies, and expectations that matter most.",
    },
    {
        icon: Brain,
        number: "02",
        title: "AI-powered questions",
        description:
            "Get technical, behavioral, and role-specific interview questions based on your profile and target position.",
    },
    {
        icon: TrendingUp,
        number: "03",
        title: "Personal preparation roadmap",
        description:
            "Turn your skill gaps into a practical preparation plan so you know exactly what to focus on before the interview.",
    },
];

const steps = [
    {
        icon: Upload,
        title: "Upload your resume",
        description:
            "Give NexaMind your resume or quickly describe your experience.",
    },
    {
        icon: FileText,
        title: "Add the job description",
        description:
            "Paste the real job description for the role you're targeting.",
    },
    {
        icon: Sparkles,
        title: "Get your strategy",
        description:
            "Receive an AI-generated interview report tailored to you.",
    },
];

const Landing = () => {
    return (
        <AppShell>
            <main className="overflow-hidden bg-[#060a13]">

                {/* =====================================================
                    HERO
                ===================================================== */}
                <section className="relative border-b border-white/10">

                    {/* Background glow */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute left-[10%] top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

                        <div className="absolute right-[10%] top-10 h-96 w-96 rounded-full bg-pink-600/10 blur-[140px]" />
                    </div>

                    <div className="relative mx-auto grid max-w-7xl gap-16 px-5 py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8 lg:py-28">

                        {/* LEFT */}
                        <div>

                            {/* Badge */}
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-xs font-semibold text-pink-400">
                                <Sparkles size={14} />
                                AI-POWERED INTERVIEW PREPARATION
                            </div>

                            {/* Heading */}
                            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                                Stop guessing.
                                <span className="block text-pink-500">
                                    Start preparing.
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                                NexaMind turns your resume and a real job
                                description into a personalized interview
                                strategy, targeted questions, skill-gap
                                analysis, and a preparation roadmap.
                            </p>

                            {/* CTA */}
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                                <Link
                                    to="/register"
                                    className="group flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-pink-600/20 transition hover:bg-pink-500"
                                >
                                    Build my interview strategy

                                    <ArrowRight
                                        size={17}
                                        className="transition group-hover:translate-x-1"
                                    />
                                </Link>

                                <Link
                                    to="/login"
                                    className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06]"
                                >
                                    Sign in
                                </Link>

                            </div>

                            {/* Trust points */}
                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

                                <TrustPoint text="Personalized analysis" />

                                <TrustPoint text="AI-generated questions" />

                                <TrustPoint text="Saved reports" />

                            </div>
                        </div>

                        {/* RIGHT - PRODUCT PREVIEW */}
                        <div className="relative">

                            {/* Floating card */}
                            <div className="absolute -right-2 -top-8 z-10 hidden rounded-xl border border-white/10 bg-[#111827] px-4 py-3 shadow-2xl sm:block">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                                        <CheckCircle2 size={17} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-white">
                                            Analysis complete
                                        </p>

                                        <p className="text-[10px] text-slate-500">
                                            Your strategy is ready
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* Main dashboard */}
                            <div className="rounded-3xl border border-white/10 bg-[#0b111d] p-4 shadow-2xl shadow-black/40 sm:p-6">

                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-white/10 pb-5">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                                            <Brain size={19} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                Interview Strategy
                                            </p>

                                            <p className="text-[10px] text-slate-600">
                                                FRONTEND ENGINEER
                                            </p>
                                        </div>

                                    </div>

                                    <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400">
                                        82% Match
                                    </span>

                                </div>

                                {/* Score */}
                                <div className="mt-6 rounded-2xl border border-white/5 bg-[#080d17] p-5">

                                    <div className="flex items-end justify-between">

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Profile match
                                            </p>

                                            <p className="mt-1 text-4xl font-black text-white">
                                                82%
                                            </p>
                                        </div>

                                        <TrendingUp
                                            size={24}
                                            className="text-emerald-400"
                                        />

                                    </div>

                                    {/* Progress */}
                                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">

                                        <div className="h-full w-[82%] rounded-full bg-pink-500" />

                                    </div>

                                    <p className="mt-3 text-xs text-slate-600">
                                        Strong match for the target role
                                    </p>

                                </div>

                                {/* Stats */}
                                <div className="mt-4 grid grid-cols-3 gap-3">

                                    <PreviewStat
                                        value="12"
                                        label="Questions"
                                    />

                                    <PreviewStat
                                        value="7"
                                        label="Skill areas"
                                    />

                                    <PreviewStat
                                        value="5"
                                        label="Day plan"
                                    />

                                </div>

                                {/* Questions */}
                                <div className="mt-4 rounded-2xl border border-white/5 bg-[#080d17] p-5">

                                    <div className="mb-4 flex items-center justify-between">

                                        <p className="text-xs font-semibold text-slate-300">
                                            Recommended focus
                                        </p>

                                        <span className="text-[10px] text-pink-400">
                                            AI INSIGHT
                                        </span>

                                    </div>

                                    <div className="space-y-3">

                                        <Question
                                            text="React performance optimization"
                                        />

                                        <Question
                                            text="REST API architecture"
                                        />

                                        <Question
                                            text="JWT authentication flow"
                                        />

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    VALUE STRIP
                ===================================================== */}
                <section className="border-b border-white/10 bg-[#080d17]">

                    <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">

                        <ValueItem
                            icon={<Target size={18} />}
                            title="Built around your role"
                            text="Not generic interview questions."
                        />

                        <ValueItem
                            icon={<Zap size={18} />}
                            title="AI-powered insights"
                            text="Focus on what actually matters."
                        />

                        <ValueItem
                            icon={<FileText size={18} />}
                            title="Everything in one place"
                            text="Save and revisit your reports."
                        />

                    </div>
                </section>

                {/* =====================================================
                    FEATURES
                ===================================================== */}
                <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">

                    <div className="max-w-2xl">

                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-pink-400">
                            Why NexaMind
                        </p>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Preparation that adapts to you.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                            Your preparation should be based on the role you're
                            targeting—not a random collection of interview
                            questions.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-4 md:grid-cols-3">

                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <article
                                    key={feature.number}
                                    className="group rounded-2xl border border-white/10 bg-[#0b111d] p-7 transition hover:-translate-y-1 hover:border-pink-500/30"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                                            <Icon size={20} />
                                        </div>

                                        <span className="text-xs font-bold text-slate-700">
                                            {feature.number}
                                        </span>

                                    </div>

                                    <h3 className="mt-8 text-xl font-bold text-white">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500">
                                        {feature.description}
                                    </p>

                                </article>
                            );
                        })}

                    </div>
                </section>

                {/* =====================================================
                    HOW IT WORKS
                ===================================================== */}
                <section className="border-y border-white/10 bg-[#080d17]">

                    <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">

                        <div className="text-center">

                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-pink-400">
                                Simple workflow
                            </p>

                            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                                From resume to interview strategy.
                            </h2>

                            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
                                Three simple steps to turn your experience into
                                focused interview preparation.
                            </p>

                        </div>

                        <div className="mt-14 grid gap-6 md:grid-cols-3">

                            {steps.map((step, index) => {
                                const Icon = step.icon;

                                return (
                                    <div
                                        key={step.title}
                                        className="relative text-center"
                                    >

                                        {/* connector */}
                                        {index !== steps.length - 1 && (
                                            <div className="absolute left-[calc(50%+45px)] top-7 hidden h-px w-[calc(100%-90px)] bg-white/10 md:block" />
                                        )}

                                        <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-pink-500/20 bg-pink-500/10 text-pink-400">
                                            <Icon size={22} />
                                        </div>

                                        <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                                            Step {index + 1}
                                        </p>

                                        <h3 className="mt-2 text-lg font-bold text-white">
                                            {step.title}
                                        </h3>

                                        <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-500">
                                            {step.description}
                                        </p>

                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </section>

                {/* =====================================================
                    FINAL CTA
                ===================================================== */}
                <section className="relative overflow-hidden">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.15),transparent_45%)]" />

                    <div className="relative mx-auto max-w-4xl px-5 py-24 text-center lg:px-8">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400">
                            <Sparkles size={25} />
                        </div>

                        <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl">
                            Your next interview deserves
                            <span className="block text-pink-500">
                                better preparation.
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                            Build a personalized strategy based on your resume
                            and the actual role you're applying for.
                        </p>

                        <Link
                            to="/register"
                            className="group mx-auto mt-8 flex w-fit items-center gap-2 rounded-xl bg-pink-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-pink-600/20 transition hover:bg-pink-500"
                        >
                            Start preparing with NexaMind

                            <ArrowRight
                                size={17}
                                className="transition group-hover:translate-x-1"
                            />
                        </Link>

                    </div>
                </section>
            </main>
        </AppShell>
    );
};


/* =====================================================
   SMALL COMPONENTS
===================================================== */

const TrustPoint = ({ text }) => (
    <div className="flex items-center gap-2 text-xs text-slate-500">
        <CheckCircle2 size={14} className="text-emerald-400" />
        {text}
    </div>
);


const PreviewStat = ({ value, label }) => (
    <div className="rounded-xl border border-white/5 bg-[#080d17] p-4 text-center">
        <p className="text-xl font-bold text-white">{value}</p>

        <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
            {label}
        </p>
    </div>
);


const Question = ({ text }) => (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-xs font-bold text-pink-400">
            ?
        </div>

        <p className="text-xs text-slate-400">
            {text}
        </p>

    </div>
);


const ValueItem = ({ icon, title, text }) => (
    <div className="flex items-center gap-4 px-6 py-6 sm:px-8">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
            {icon}
        </div>

        <div>
            <p className="text-sm font-semibold text-slate-200">
                {title}
            </p>

            <p className="mt-1 text-xs text-slate-600">
                {text}
            </p>
        </div>

    </div>
);


export default Landing;