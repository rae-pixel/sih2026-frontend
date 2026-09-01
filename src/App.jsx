import React, { useEffect, useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import ArtisanProfile from "./components/ArtisanProfile";
import ProductImageEnhancer from "./components/ProductImageEnhancer"; 
import DynamicPricingAssistant from "./components/DynamicPricingAssistant";
import ProductPublish from "./components/ProductPublish";



const C = {
  bg: "#F8F3EC",
  panel: "#5B321F",
  panel2: "#8B4A2F",
  accent: "#B85C38",
  accentSoft: "#F3DED0",
  text: "#2F2924",
  muted: "#746B63",
  success: "#657C4B",
  border: "#E5D8CA",
  danger: "#C94C3D",
  glass: "rgba(255,250,244,0.92)",
  glassBorder: "rgba(181,145,112,0.25)",
  glassField: "rgba(255,255,255,0.75)",
};

function Field({
  id,
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  error,
  focused,
  setFocused,
  rightSlot,
}) {
  const isFocused = focused === id;

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1.5"
        style={{ color: C.text }}
      >
        {label}
      </label>

      <div
        className="flex items-center rounded-lg px-3"
        style={{
          border: `1.5px solid ${
            error
              ? C.danger
              : isFocused
              ? C.accent
              : C.border
          }`,
          backgroundColor: C.glassField,
        }}
      >
        <Icon
          size={17}
          style={{
            color: error
              ? C.danger
              : isFocused
              ? C.accent
              : C.muted,
          }}
        />

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(id)}
          onBlur={() => setFocused(null)}
          className="w-full bg-transparent outline-none py-2.5 px-2.5 text-sm"
          style={{ color: C.text }}
          autoComplete="off"
        />

        {rightSlot}
      </div>

      {error && (
        <p
          className="mt-1 text-xs"
          style={{ color: C.danger }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

function PrimaryButton({
  children,
  loading,
  onClick,
  type = "submit",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold active:scale-[0.98]"
      style={{
        backgroundColor: C.accent,
        color: "#fff",
      }}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Verifying...
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

export default function App() {
  const [view, setView] = useState("signup");

  const [loading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [productPrice, setProductPrice] = useState(null);

  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const [focused, setFocused] = useState(null);
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  useEffect(() => {
    setRenderKey((k) => k + 1);
  }, [view]);

  const update = (key) => (e) => {
    setFields((f) => ({
      ...f,
      [key]: e.target.value,
    }));

    setErrors((er) => ({
      ...er,
      [key]: null,
    }));
  };

  function validate() {
    const e = {};

    if (
      view === "signup" &&
      !fields.name.trim()
    ) {
      e.name = "Enter your full name";
    }

    if (
      view !== "reset" &&
      (
        !fields.email.trim() || 
        !/^\S+@\S+\.\S+$/.test(fields.email)
      )
    ) {
      e.email = "Enter a valid email address";
    }

    if (
      view !== "forgot" &&
      (
        !fields.password ||
        fields.password.length < 6
      )
    ) {
      e.password = "Use at least 6 characters";
    }

    if (
      (view === "signup" || view === "reset") &&
      fields.password !== fields.confirm
    ) {
      e.confirm = "Passwords don't match";
    }

    return e;
  }

  function switchView(next) {
    setErrors({});
    setShake(false);
    setView(next);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 450);

      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (view === "signup") {
        switchView("login");
      } else if (view === "login") {
        switchView("welcome");
      } else if (view === "forgot") {
        switchView("sent");
      } else if (view === "reset") {
        switchView("login");
      }
    }, 1000);
  }

  /*
   * IMPORTANT:
   *
   * After login:
   * login -> welcome
   *
   * welcome -> ArtisanProfile
   *
   * ArtisanProfile -> image
   *
   * image -> ProductImageEnhancer
   */

  if (view === "welcome") {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center p-6"
        style={{
          backgroundColor: C.bg,
          color: C.text,
        }}
      >
        <div className="w-full max-w-4xl">
          <ArtisanProfile
            onComplete={() => {
              console.log("Profile completed");
              setView("image");
            }}
          />
        </div>
      </div>
    );
  }

 if (view === "image") {
  return (
    <ProductImageEnhancer
      onBack={() => setView("welcome")}
      onComplete={(image) => {
        setProductImage(image);
        setView("pricing");
      }}
    />
  );
}

if (view === "pricing") {
  return (
    <DynamicPricingAssistant
      onBack={() => setView("image")}
      onComplete={(price) => {
        setProductPrice(price);
        setView("publish");
      }}
    />
  );
}

if (view === "publish") {
  return (
    <ProductPublish
      image={productImage}
      price={productPrice}
      onBack={() => setView("pricing")}
    />
  );
}

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-4"
      style={{
        background: `
          radial-gradient(
            circle at 15% 20%,
            #F3E6D7 0%,
            ${C.bg} 45%
          ),
          radial-gradient(
            circle at 85% 80%,
            #E8E8D8 0%,
            ${C.bg} 50%
          )
        `,
      }}
    >
      {/* Background blobs */}

      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          top: -140,
          left: -120,
          background: C.panel2,
          opacity: 0.2,
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
          opacity: 0.18,
          filter: "blur(100px)",
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        @keyframes shake {
          10%, 90% {
            transform: translateX(-1px);
          }

          20%, 80% {
            transform: translateX(2px);
          }

          30%, 50%, 70% {
            transform: translateX(-4px);
          }

          40%, 60% {
            transform: translateX(4px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .auth-shake {
          animation: shake 0.45s ease-in-out;
        }

        .auth-in {
          animation: fadeIn 0.35s ease-out;
        }
      `}</style>

      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-8 sm:p-12"
        style={{
          backgroundColor: C.glass,
          border: `1px solid ${C.glassBorder}`,
          boxShadow:
            "0 20px 60px rgba(91,50,31,0.15)",
        }}
      >
        {/* Logo */}

        <div className="flex items-center gap-2 mb-8">
          <ShieldCheck
            size={20}
            color={C.accent}
          />

          <span
            className="text-lg font-semibold"
            style={{
              color: C.text,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Sih
          </span>
        </div>

        <div
          key={renderKey}
          className={`${shake ? "auth-shake" : ""} auth-in`}
        >
          {/* ================= SIGNUP ================= */}

          {view === "signup" && (
            <>
              <h1
                className="text-3xl font-semibold leading-tight mb-2"
                style={{
                  fontFamily:
                    "'Space Grotesk', sans-serif",
                }}
              >
                Create your
                <br />
                account
              </h1>

              <p
                className="text-sm mb-8"
                style={{ color: C.muted }}
              >
                Set up access in under a minute.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
              >
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
                  type={
                    showPw
                      ? "text"
                      : "password"
                  }
                  value={fields.password}
                  onChange={update("password")}
                  error={errors.password}
                  focused={focused}
                  setFocused={setFocused}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() =>
                        setShowPw((s) => !s)
                      }
                    >
                      {showPw ? (
                        <EyeOff
                          size={16}
                          color={C.muted}
                        />
                      ) : (
                        <Eye
                          size={16}
                          color={C.muted}
                        />
                      )}
                    </button>
                  }
                />

                <Field
                  id="confirm"
                  label="Confirm password"
                  icon={Lock}
                  type={
                    showPw2
                      ? "text"
                      : "password"
                  }
                  value={fields.confirm}
                  onChange={update("confirm")}
                  error={errors.confirm}
                  focused={focused}
                  setFocused={setFocused}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() =>
                        setShowPw2((s) => !s)
                      }
                    >
                      {showPw2 ? (
                        <EyeOff
                          size={16}
                          color={C.muted}
                        />
                      ) : (
                        <Eye
                          size={16}
                          color={C.muted}
                        />
                      )}
                    </button>
                  }
                />

                <PrimaryButton loading={loading}>
                  Create account
                </PrimaryButton>

                <p
                  className="mt-6 text-center text-sm"
                  style={{ color: C.muted }}
                >
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      switchView("login")
                    }
                    className="font-semibold"
                    style={{
                      color: C.accent,
                    }}
                  >
                    Log in
                  </button>
                </p>
              </form>
            </>
          )}

          {/* ================= LOGIN ================= */}

          {view === "login" && (
            <>
              <h1
                className="text-3xl font-semibold leading-tight mb-2"
                style={{
                  fontFamily:
                    "'Space Grotesk', sans-serif",
                }}
              >
                Welcome back
                <br />
                to Sih
              </h1>

              <p
                className="text-sm mb-8"
                style={{ color: C.muted }}
              >
                Enter your credentials to reach
                your dashboard.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
              >
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
                  type={
                    showPw
                      ? "text"
                      : "password"
                  }
                  value={fields.password}
                  onChange={update("password")}
                  error={errors.password}
                  focused={focused}
                  setFocused={setFocused}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() =>
                        setShowPw((s) => !s)
                      }
                    >
                      {showPw ? (
                        <EyeOff
                          size={16}
                          color={C.muted}
                        />
                      ) : (
                        <Eye
                          size={16}
                          color={C.muted}
                        />
                      )}
                    </button>
                  }
                />

                <div className="flex justify-end mb-5">
                  <button
                    type="button"
                    onClick={() =>
                      switchView("forgot")
                    }
                    className="text-xs font-medium"
                    style={{
                      color: C.accent,
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <PrimaryButton loading={loading}>
                  Log in
                </PrimaryButton>

                <p
                  className="mt-6 text-center text-sm"
                  style={{ color: C.muted }}
                >
                  New here?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      switchView("signup")
                    }
                    className="font-semibold"
                    style={{
                      color: C.accent,
                    }}
                  >
                    Create an account
                  </button>
                </p>
              </form>
            </>
          )}

          {/* ================= FORGOT ================= */}

          {view === "forgot" && (
            <>
              <h1
                className="text-3xl font-semibold leading-tight mb-2"
                style={{
                  fontFamily:
                    "'Space Grotesk', sans-serif",
                }}
              >
                Reset your
                <br />
                password
              </h1>

              <p
                className="text-sm mb-8"
                style={{ color: C.muted }}
              >
                Enter your email and we'll send
                you a recovery link.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
              >
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

                <PrimaryButton loading={loading}>
                  Send reset link
                </PrimaryButton>

                <button
                  type="button"
                  onClick={() =>
                    switchView("login")
                  }
                  className="mt-6 flex items-center gap-2 mx-auto text-sm"
                  style={{ color: C.muted }}
                >
                  <ArrowLeft size={14} />
                  Back to log in
                </button>
              </form>
            </>
          )}

          {/* ================= SENT ================= */}

          {view === "sent" && (
            <>
              <h1
                className="text-3xl font-semibold leading-tight mb-2"
                style={{
                  fontFamily:
                    "'Space Grotesk', sans-serif",
                }}
              >
                Check your
                <br />
                inbox
              </h1>

              <p
                className="text-sm mb-8"
                style={{ color: C.muted }}
              >
                If an account matches, a reset
                link has been sent.
              </p>

              <PrimaryButton
                loading={false}
                type="button"
                onClick={() =>
                  switchView("reset")
                }
              >
                Continue to reset
              </PrimaryButton>

              <button
                type="button"
                onClick={() =>
                  switchView("login")
                }
                className="mt-6 flex items-center gap-2 mx-auto text-sm"
                style={{ color: C.muted }}
              >
                <ArrowLeft size={14} />
                Back to log in
              </button>
            </>
          )}

          {/* ================= RESET ================= */}

          {view === "reset" && (
            <>
              <h1
                className="text-3xl font-semibold leading-tight mb-2"
                style={{
                  fontFamily:
                    "'Space Grotesk', sans-serif",
                }}
              >
                Choose a new
                <br />
                password
              </h1>

              <p
                className="text-sm mb-8"
                style={{ color: C.muted }}
              >
                Create a new password for your
                account.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
              >
                <Field
                  id="password"
                  label="New password"
                  icon={Lock}
                  type={
                    showPw
                      ? "text"
                      : "password"
                  }
                  value={fields.password}
                  onChange={update("password")}
                  error={errors.password}
                  focused={focused}
                  setFocused={setFocused}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() =>
                        setShowPw((s) => !s)
                      }
                    >
                      {showPw ? (
                        <EyeOff
                          size={16}
                          color={C.muted}
                        />
                      ) : (
                        <Eye
                          size={16}
                          color={C.muted}
                        />
                      )}
                    </button>
                  }
                />

                <Field
                  id="confirm"
                  label="Confirm new password"
                  icon={Lock}
                  type={
                    showPw2
                      ? "text"
                      : "password"
                  }
                  value={fields.confirm}
                  onChange={update("confirm")}
                  error={errors.confirm}
                  focused={focused}
                  setFocused={setFocused}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() =>
                        setShowPw2((s) => !s)
                      }
                    >
                      {showPw2 ? (
                        <EyeOff
                          size={16}
                          color={C.muted}
                        />
                      ) : (
                        <Eye
                          size={16}
                          color={C.muted}
                        />
                      )}
                    </button>
                  }
                />

                <PrimaryButton loading={loading}>
                  Update password
                </PrimaryButton>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

