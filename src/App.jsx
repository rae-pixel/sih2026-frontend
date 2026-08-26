import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

/* ----------------------------------------------------------------------
   Token system
   bg (page):      #EEF1F8  cool pale blue-grey
   panel (dark):   #141B3C  deep indigo
   panel-2:        #232D5C  lighter indigo, gradient partner
   accent:         #FF6B4A  coral — CTAs, focus, links
   accent-soft:    #FFE3D9  coral tint — hover backgrounds
   text:           #12162B
   muted:          #6B7280
   success:        #2FBF71
   border:         #DDE2F0
   Display face:   Space Grotesk (brand + headings)
   Body face:      Inter (labels, inputs, paragraph)
   Signature:      "handshake network" — a hub-and-satellite node graph
                    that draws itself in on load and pulses while a
                    credential is being verified.
------------------------------------------------------------------------*/

const C = {
  bg: "#EEF1F8",
  panel: "#141B3C",
  panel2: "#232D5C",
  accent: "#FF6B4A",
  accentSoft: "#FFE3D9",
  text: "#12162B",
  muted: "#6B7280",
  success: "#2FBF71",
  border: "#DDE2F0",
  danger: "#E5484D",
  glass: "rgba(255,255,255,0.55)",
  glassBorder: "rgba(255,255,255,0.65)",
  glassField: "rgba(255,255,255,0.45)",
};

const NODES = [
  { x: 150, y: 40 },
  { x: 250, y: 95 },
  { x: 250, y: 205 },
  { x: 150, y: 260 },
  { x: 50, y: 205 },
  { x: 50, y: 95 },
];

function NetworkSignature({ active, status }) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg viewBox="0 0 300 300" className="w-56 h-56 md:w-64 md:h-64">
        {NODES.map((n, i) => (
          <line
            key={`line-${i}`}
            x1="150"
            y1="150"
            x2={n.x}
            y2={n.y}
            stroke={C.panel2}
            strokeWidth="1.5"
            strokeDasharray="160"
            className="sih-draw"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r="5"
            fill={C.accent}
            opacity="0"
            className="sih-node-in"
            style={{ animationDelay: `${400 + i * 120}ms` }}
          />
        ))}
        <circle
          cx="150"
          cy="150"
          r="15"
          fill={C.accent}
          className={active ? "sih-hub-pulse" : ""}
          opacity="0"
          style={{ animation: `sih-fade-in 0.5s ease-out 900ms forwards${active ? ", setu-hub-pulse 1.1s ease-in-out infinite 900ms" : ""}` }}
        />
        <circle cx="150" cy="150" r="15" fill="none" stroke={C.accent} strokeWidth="1" opacity="0.5">
          {active && (
            <animate attributeName="r" values="15;42;15" dur="1.6s" repeatCount="indefinite" />
          )}
          {active && (
            <animate attributeName="opacity" values="0.5;0;0.5" dur="1.6s" repeatCount="indefinite" />
          )}
        </circle>
      </svg>
      <p
        className="mt-2 text-xs tracking-wide uppercase font-medium h-4 transition-opacity duration-300"
        style={{ color: C.panel2, fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {status}
      </p>
    </div>
  );
}

function Field({ id, label, icon: Icon, type = "text", value, onChange, error, focused, setFocused, rightSlot }) {
  const isFocused = focused === id;
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1.5"
        style={{ color: C.text, fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </label>
      <div
        className="flex items-center rounded-lg px-3 transition-colors duration-150"
        style={{
          border: `1.5px solid ${error ? C.danger : isFocused ? C.accent : "rgba(255,255,255,0.8)"}`,
          backgroundColor: isFocused ? "rgba(255,255,255,0.75)" : C.glassField,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <Icon size={17} style={{ color: error ? C.danger : isFocused ? C.accent : C.muted }} />
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(id)}
          onBlur={() => setFocused(null)}
          className="w-full bg-transparent outline-none py-2.5 px-2.5 text-sm"
          style={{ color: C.text, fontFamily: "'Inter', sans-serif" }}
          autoComplete="off"
        />
        {rightSlot}
      </div>
      {error && (
        <p className="mt-1 text-xs" style={{ color: C.danger, fontFamily: "'Inter', sans-serif" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function PrimaryButton({ children, loading, onClick, type = "submit" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-transform duration-150 active:scale-[0.98] disabled:opacity-80"
      style={{ backgroundColor: C.accent, color: "#fff", fontFamily: "'Inter', sans-serif" }}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Verifying…
        </>
      ) : (
        <>
          {children}
          <ArrowRight size={16} />
        </>
      )}
    </button>
  );
}

export default function AuthFlow() {
  const [view, setView] = useState("signup"); // signup | login | forgot | sent | reset | welcome
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [focused, setFocused] = useState(null);
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [fields, setFields] = useState({ name: "", email: "", password: "", confirm: "" });
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey((k) => k + 1);
  }, [view]);

  const update = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: null }));
  };

  function validate() {
    const e = {};
    if (view === "signup" && !fields.name.trim()) e.name = "Enter your full name";
    if (view !== "reset" && (!fields.email.trim() || !/^\S+@\S+\.\S+$/.test(fields.email)))
      e.email = "Enter a valid email address";
    if (view !== "forgot" && (!fields.password || fields.password.length < 6))
      e.password = "Use at least 6 characters";
    if ((view === "signup" || view === "reset") && fields.password !== fields.confirm)
      e.confirm = "Passwords don't match";
    return e;
  }

  function switchView(next) {
    setErrors({});
    setShake(false);
    setView(next);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (view === "signup") switchView("login");
      else if (view === "login") switchView("welcome");
      else if (view === "forgot") switchView("sent");
      else if (view === "reset") switchView("login");
    }, 1600);
  }

  const statusText = loading
    ? "Verifying credentials"
    : view === "signup"
    ? "New account · handshake ready"
    : view === "login"
    ? "Secure sign-in ·  network"
    : view === "forgot" || view === "sent"
    ? "Recovery channel · standing by"
    : view === "reset"
    ? "Issuing new credential"
    : "Session established";

  const headline =
    {
      signup: ["Create your", " account"],
      login: ["Welcome back", "to our page"],
      forgot: ["Reset your", "password"],
      sent: ["Check your", "inbox"],
      reset: ["Choose a new", "password"],
      welcome: ["You're", "verified"],
    }[view] || ["", ""];

  const subcopy =
    {
      signup: "Set up access in under a minute ",
      login: "Enter your credentials to reach your dashboard.",
      forgot: "Tell us the email on your account and we'll send a recovery link.",
      sent: "If an account matches, a reset link is on its way. For this demo, continue below.",
      reset: "Your new password must be different from previously used passwords.",
      welcome: "Redirecting you to your dashboard now.",
    }[view] || "";

  return (
    <div
      className="relative min-h-screen w-full flex items-stretch justify-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at 15% 20%, #E7ECFB 0%, ${C.bg} 45%), radial-gradient(circle at 85% 80%, #FBE6DE 0%, ${C.bg} 50%)`,
      }}
    >
      {/* ambient blurred blobs — the glassmorphism light source */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          top: -140,
          left: -120,
          background: C.panel2,
          opacity: 0.35,
          filter: "blur(90px)",
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 380,
          height: 380,
          bottom: -160,
          right: -100,
          background: C.accent,
          opacity: 0.28,
          filter: "blur(100px)",
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 260,
          height: 260,
          top: "35%",
          right: "18%",
          background: "#8FA0FF",
          opacity: 0.18,
          filter: "blur(80px)",
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

        @keyframes sih-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sih-draw { to { stroke-dashoffset: 0; } }
        @keyframes sih-hub-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.12); opacity: 0.85; }
        }
        @keyframes sih-shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
        @keyframes sih-panel-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sih-check-pop {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        .sih-draw { stroke-dashoffset: 160; animation: setu-draw 0.7s ease-out forwards; transform-origin: center; }
        .sih-node-in { animation: sih-fade-in 0.4s ease-out forwards; }
        .sih-hub-pulse circle { transform-origin: center; }
        .sih-shake-el { animation: sih-shake 0.45s ease-in-out; transform-origin: center; }
        .sih-view-in { animation: sih-panel-in 0.38s cubic-bezier(.2,.7,.3,1) both; }
        .sih-check-in { animation: sih-check-pop 0.5s cubic-bezier(.2,.8,.3,1) both; }

        @media (prefers-reduced-motion: reduce) {
          .sih-draw, .sih-node-in, .sih-hub-pulse, .sih-shake-el, .sih-view-in, .sih-check-in {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className="relative z-10 w-full max-w-md my-6 md:my-10 mx-4 flex rounded-2xl overflow-hidden"
        style={{
          backgroundColor: C.glass,
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          border: `1px solid ${C.glassBorder}`,
          boxShadow: "0 20px 60px -15px rgba(20, 27, 60, 0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {/* Form panel */}
        <div className="w-full p-8 sm:p-14 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-8 max-w-sm w-full mx-auto">
            <ShieldCheck size={20} color={C.accent} />
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Sih
            </span>
          </div>
          <div
            key={renderKey}
            className={`sih-view-in max-w-sm w-full mx-auto ${shake ? "sih-shake-el" : ""}`}
          >
            {view !== "welcome" && (
              <>
                <h1
                  className="text-3xl font-semibold leading-tight mb-2"
                  style={{ color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {headline[0]}
                  <br />
                  {headline[1]}
                </h1>
                <p className="text-sm mb-8" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                  {subcopy}
                </p>
              </>
            )}

            {/* ---------- SIGNUP ---------- */}
            {view === "signup" && (
              <form onSubmit={handleSubmit} noValidate>
                <Field
                  id="name"
                  label="Full name"
                  icon={User}
                  value={fields.name}
                  onChange={update("name")}
                  error={errors.name}
                  focused={focused}
                  setFocused={setFocused}
                />
                <Field
                  id="email"
                  label="Email address"
                  icon={Mail}
                  type="email"
                  value={fields.email}
                  onChange={update("email")}
                  error={errors.email}
                  focused={focused}
                  setFocused={setFocused}
                />
                <Field
                  id="password"
                  label="Password"
                  icon={Lock}
                  type={showPw ? "text" : "password"}
                  value={fields.password}
                  onChange={update("password")}
                  error={errors.password}
                  focused={focused}
                  setFocused={setFocused}
                  rightSlot={
                    <button type="button" onClick={() => setShowPw((s) => !s)} tabIndex={-1}>
                      {showPw ? <EyeOff size={16} color={C.muted} /> : <Eye size={16} color={C.muted} />}
                    </button>
                  }
                />
                <Field
                  id="confirm"
                  label="Confirm password"
                  icon={Lock}
                  type={showPw2 ? "text" : "password"}
                  value={fields.confirm}
                  onChange={update("confirm")}
                  error={errors.confirm}
                  focused={focused}
                  setFocused={setFocused}
                  rightSlot={
                    <button type="button" onClick={() => setShowPw2((s) => !s)} tabIndex={-1}>
                      {showPw2 ? <EyeOff size={16} color={C.muted} /> : <Eye size={16} color={C.muted} />}
                    </button>
                  }
                />
                <div className="mt-2">
                  <PrimaryButton loading={loading}>Create account</PrimaryButton>
                </div>
                <p className="mt-6 text-center text-sm" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => switchView("login")}
                    className="font-semibold"
                    style={{ color: C.accent }}
                  >
                    Log in
                  </button>
                </p>
              </form>
            )}

            {/* ---------- LOGIN ---------- */}
            {view === "login" && (
              <form onSubmit={handleSubmit} noValidate>
                <Field
                  id="email"
                  label="Email address"
                  icon={Mail}
                  type="email"
                  value={fields.email}
                  onChange={update("email")}
                  error={errors.email}
                  focused={focused}
                  setFocused={setFocused}
                />
                <Field
                  id="password"
                  label="Password"
                  icon={Lock}
                  type={showPw ? "text" : "password"}
                  value={fields.password}
                  onChange={update("password")}
                  error={errors.password}
                  focused={focused}
                  setFocused={setFocused}
                  rightSlot={
                    <button type="button" onClick={() => setShowPw((s) => !s)} tabIndex={-1}>
                      {showPw ? <EyeOff size={16} color={C.muted} /> : <Eye size={16} color={C.muted} />}
                    </button>
                  }
                />
                <div className="flex justify-end -mt-2 mb-5">
                  <button
                    type="button"
                    onClick={() => switchView("forgot")}
                    className="text-xs font-medium"
                    style={{ color: C.accent, fontFamily: "'Inter', sans-serif" }}
                  >
                    Forgot password?
                  </button>
                </div>
                <PrimaryButton loading={loading}>Log in</PrimaryButton>
                <p className="mt-6 text-center text-sm" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                  New here?{" "}
                  <button
                    type="button"
                    onClick={() => switchView("signup")}
                    className="font-semibold"
                    style={{ color: C.accent }}
                  >
                    Create an account
                  </button>
                </p>
              </form>
            )}

            {/* ---------- FORGOT PASSWORD ---------- */}
            {view === "forgot" && (
              <form onSubmit={handleSubmit} noValidate>
                <Field
                  id="email"
                  label="Email address"
                  icon={Mail}
                  type="email"
                  value={fields.email}
                  onChange={update("email")}
                  error={errors.email}
                  focused={focused}
                  setFocused={setFocused}
                />
                <PrimaryButton loading={loading}>Send reset link</PrimaryButton>
                <button
                  type="button"
                  onClick={() => switchView("login")}
                  className="mt-6 flex items-center gap-1.5 text-sm font-medium mx-auto"
                  style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}
                >
                  <ArrowLeft size={14} /> Back to log in
                </button>
              </form>
            )}

            {/* ---------- LINK SENT ---------- */}
            {view === "sent" && (
              <div>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6 setu-check-in"
                  style={{ backgroundColor: C.accentSoft }}
                >
                  <Mail size={24} color={C.accent} />
                </div>
                <PrimaryButton loading={false} onClick={() => switchView("reset")}>
                  Continue to reset
                </PrimaryButton>
                <button
                  type="button"
                  onClick={() => switchView("login")}
                  className="mt-6 flex items-center gap-1.5 text-sm font-medium mx-auto"
                  style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}
                >
                  <ArrowLeft size={14} /> Back to log in
                </button>
              </div>
            )}

            {/* ---------- RESET PASSWORD ---------- */}
            {view === "reset" && (
              <form onSubmit={handleSubmit} noValidate>
                <Field
                  id="password"
                  label="New password"
                  icon={Lock}
                  type={showPw ? "text" : "password"}
                  value={fields.password}
                  onChange={update("password")}
                  error={errors.password}
                  focused={focused}
                  setFocused={setFocused}
                  rightSlot={
                    <button type="button" onClick={() => setShowPw((s) => !s)} tabIndex={-1}>
                      {showPw ? <EyeOff size={16} color={C.muted} /> : <Eye size={16} color={C.muted} />}
                    </button>
                  }
                />
                <Field
                  id="confirm"
                  label="Confirm new password"
                  icon={Lock}
                  type={showPw2 ? "text" : "password"}
                  value={fields.confirm}
                  onChange={update("confirm")}
                  error={errors.confirm}
                  focused={focused}
                  setFocused={setFocused}
                  rightSlot={
                    <button type="button" onClick={() => setShowPw2((s) => !s)} tabIndex={-1}>
                      {showPw2 ? <EyeOff size={16} color={C.muted} /> : <Eye size={16} color={C.muted} />}
                    </button>
                  }
                />
                <PrimaryButton loading={loading}>Update password</PrimaryButton>
              </form>
            )}

            {/* ---------- WELCOME / SUCCESS ---------- */}
            {view === "welcome" && (
              <div className="flex flex-col items-center text-center py-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 setu-check-in"
                  style={{ backgroundColor: "#E5F9EE" }}
                >
                  <CheckCircle2 size={30} color={C.success} />
                </div>
                <h1
                  className="text-2xl font-semibold mb-2"
                  style={{ color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {headline[0]} {headline[1]}
                </h1>
                <p className="text-sm mb-8" style={{ color: C.muted, fontFamily: "'Inter', sans-serif" }}>
                  {subcopy}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFields({ name: "", email: "", password: "", confirm: "" });
                    switchView("signup");
                  }}
                  className="text-sm font-semibold"
                  style={{ color: C.accent, fontFamily: "'Inter', sans-serif" }}
                >
                  
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
