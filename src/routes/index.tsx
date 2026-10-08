import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Dumbbell,
  Flame,
  Home,
  Medal,
  Menu,
  Pause,
  Play,
  RefreshCw,
  Search,
  Settings2,
  Shield,
  Sparkles,
  Swords,
  Target,
  TimerReset,
  Trophy,
  UserRound,
  Weight,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import lifterImage from "@/assets/ironlevel-lifter.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type View = "home" | "workout" | "programs" | "progress" | "profile";
type Track = "bodybuilding" | "powerlifting";

const navItems: { id: View; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "workout", label: "Workout", icon: Dumbbell },
  { id: "programs", label: "Programs", icon: BookOpen },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: UserRound },
];

const exercises = [
  { name: "Bench Press", group: "Chest", target: "62.5 kg × 5", previous: "60 kg × 5", done: 3, total: 4 },
  { name: "Incline DB Press", group: "Upper chest", target: "26 kg × 10", previous: "24 kg × 10", done: 0, total: 3 },
  { name: "Cable Fly", group: "Chest", target: "18 kg × 12", previous: "18 kg × 11", done: 0, total: 3 },
  { name: "Triceps Pushdown", group: "Triceps", target: "32 kg × 12", previous: "30 kg × 12", done: 0, total: 3 },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IRONLEVEL — Gamified Strength Training" },
      { name: "description", content: "Track today's lifts, progress through structured programs, earn XP, and break personal records with IRONLEVEL." },
      { property: "og:title", content: "IRONLEVEL — Gamified Strength Training" },
      { property: "og:description", content: "Premium workout tracking for bodybuilding and powerlifting, built around progression." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IronLevelApp,
});

function IronLevelApp() {
  const [view, setView] = useState<View>("home");
  const [track, setTrack] = useState<Track>("bodybuilding");
  const [workoutOpen, setWorkoutOpen] = useState(false);
  const [completed, setCompleted] = useState<number[]>([0, 1, 2]);
  const [restSeconds, setRestSeconds] = useState(0);
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");

  useEffect(() => {
    if (restSeconds <= 0) return;
    const timer = window.setInterval(() => setRestSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [restSeconds]);

  const navigate = (next: View) => {
    setView(next);
    setWorkoutOpen(next === "workout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DesktopRail active={view} onNavigate={navigate} />
      <div className="pb-24 md:pl-20 md:pb-0">
        <TopBar onMenu={() => navigate("profile")} />
        <main className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          {view === "home" && (
            <Dashboard track={track} setTrack={setTrack} onStart={() => setWorkoutOpen(true)} onView={navigate} />
          )}
          {view === "programs" && <Programs level={level} setLevel={setLevel} track={track} setTrack={setTrack} />}
          {view === "progress" && <ProgressPage />}
          {view === "profile" && <ProfilePage />}
          {view === "workout" && <WorkoutOverview onStart={() => setWorkoutOpen(true)} />}
        </main>
      </div>
      <MobileNav active={view} onNavigate={navigate} />
      {workoutOpen && (
        <WorkoutPanel
          completed={completed}
          setCompleted={setCompleted}
          restSeconds={restSeconds}
          setRestSeconds={setRestSeconds}
          onClose={() => {
            setWorkoutOpen(false);
            if (view === "workout") setView("home");
          }}
        />
      )}
    </div>
  );
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center bg-primary text-primary-foreground [clip-path:polygon(50%_0,100%_24%,100%_76%,50%_100%,0_76%,0_24%)]">
            <span className="font-display text-xl font-extrabold">IL</span>
          </div>
          <div>
            <div className="font-display text-2xl font-extrabold leading-none">IRON<span className="text-primary">LEVEL</span></div>
            <p className="hidden text-[10px] font-bold uppercase text-muted-foreground sm:block">Train · Progress · Dominate</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-2 border-r border-border pr-4 sm:flex">
            <Flame className="size-4 text-powerlifting" />
            <span className="text-xs font-bold">12 day streak</span>
          </div>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
            <Bell />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
          </Button>
          <Button variant="ghost" className="h-10 gap-2 px-1 sm:px-2" onClick={onMenu}>
            <div className="grid size-8 place-items-center rounded-full bg-secondary text-xs font-extrabold">AK</div>
            <div className="hidden text-left lg:block"><p className="text-xs font-bold">Alex Kumar</p><p className="text-[10px] text-muted-foreground">Level 24</p></div>
            <Menu className="hidden size-4 sm:block" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function DesktopRail({ active, onNavigate }: { active: View; onNavigate: (view: View) => void }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-20 flex-col items-center border-r border-border bg-panel pt-20 md:flex">
      <nav className="flex flex-1 flex-col gap-3 py-5">
        {navItems.map(({ id, label, icon: Icon }) => (
          <Button key={id} variant="ghost" size="icon" title={label} aria-label={label} onClick={() => onNavigate(id)} className={cn("relative size-11", active === id && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground")}><Icon /></Button>
        ))}
      </nav>
      <Button variant="ghost" size="icon" aria-label="Settings" className="mb-6"><Settings2 /></Button>
    </aside>
  );
}

function MobileNav({ active, onNavigate }: { active: View; onNavigate: (view: View) => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-panel/95 px-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
      {navItems.map(({ id, label, icon: Icon }) => (
        <button key={id} onClick={() => onNavigate(id)} className={cn("flex min-w-0 flex-col items-center gap-1 py-1 text-[9px] font-bold uppercase text-muted-foreground transition-colors", active === id && "text-primary")}>
          <Icon className="size-5" /><span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function Dashboard({ track, setTrack, onStart, onView }: { track: Track; setTrack: (track: Track) => void; onStart: () => void; onView: (view: View) => void }) {
  return (
    <div className="animate-lift-in space-y-6">
      <section className="relative min-h-[410px] overflow-hidden border border-border bg-panel panel-glow lg:min-h-[440px]">
        <img src={lifterImage} alt="Athlete preparing a loaded barbell" width={1536} height={1024} className="absolute inset-0 size-full object-cover object-[64%_center] opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_92%,transparent)_38%,color-mix(in_oklab,var(--background)_24%,transparent)_75%)]" />
        <div className="relative z-10 flex min-h-[410px] max-w-2xl flex-col justify-center p-6 sm:p-10 lg:min-h-[440px] lg:p-14">
          <div className="mb-4 flex items-center gap-2"><span className="h-px w-8 bg-primary" /><span className="text-xs font-extrabold uppercase text-primary">Day 18 · Push strength</span></div>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.88] sm:text-7xl">Today, we<br /><span className="text-primary">level up.</span></h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">Chest & triceps. Beat last week's numbers by one rep and earn <strong className="text-foreground">+350 XP</strong>.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="performance" size="lg" className="h-12 px-6 font-extrabold uppercase" onClick={onStart}><Play className="fill-current" /> Start workout</Button>
            <Button variant="outline" size="lg" className="h-12" onClick={() => onView("programs")}>View program <ChevronRight /></Button>
          </div>
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-5">
            {[['7','exercises'],['24','total sets'],['58','minutes']].map(([value,label]) => <div key={label}><p className="font-display text-2xl font-bold">{value}</p><p className="text-[10px] font-bold uppercase text-muted-foreground">{label}</p></div>)}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <TrackCard active={track === "bodybuilding"} variant="bodybuilding" title="Bodybuilding" subtitle="Build muscle. Shape your physique." icon={Dumbbell} stats="5 days · Hypertrophy" onClick={() => setTrack("bodybuilding")} />
        <TrackCard active={track === "powerlifting"} variant="powerlifting" title="Powerlifting" subtitle="Get stronger. Own the platform." icon={Trophy} stats="4 days · Strength" onClick={() => setTrack("powerlifting")} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Zap} label="Current level" value="24" detail="2,450 / 3,000 XP" progress={82} />
        <Stat icon={Flame} label="Weekly streak" value="4/5" detail="Best: 8 weeks" progress={80} accent="powerlifting" />
        <Stat icon={Activity} label="Total workouts" value="128" detail="+12 this month" trend />
        <Stat icon={Weight} label="Body weight" value="78.4" unit="kg" detail="−0.6 kg this month" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <WeeklyProgress onView={() => onView("progress")} />
        <Achievements />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Challenge />
        <PersonalRecords />
      </section>
    </div>
  );
}

function TrackCard({ active, variant, title, subtitle, stats, icon: Icon, onClick }: { active: boolean; variant: Track; title: string; subtitle: string; stats: string; icon: typeof Trophy; onClick: () => void }) {
  const isBody = variant === "bodybuilding";
  return (
    <button onClick={onClick} className={cn("group relative overflow-hidden border bg-panel p-6 text-left transition-all hover:-translate-y-0.5", active ? (isBody ? "border-bodybuilding" : "border-powerlifting") : "border-border hover:border-muted-foreground")}>
      <div className={cn("absolute inset-y-0 left-0 w-1", isBody ? "bg-bodybuilding" : "bg-powerlifting")} />
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={cn("grid size-12 place-items-center", isBody ? "bg-bodybuilding/15 text-bodybuilding" : "bg-powerlifting/15 text-powerlifting")}><Icon className="size-6" /></div>
          <div><p className={cn("text-[10px] font-extrabold uppercase", isBody ? "text-bodybuilding" : "text-powerlifting")}>{stats}</p><h2 className="font-display text-3xl font-extrabold uppercase">{title}</h2><p className="text-xs text-muted-foreground">{subtitle}</p></div>
        </div>
        <div className={cn("grid size-8 place-items-center rounded-full border", active ? (isBody ? "border-bodybuilding bg-bodybuilding text-bodybuilding-foreground" : "border-powerlifting bg-powerlifting text-powerlifting-foreground") : "border-border text-muted-foreground")}>
          {active ? <Check className="size-4" /> : <ChevronRight className="size-4" />}
        </div>
      </div>
    </button>
  );
}

function Stat({ icon: Icon, label, value, unit, detail, progress, trend, accent }: { icon: typeof Zap; label: string; value: string; unit?: string; detail: string; progress?: number; trend?: boolean; accent?: "powerlifting" }) {
  return (
    <article className="border border-border bg-panel p-5 transition-colors hover:bg-panel-raised">
      <div className="flex items-center justify-between"><Icon className={cn("size-5 text-primary", accent && "text-powerlifting")} /><span className="text-[10px] font-bold uppercase text-muted-foreground">{label}</span></div>
      <div className="mt-4 flex items-end gap-1"><strong className="font-display text-4xl leading-none">{value}</strong>{unit && <span className="text-sm font-bold text-muted-foreground">{unit}</span>}{trend && <ArrowUpRight className="mb-1 size-4 text-success" />}</div>
      <p className="mt-2 text-[11px] text-muted-foreground">{detail}</p>
      {progress !== undefined && <Progress value={progress} className={cn("mt-3 h-1", accent && "[&>div]:bg-powerlifting")} />}
    </article>
  );
}

function WeeklyProgress({ onView }: { onView: () => void }) {
  const points = [32, 44, 39, 61, 68, 74, 87];
  return (
    <article className="border border-border bg-panel p-5 sm:p-6">
      <div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase text-primary">Performance</p><h2 className="font-display text-2xl font-bold uppercase">Weekly progress</h2></div><Button variant="ghost" size="sm" onClick={onView}>Details <ChevronRight /></Button></div>
      <div className="mt-7 flex h-44 items-end gap-3 border-b border-border px-2 sm:gap-5">
        {points.map((height, index) => <div key={height} className="flex flex-1 flex-col items-center gap-2"><div className="relative flex h-32 w-full items-end"><div className={cn("w-full transition-all hover:opacity-80", index === 6 ? "bg-primary" : "bg-secondary")} style={{ height: `${height}%` }} /></div><span className="text-[9px] font-bold text-muted-foreground">{["M","T","W","T","F","S","S"][index]}</span></div>)}
      </div>
      <div className="mt-5 grid grid-cols-3 divide-x divide-border text-center"><div><p className="font-display text-2xl font-bold">18.4k</p><p className="text-[9px] uppercase text-muted-foreground">Volume kg</p></div><div><p className="font-display text-2xl font-bold">4</p><p className="text-[9px] uppercase text-muted-foreground">Sessions</p></div><div><p className="font-display text-2xl font-bold text-success">+8.2%</p><p className="text-[9px] uppercase text-muted-foreground">vs last week</p></div></div>
    </article>
  );
}

function Achievements() {
  const badges = [[Trophy,"First PR","Unlocked"],[Flame,"7-Day Streak","Unlocked"],[Shield,"100 kg Club","72%"],[Medal,"Iron Elite","18/25"]] as const;
  return <article className="border border-border bg-panel p-5 sm:p-6"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase text-primary">Collection</p><h2 className="font-display text-2xl font-bold uppercase">Achievements</h2></div><span className="text-xs font-bold">16 / 48</span></div><div className="mt-5 grid grid-cols-2 gap-3">{badges.map(([Icon,title,state],index) => <div key={title} className="border border-border bg-panel-raised p-3 text-center"><div className={cn("mx-auto grid size-11 place-items-center rounded-full", index < 2 ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground")}><Icon className="size-5" /></div><p className="mt-2 text-[11px] font-bold">{title}</p><p className="text-[9px] text-muted-foreground">{state}</p></div>)}</div></article>;
}

function Challenge() {
  return <article className="relative overflow-hidden border border-border bg-panel p-6"><Target className="absolute -bottom-8 -right-5 size-36 text-primary/5" /><p className="text-[10px] font-extrabold uppercase text-primary">Daily challenge · 250 XP</p><h2 className="mt-2 font-display text-3xl font-extrabold uppercase">Volume hunter</h2><p className="mt-2 max-w-sm text-sm text-muted-foreground">Complete 10,000 kg of training volume today.</p><div className="mt-6 flex items-center gap-4"><div className="relative size-20 rounded-full bg-[conic-gradient(var(--primary)_72%,var(--secondary)_0)] p-2"><div className="grid size-full place-items-center rounded-full bg-panel font-display text-xl font-bold">72%</div></div><div><p className="font-display text-2xl font-bold">7,240 kg</p><p className="text-xs text-muted-foreground">2,760 kg remaining</p></div></div></article>;
}

function PersonalRecords() {
  const records = [["Squat","145","+5"],["Bench","102.5","+2.5"],["Deadlift","180","+7.5"],["Total","427.5","+15"]];
  return <article className="border border-border bg-panel p-5 sm:p-6"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase text-primary">All-time best</p><h2 className="font-display text-2xl font-bold uppercase">Personal records</h2></div><Trophy className="text-primary" /></div><div className="mt-5 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">{records.map(([lift,value,gain]) => <div key={lift} className="bg-panel-raised p-4"><p className="text-[10px] font-bold uppercase text-muted-foreground">{lift}</p><p className="mt-2 font-display text-3xl font-bold">{value}<span className="ml-1 text-xs text-muted-foreground">kg</span></p><p className="mt-1 text-[10px] font-bold text-success">↑ {gain} kg</p></div>)}</div></article>;
}

function WorkoutPanel({ completed, setCompleted, restSeconds, setRestSeconds, onClose }: { completed: number[]; setCompleted: (items: number[]) => void; restSeconds: number; setRestSeconds: (value: number) => void; onClose: () => void }) {
  const [weight, setWeight] = useState("62.5");
  const [reps, setReps] = useState("5");
  const [rpe, setRpe] = useState("8");
  const [celebrate, setCelebrate] = useState(false);
  const toggleSet = (index: number) => {
    const next = completed.includes(index) ? completed.filter((item) => item !== index) : [...completed, index];
    setCompleted(next);
    if (!completed.includes(index)) setRestSeconds(90);
    if (next.length === 4) setCelebrate(true);
  };
  const displayTimer = `${String(Math.floor(restSeconds / 60)).padStart(2,"0")}:${String(restSeconds % 60).padStart(2,"0")}`;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Active workout">
      <div className="h-full w-full overflow-y-auto border-l border-border bg-background sm:max-w-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 p-4 backdrop-blur-xl sm:px-6"><div><p className="text-[10px] font-extrabold uppercase text-primary">Workout in progress · 12:38</p><h2 className="font-display text-2xl font-extrabold uppercase">Push strength A</h2></div><Button variant="ghost" size="icon" onClick={onClose} aria-label="Close workout"><X /></Button></div>
        {celebrate ? <Celebration onContinue={() => setCelebrate(false)} /> : <div className="space-y-5 p-4 sm:p-6">
          <div className="flex items-center justify-between border border-primary/30 bg-primary/5 p-4"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center bg-primary text-primary-foreground"><Dumbbell /></div><div><p className="text-[10px] uppercase text-muted-foreground">Exercise 1 of 7</p><h3 className="font-display text-2xl font-bold uppercase">Bench press</h3></div></div><Button variant="ghost" size="icon" aria-label="Replace exercise"><RefreshCw /></Button></div>
          <div className="grid grid-cols-3 gap-2 border-y border-border py-4 text-center"><div><p className="text-[9px] uppercase text-muted-foreground">Previous</p><p className="mt-1 text-xs font-bold">60 kg × 5</p></div><div><p className="text-[9px] uppercase text-primary">Today</p><p className="mt-1 text-xs font-bold">62.5 kg × 5</p></div><div><p className="text-[9px] uppercase text-muted-foreground">Target</p><p className="mt-1 text-xs font-bold">65 kg × 5</p></div></div>
          <div><div className="grid grid-cols-[34px_1fr_1fr_1fr_44px] gap-2 px-1 text-center text-[9px] font-bold uppercase text-muted-foreground"><span>Set</span><span>kg</span><span>Reps</span><span>RPE</span><span>Done</span></div><div className="mt-2 space-y-2">{[0,1,2,3].map((index) => { const done = completed.includes(index); return <div key={index} className={cn("grid grid-cols-[34px_1fr_1fr_1fr_44px] items-center gap-2 border p-2 transition-colors", done ? "border-success/35 bg-success/5" : "border-border bg-panel")}><span className="text-center font-display text-lg font-bold">{index + 1}</span><Input aria-label={`Set ${index+1} weight`} value={weight} onChange={(event) => setWeight(event.target.value)} className="text-center" /><Input aria-label={`Set ${index+1} reps`} value={reps} onChange={(event) => setReps(event.target.value)} className="text-center" /><Input aria-label={`Set ${index+1} RPE`} value={rpe} onChange={(event) => setRpe(event.target.value)} className="text-center" /><Button size="icon" variant={done ? "performance" : "outline"} onClick={() => toggleSet(index)} aria-label={`Mark set ${index+1} complete`}><Check /></Button></div>})}</div></div>
          <div className="border border-border bg-panel p-4"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><Clock3 className="text-primary" /><div><p className="text-[9px] uppercase text-muted-foreground">Rest timer</p><p className="font-display text-3xl font-bold tabular-nums">{displayTimer}</p></div></div><div className="flex gap-2"><Button size="icon" variant="outline" onClick={() => setRestSeconds(restSeconds > 0 ? 0 : 90)} aria-label={restSeconds ? "Pause rest timer" : "Start rest timer"}>{restSeconds ? <Pause /> : <Play />}</Button><Button size="icon" variant="outline" onClick={() => setRestSeconds(90)} aria-label="Reset timer"><TimerReset /></Button></div></div><Progress value={(restSeconds/90)*100} className="mt-3 h-1" /></div>
          <label className="block text-[10px] font-bold uppercase text-muted-foreground">Set notes<textarea className="mt-2 min-h-20 w-full resize-none rounded-md border border-input bg-panel p-3 text-sm normal-case text-foreground outline-none focus:border-primary" placeholder="Bar speed, technique cues, pain or discomfort…" /></label>
          <div className="flex gap-3"><Button variant="outline" className="flex-1" onClick={onClose}>Save & exit</Button><Button variant="performance" className="flex-1" onClick={() => setCelebrate(true)}>Finish exercise <ChevronRight /></Button></div>
        </div>}
      </div>
    </div>
  );
}

function Celebration({ onContinue }: { onContinue: () => void }) {
  return <div className="grid min-h-[calc(100vh-80px)] place-items-center p-6 text-center"><div><div className="relative mx-auto grid size-28 place-items-center rounded-full bg-primary/10 text-primary animate-pulse-ring"><Trophy className="size-14" /><Sparkles className="absolute -right-3 top-0" /></div><p className="mt-8 text-xs font-extrabold uppercase text-primary">New personal record!</p><h2 className="mt-2 font-display text-6xl font-extrabold uppercase leading-none">62.5 kg × 5</h2><p className="mx-auto mt-4 max-w-sm text-sm text-muted-foreground">Your estimated bench press 1RM is now <strong className="text-foreground">72.9 kg</strong>. That's 3.1% stronger.</p><div className="mx-auto mt-6 grid max-w-xs grid-cols-2 gap-px bg-border"><div className="bg-panel p-4"><p className="font-display text-2xl font-bold text-primary">+350</p><p className="text-[9px] uppercase text-muted-foreground">XP earned</p></div><div className="bg-panel p-4"><p className="font-display text-2xl font-bold">129</p><p className="text-[9px] uppercase text-muted-foreground">Total workouts</p></div></div><Button variant="performance" size="lg" className="mt-8 w-full max-w-xs" onClick={onContinue}>Continue workout <ChevronRight /></Button></div></div>;
}

function Programs({ level, setLevel, track, setTrack }: { level: string; setLevel: (level: "Beginner" | "Intermediate" | "Advanced") => void; track: Track; setTrack: (track: Track) => void }) {
  const programs = [
    { title: "Foundation", days: "3–4 days", copy: "Technique-first training and simple weekly progression.", tag: "8 weeks" },
    { title: "Upper / Lower", days: "4 days", copy: "Balanced volume with progressive overload across all key lifts.", tag: "12 weeks" },
    { title: "Peak Protocol", days: "5–6 days", copy: "Periodized training with RPE, deloads, and PR preparation.", tag: "16 weeks" },
  ];
  return <div className="animate-lift-in"><PageHeading eyebrow="Choose your path" title="Programs" copy="Structured training that adapts to your goal, experience, and available days." /><div className="mt-8 flex flex-wrap gap-2"><Button variant={track === "bodybuilding" ? "bodybuilding" : "outline"} onClick={() => setTrack("bodybuilding")}><Dumbbell /> Bodybuilding</Button><Button variant={track === "powerlifting" ? "powerlifting" : "outline"} onClick={() => setTrack("powerlifting")}><Trophy /> Powerlifting</Button></div><div className="mt-5 inline-flex max-w-full overflow-x-auto border border-border bg-panel p-1">{["Beginner","Intermediate","Advanced"].map((item) => <Button key={item} variant={level === item ? "performance" : "ghost"} onClick={() => setLevel(item as typeof level)} className="shrink-0">{item}</Button>)}</div><div className="mt-6 grid gap-4 lg:grid-cols-3">{programs.map((program,index) => <article key={program.title} className={cn("border bg-panel p-6", index === 1 ? "border-primary" : "border-border")}><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase text-primary">{program.tag}</span>{index === 1 && <span className="bg-primary px-2 py-1 text-[9px] font-extrabold uppercase text-primary-foreground">Recommended</span>}</div><h2 className="mt-8 font-display text-4xl font-extrabold uppercase">{program.title}</h2><p className="mt-2 text-sm text-muted-foreground">{program.copy}</p><div className="my-6 border-y border-border py-4 text-xs font-bold">{program.days} · {level}</div><ul className="space-y-3 text-xs text-muted-foreground">{["Automatic load progression","Weekly volume targets","Technique guidance","Deload management"].map(item => <li key={item} className="flex items-center gap-2"><Check className="size-4 text-primary" />{item}</li>)}</ul><Button variant={index === 1 ? "performance" : "outline"} className="mt-8 w-full">View program <ChevronRight /></Button></article>)}</div><ExerciseLibrary /></div>;
}

function ExerciseLibrary() {
  const items = [["Barbell Back Squat","Legs · Barbell","145 kg"],["Bench Press","Chest · Barbell","102.5 kg"],["Romanian Deadlift","Hamstrings · Barbell","120 kg"],["Pull-up","Back · Bodyweight","+25 kg"]];
  return <section className="mt-10"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase text-primary">Explore movement</p><h2 className="font-display text-3xl font-extrabold uppercase">Exercise library</h2></div><div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><Input className="pl-9" placeholder="Search 240+ exercises" /></div></div><div className="mt-5 grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-4">{items.map(([name,meta,pb]) => <article key={name} className="bg-panel p-5 hover:bg-panel-raised"><div className="mb-8 flex items-start justify-between"><Dumbbell className="text-muted-foreground" /><ChevronRight className="size-4 text-muted-foreground" /></div><h3 className="font-display text-xl font-bold uppercase">{name}</h3><p className="mt-1 text-[10px] text-muted-foreground">{meta}</p><p className="mt-4 text-xs"><span className="text-muted-foreground">Personal best </span><strong>{pb}</strong></p></article>)}</div></section>;
}

function ProgressPage() {
  const bars = [54,62,58,68,73,78,84,81,90,94,88,100];
  return <div className="animate-lift-in"><PageHeading eyebrow="Analytics" title="Your progress" copy="Every rep tells a story. See where you're getting stronger and what to train next." /><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat icon={Weight} label="Body weight" value="78.4" unit="kg" detail="−0.6 kg in 30 days"/><Stat icon={Swords} label="Strength total" value="427.5" unit="kg" detail="+15 kg this block" trend/><Stat icon={Activity} label="Monthly volume" value="74.2k" unit="kg" detail="+8.2% vs September"/><Stat icon={Trophy} label="PRs this year" value="18" detail="3 in the last 30 days"/></div><section className="mt-6 border border-border bg-panel p-5 sm:p-7"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase text-primary">12-week trend</p><h2 className="font-display text-3xl font-extrabold uppercase">Strength progression</h2></div><div className="flex gap-2">{["1M","3M","1Y"].map((item,index)=><Button key={item} size="sm" variant={index===1?"performance":"ghost"}>{item}</Button>)}</div></div><div className="mt-8 flex h-64 items-end gap-2">{bars.map((bar,index)=><div key={`${bar}-${index}`} className="flex h-full flex-1 items-end"><div className={cn("w-full", index === bars.length-1 ? "bg-primary" : "bg-secondary")} style={{height:`${bar}%`}} /></div>)}</div><div className="mt-5 grid grid-cols-4 divide-x divide-border text-center">{[["Squat","145"],["Bench","102.5"],["Deadlift","180"],["Total","427.5"]].map(([lift,value])=><div key={lift}><p className="text-[9px] uppercase text-muted-foreground">{lift}</p><p className="mt-1 font-display text-2xl font-bold">{value}</p></div>)}</div></section></div>;
}

function WorkoutOverview({ onStart }: { onStart: () => void }) {
  return <div className="animate-lift-in"><PageHeading eyebrow="Up next" title="Today's workout" copy="Push Strength A · Week 6 of 12 · Intermediate" /><div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]"><section className="border border-border bg-panel"><div className="grid grid-cols-[1fr_auto] border-b border-border p-5 text-[10px] font-bold uppercase text-muted-foreground"><span>Exercise</span><span>Sets × target</span></div>{exercises.map((exercise,index)=><div key={exercise.name} className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-border p-5 last:border-0"><div className="flex items-center gap-4"><span className="font-display text-xl font-bold text-muted-foreground">0{index+1}</span><div><h3 className="text-sm font-bold">{exercise.name}</h3><p className="text-[10px] text-muted-foreground">{exercise.group} · Previous {exercise.previous}</p></div></div><p className="text-xs font-bold">{exercise.total} × {exercise.target.split('×')[1]}</p></div>)}</section><aside className="border border-primary/30 bg-panel p-6"><p className="text-[10px] font-extrabold uppercase text-primary">Session target</p><h2 className="mt-2 font-display text-4xl font-extrabold uppercase">Beat the book</h2><p className="mt-3 text-sm text-muted-foreground">Add one rep or 2.5 kg where technique allows. Keep working sets at RPE 8.</p><div className="my-6 grid grid-cols-2 gap-px bg-border"><div className="bg-panel-raised p-4"><p className="font-display text-2xl font-bold">58</p><p className="text-[9px] uppercase text-muted-foreground">minutes</p></div><div className="bg-panel-raised p-4"><p className="font-display text-2xl font-bold">+350</p><p className="text-[9px] uppercase text-muted-foreground">XP reward</p></div></div><Button variant="performance" size="lg" className="w-full" onClick={onStart}><Play className="fill-current" /> Start workout</Button></aside></div></div>;
}

function ProfilePage() {
  return <div className="animate-lift-in"><PageHeading eyebrow="Athlete profile" title="Alex Kumar" copy="Intermediate bodybuilder · Training since January 2023" /><div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]"><section className="border border-border bg-panel p-6 text-center"><div className="mx-auto grid size-28 place-items-center rounded-full border-4 border-primary bg-secondary font-display text-4xl font-extrabold">AK</div><h2 className="mt-5 font-display text-3xl font-extrabold uppercase">Level 24</h2><p className="text-xs text-muted-foreground">Iron Contender</p><Progress value={82} className="mt-5"/><p className="mt-2 text-[10px] text-muted-foreground">550 XP to Level 25</p><Button variant="outline" className="mt-6 w-full"><CircleUserRound /> Edit profile</Button></section><section className="border border-border bg-panel p-6"><p className="text-[10px] font-bold uppercase text-primary">Training identity</p><h2 className="font-display text-3xl font-extrabold uppercase">Your setup</h2><div className="mt-6 grid gap-px bg-border sm:grid-cols-2">{[["Primary goal","Build muscle"],["Training style","Bodybuilding"],["Experience","Intermediate"],["Training days","5 per week"],["Current weight","78.4 kg"],["Available equipment","Full gym"]].map(([label,value])=><div key={label} className="bg-panel-raised p-4"><p className="text-[9px] uppercase text-muted-foreground">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>)}</div><Button variant="ghost" className="mt-5"><Settings2 /> Personalization settings</Button></section></div></div>;
}

function PageHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="border-b border-border pb-7"><p className="text-[10px] font-extrabold uppercase text-primary">{eyebrow}</p><h1 className="font-display text-5xl font-extrabold uppercase sm:text-6xl">{title}</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">{copy}</p></div>;
}