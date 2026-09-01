import { useState } from "react";
import {
  User,
  MapPin,
  Languages,
  Palette,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const C = {
  bg: "#F8F3EC",
  accent: "#B85C38",
  accentSoft: "#F3DED0",
  text: "#2F2924",
  muted: "#746B63",
  border: "#E5D8CA",
  danger: "#C94C3D",
  field: "#FFFFFF",
};

function ArtisanProfile({ onComplete }) {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [craft, setCraft] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");

  const [nameError, setNameError] = useState("");
  const [step2Error, setStep2Error] = useState("");

  function handleStep1() {
    if (!name.trim()) {
      setNameError("Please enter your name");
      return;
    }

    setStep(2);
  }

  function handleStep2() {
    if (
      !craft ||
      !region.trim() ||
      !language
    ) {
      setStep2Error(
        "Please complete all fields"
      );
      return;
    }

    setStep(3);
  }

  return (
    <div
      className="w-full max-w-2xl mx-auto"
      style={{
        color: C.text,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: C.accent }}
        >
          Artisan onboarding
        </span>

        <span
          className="text-xs"
          style={{ color: C.muted }}
        >
          Step {step} of 3
        </span>
      </div>

      {/* ================= STEP 1 ================= */}

      {step === 1 && (
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
            artisan profile
          </h1>

          <p
            className="text-sm mb-8"
            style={{ color: C.muted }}
          >
            Tell us about yourself and your craft.
          </p>

          <label className="block text-sm font-medium mb-2">
            Full name
          </label>

          <div
            className="flex items-center rounded-lg px-3 mb-2"
            style={{
              backgroundColor: C.field,
              border: `1.5px solid ${
                nameError
                  ? C.danger
                  : C.border
              }`,
            }}
          >
            <User
              size={17}
              color={
                nameError
                  ? C.danger
                  : C.muted
              }
            />

            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              className="w-full bg-transparent outline-none py-3 px-2.5 text-sm"
            />
          </div>

          {nameError && (
            <p
              className="text-xs mb-4"
              style={{ color: C.danger }}
            >
              {nameError}
            </p>
          )}

          <button
            onClick={handleStep1}
            className="w-full rounded-lg py-3 font-semibold flex items-center justify-center gap-2"
            style={{
              backgroundColor: C.accent,
              color: "#fff",
            }}
          >
            Continue
            <ArrowRight size={16} />
          </button>
        </>
      )}

      {/* ================= STEP 2 ================= */}

      {step === 2 && (
        <>
          <h1
            className="text-3xl font-semibold leading-tight mb-2"
            style={{
              fontFamily:
                "'Space Grotesk', sans-serif",
            }}
          >
            Tell us about
            <br />
            your craft
          </h1>

          <p
            className="text-sm mb-8"
            style={{ color: C.muted }}
          >
            We'll use this information to connect
            your products with buyers.
          </p>

          {/* CRAFT */}

          <label className="block text-sm font-medium mb-2">
            Craft type
          </label>

          <div
            className="flex items-center rounded-lg px-3 mb-5"
            style={{
              backgroundColor: C.field,
              border: `1.5px solid ${C.border}`,
            }}
          >
            <Palette
              size={17}
              color={C.muted}
            />

            <select
              value={craft}
              onChange={(e) => {
                setCraft(e.target.value);
                setStep2Error("");
              }}
              className="w-full bg-transparent outline-none py-3 px-2.5 text-sm"
            >
              <option value="">
                Select your craft
              </option>
              <option value="Pottery">
                Pottery
              </option>
              <option value="Handloom">
                Handloom
              </option>
              <option value="Woodwork">
                Woodwork
              </option>
              <option value="Embroidery">
                Embroidery
              </option>
              <option value="Jewellery">
                Jewellery
              </option>
            </select>
          </div>

          {/* REGION */}

          <label className="block text-sm font-medium mb-2">
            Region
          </label>

          <div
            className="flex items-center rounded-lg px-3 mb-5"
            style={{
              backgroundColor: C.field,
              border: `1.5px solid ${C.border}`,
            }}
          >
            <MapPin
              size={17}
              color={C.muted}
            />

            <input
              type="text"
              value={region}
              placeholder="Enter your region"
              onChange={(e) => {
                setRegion(e.target.value);
                setStep2Error("");
              }}
              className="w-full bg-transparent outline-none py-3 px-2.5 text-sm"
            />
          </div>

          {/* LANGUAGE */}

          <label className="block text-sm font-medium mb-2">
            Preferred language
          </label>

          <div
            className="flex items-center rounded-lg px-3 mb-6"
            style={{
              backgroundColor: C.field,
              border: `1.5px solid ${C.border}`,
            }}
          >
            <Languages
              size={17}
              color={C.muted}
            />

            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setStep2Error("");
              }}
              className="w-full bg-transparent outline-none py-3 px-2.5 text-sm"
            >
              <option value="">
                Select your language
              </option>

              <option value="Hindi">
                Hindi
              </option>

              <option value="English">
                English
              </option>

              <option value="Bengali">
                Bengali
              </option>

              <option value="Tamil">
                Tamil
              </option>

              <option value="Telugu">
                Telugu
              </option>

              <option value="Marathi">
                Marathi
              </option>
            </select>
          </div>

          {step2Error && (
            <p
              className="text-xs mb-4"
              style={{ color: C.danger }}
            >
              {step2Error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="w-1/3 rounded-lg py-3 font-semibold flex items-center justify-center gap-2"
              style={{
                backgroundColor:
                  C.accentSoft,
                color: C.accent,
              }}
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <button
              onClick={handleStep2}
              className="flex-1 rounded-lg py-3 font-semibold flex items-center justify-center gap-2"
              style={{
                backgroundColor: C.accent,
                color: "#fff",
              }}
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}

      {/* ================= STEP 3 ================= */}

      {step === 3 && (
        <>
          <h1
            className="text-3xl font-semibold leading-tight mb-2"
            style={{
              fontFamily:
                "'Space Grotesk', sans-serif",
            }}
          >
            Review your
            <br />
            artisan profile
          </h1>

          <p
            className="text-sm mb-8"
            style={{ color: C.muted }}
          >
            Make sure your information is correct
            before continuing.
          </p>

          <div className="space-y-3 mb-8">
            <ReviewItem
              icon={User}
              label="Full name"
              value={name}
            />

            <ReviewItem
              icon={Palette}
              label="Craft type"
              value={craft}
            />

            <ReviewItem
              icon={MapPin}
              label="Region"
              value={region}
            />

            <ReviewItem
              icon={Languages}
              label="Preferred language"
              value={language}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="w-1/3 rounded-lg py-3 font-semibold flex items-center justify-center gap-2"
              style={{
                backgroundColor:
                  C.accentSoft,
                color: C.accent,
              }}
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <button
              onClick={() => {
                console.log(
                  "Complete profile clicked"
                );

                if (typeof onComplete === "function") {
                  onComplete();
                }
              }}
              className="flex-1 rounded-lg py-3 font-semibold flex items-center justify-center gap-2"
              style={{
                backgroundColor: C.accent,
                color: "#fff",
              }}
            >
              Complete profile
              <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function ReviewItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl p-4"
      style={{
        backgroundColor: "#FFFDF9",
        border: "1px solid #E5D8CA",
        boxShadow:
          "0 4px 15px rgba(91,50,31,0.05)",
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{
          backgroundColor: C.accentSoft,
        }}
      >
        <Icon
          size={19}
          color={C.accent}
        />
      </div>

      <div>
        <p
          className="text-xs mb-1"
          style={{ color: C.muted }}
        >
          {label}
        </p>

        <p className="font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}

export default ArtisanProfile;
