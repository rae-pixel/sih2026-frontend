import { useState } from "react";

import {
  Menu,
  Search,
  Bell,
  Mail,
  ChevronDown,
  ArrowLeft,
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  MessageSquare,
  BarChart3,
  Wallet,
  Users,
  Store,
  Settings,
  Sparkles,
  IndianRupee,
  TrendingUp,
  CheckCircle2,
  Calculator,
} from "lucide-react";

function DynamicPricingAssistant({onComplete, onBack }) {
  const [materialCost, setMaterialCost] = useState("");
  const [labourCost, setLabourCost] = useState("");
  const [otherCost, setOtherCost] = useState("");
  const [marketTrend, setMarketTrend] = useState("Growing");

  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const [accepted, setAccepted] = useState(false);

  const calculatePrice = () => {
    const material = Number(materialCost) || 0;
    const labour = Number(labourCost) || 0;
    const other = Number(otherCost) || 0;

    const totalCost = material + labour + other;

    if (totalCost <= 0) {
      alert("Please enter at least one cost.");
      return;
    }

    let multiplier = 1.4;

    if (marketTrend === "Growing") {
      multiplier = 1.6;
    } else if (marketTrend === "Stable") {
      multiplier = 1.45;
    } else if (marketTrend === "Declining") {
      multiplier = 1.3;
    }

    const price = Math.ceil((totalCost * multiplier) / 10) * 10;

    setSuggestedPrice(price);
    setAccepted(false);
  };

  const totalCost =
    (Number(materialCost) || 0) +
    (Number(labourCost) || 0) +
    (Number(otherCost) || 0);

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: "#FAF7F2",
        color: "#2E241F",
      }}
    >
      {/* ================= SIDEBAR ================= */}

      <aside
        className="hidden lg:flex w-56 flex-col border-r"
        style={{
          backgroundColor: "#FFFDF9",
          borderColor: "#E9E0D7",
        }}
      >
        {/* Logo */}

        <div className="px-6 py-7">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "#F4E3D7",
              }}
            >
              <Store
                size={22}
                color="#A94F2A"
              />
            </div>

            <div>
              <h1
                className="text-xl font-semibold"
                style={{
                  color: "#8F4325",
                }}
              >
                Sih
              </h1>

              <p className="text-[10px] text-gray-500">
                Bridging Hands. Building Futures.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}

        <nav className="px-4 space-y-1">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
          />

          <SidebarItem
            icon={ShoppingBag}
            label="My Catalog"
          />

          <SidebarItem
            icon={ClipboardList}
            label="Orders"
          />

          <SidebarItem
            icon={MessageSquare}
            label="Messages"
          />

          <SidebarItem
            icon={BarChart3}
            label="Analytics"
          />

          <SidebarItem
            icon={Wallet}
            label="Payouts"
          />

          <SidebarItem
            icon={Users}
            label="Buyer Connections"
          />

          <SidebarItem
            icon={Store}
            label="Profile & Store"
          />

          <SidebarItem
            icon={Settings}
            label="Settings"
          />
        </nav>

        {/* AI CARD */}

        <div className="mt-auto p-4">
          <div
            className="rounded-2xl p-4"
            style={{
              backgroundColor: "#F8E9DF",
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{
                backgroundColor: "#FFF8F3",
              }}
            >
              <Sparkles
                size={18}
                color="#A94F2A"
              />
            </div>

            <p className="text-sm font-semibold mb-1">
              AI Pricing
            </p>

            <p className="text-xs text-gray-500">
              Smart pricing suggestions.
            </p>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}

      <main className="flex-1 min-w-0">
        {/* HEADER */}

        <header
          className="h-20 px-5 md:px-8 flex items-center justify-between border-b"
          style={{
            backgroundColor: "#FFFDF9",
            borderColor: "#E9E0D7",
          }}
        >
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <Menu size={22} />
            </button>

            <div
              className="hidden sm:flex items-center gap-2 rounded-xl px-4 py-2.5 w-64"
              style={{
                backgroundColor: "#FAF7F2",
              }}
            >
              <Search
                size={17}
                color="#8A817A"
              />

              <input
                placeholder="Search anything..."
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative">
              <Bell size={20} />

              <span
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[9px] flex items-center justify-center"
                style={{
                  backgroundColor: "#A94F2A",
                  color: "#fff",
                }}
              >
                3
              </span>
            </button>

            <Mail size={20} />

            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "#EBD5C5",
                }}
              >
                A
              </div>

              <div className="hidden md:block">
                <p className="text-sm font-semibold">
                  Artisan
                </p>

                <p className="text-[10px] text-gray-500">
                  Seller
                </p>
              </div>

              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}

        <section className="p-5 md:p-8 max-w-7xl mx-auto">
             <button
    onClick={onBack}
    className="flex items-center gap-2 text-sm font-semibold mb-5"
    style={{ color: "#A94F2A" }}
  >
    <ArrowLeft size={18} />
    Back to Image
  </button>

          {/* HEADING */}

          <div className="mb-7">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles
                size={18}
                color="#A94F2A"
              />

              <span
                className="text-xs font-semibold uppercase tracking-wide"
                style={{
                  color: "#A94F2A",
                }}
              >
                AI Pricing Assistant
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold">
              Find the right price
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Get a smart price suggestion based on
              your costs and current market trends.
            </p>
          </div>

          {/* GRID */}

          <div className="grid lg:grid-cols-3 gap-6">

            {/* ================= COST FORM ================= */}

            <div
              className="lg:col-span-2 rounded-2xl p-6 md:p-8 border"
              style={{
                backgroundColor: "#FFFDF9",
                borderColor: "#E9E0D7",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: "#F4E3D7",
                  }}
                >
                  <Calculator
                    size={21}
                    color="#A94F2A"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Product costs
                  </h2>

                  <p className="text-xs text-gray-500">
                    Enter your approximate production costs.
                  </p>
                </div>
              </div>

              {/* MATERIAL */}

              <CostInput
                label="Material cost"
                value={materialCost}
                setValue={setMaterialCost}
                placeholder="e.g. 500"
              />

              {/* LABOUR */}

              <CostInput
                label="Labour cost"
                value={labourCost}
                setValue={setLabourCost}
                placeholder="e.g. 300"
              />

              {/* OTHER */}

              <CostInput
                label="Other costs"
                value={otherCost}
                setValue={setOtherCost}
                placeholder="e.g. 100"
              />

              {/* TOTAL */}

              <div
                className="rounded-xl p-4 mt-5 flex items-center justify-between"
                style={{
                  backgroundColor: "#FAF7F2",
                }}
              >
                <span className="text-sm font-medium">
                  Total production cost
                </span>

                <span
                  className="text-lg font-semibold"
                  style={{
                    color: "#A94F2A",
                  }}
                >
                  ₹{totalCost.toLocaleString("en-IN")}
                </span>
              </div>

              {/* MARKET TREND */}

              <div className="mt-6">
                <label className="text-sm font-semibold">
                  Current market trend
                </label>

                <p className="text-xs text-gray-500 mt-1 mb-3">
                  Select how demand for this type of product
                  is currently performing.
                </p>

                <div className="grid grid-cols-3 gap-3">

                  <TrendButton
                    label="Growing"
                    selected={marketTrend === "Growing"}
                    onClick={() =>
                      setMarketTrend("Growing")
                    }
                  />

                  <TrendButton
                    label="Stable"
                    selected={marketTrend === "Stable"}
                    onClick={() =>
                      setMarketTrend("Stable")
                    }
                  />

                  <TrendButton
                    label="Declining"
                    selected={marketTrend === "Declining"}
                    onClick={() =>
                      setMarketTrend("Declining")
                    }
                  />

                </div>
              </div>

              {/* CALCULATE */}

              <button
                onClick={calculatePrice}
                className="w-full mt-6 rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#A94F2A",
                  color: "#fff",
                }}
              >
                <Sparkles size={18} />
                Generate AI Price
              </button>
            </div>

            {/* ================= PRICE RESULT ================= */}

            <div className="space-y-6">

              <div
                className="rounded-2xl p-6 border"
                style={{
                  backgroundColor: "#FFFDF9",
                  borderColor: "#E9E0D7",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: "#F4E3D7",
                  }}
                >
                  <TrendingUp
                    size={21}
                    color="#A94F2A"
                  />
                </div>

                <h2 className="text-lg font-semibold mb-2">
                  Suggested price
                </h2>

                {!suggestedPrice ? (
                  <div>
                    <p className="text-sm text-gray-500">
                      Your recommended selling price
                      will appear here.
                    </p>

                    <div
                      className="mt-5 rounded-xl p-5 text-center"
                      style={{
                        backgroundColor: "#FAF7F2",
                      }}
                    >
                      <IndianRupee
                        size={25}
                        color="#B8ADA4"
                        className="mx-auto mb-2"
                      />

                      <p className="text-xs text-gray-400">
                        Waiting for cost details
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>

                    <div
                      className="rounded-xl p-5 text-center"
                      style={{
                        backgroundColor: "#F8E9DF",
                      }}
                    >
                      <p className="text-xs text-gray-500 mb-1">
                        AI recommended price
                      </p>

                      <p
                        className="text-4xl font-bold"
                        style={{
                          color: "#A94F2A",
                        }}
                      >
                        ₹{suggestedPrice.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* RATIONALE */}

                    <div className="mt-5">
                      <p className="text-sm font-semibold mb-3">
                        Why this price?
                      </p>

                      <div className="space-y-3">

                        <Reason
                          text={`Production cost is ₹${totalCost.toLocaleString(
                            "en-IN"
                          )}.`}
                        />

                        <Reason
                          text={`Market trend is ${marketTrend.toLowerCase()}.`}
                        />

                        <Reason
                          text={
                            marketTrend === "Growing"
                              ? "Higher demand supports a stronger margin."
                              : marketTrend === "Stable"
                              ? "A balanced margin is recommended for stable demand."
                              : "A competitive price is recommended to maintain sales."
                          }
                        />

                      </div>
                    </div>

                    {/* ACCEPT */}

                    <button
  onClick={() => {
    setAccepted(true);
    onComplete?.(suggestedPrice);
  }}
                      className="w-full mt-5 rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: accepted
                          ? "#E8F0E5"
                          : "#A94F2A",
                        color: accepted
                          ? "#3E5C38"
                          : "#fff",
                      }}
                    >
                      <CheckCircle2 size={18} />

                      {accepted
                        ? "Price accepted"
                        : "Use this price"}
                    </button>

                  </div>
                )}
              </div>

              {/* INFO CARD */}

              <div
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "#E8F0E5",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles
                    size={18}
                    color="#4E7045"
                  />

                  <h3
                    className="font-semibold"
                    style={{
                      color: "#3E5C38",
                    }}
                  >
                    Pricing tip
                  </h3>
                </div>

                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: "#596653",
                  }}
                >
                  A good selling price should cover
                  production costs while leaving enough
                  margin to support your craft business.
                </p>
              </div>

            </div>
          </div>

          {/* STATUS */}

          {accepted && (
            <div
              className="mt-6 rounded-2xl px-5 py-4 flex items-center gap-3 border"
              style={{
                backgroundColor: "#FFFDF9",
                borderColor: "#E9E0D7",
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "#E8F0E5",
                }}
              >
                <CheckCircle2
                  size={18}
                  color="#4E7045"
                />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Price ready for your listing
                </p>

                <p className="text-xs text-gray-500">
                  You can use this price when reviewing
                  your product before publishing.
                </p>
              </div>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}

/* ================= COST INPUT ================= */

function CostInput({
  label,
  value,
  setValue,
  placeholder,
}) {
  return (
    <div className="mb-5">
      <label className="text-sm font-semibold block mb-2">
        {label}
      </label>

      <div
        className="flex items-center rounded-xl px-4 border"
        style={{
          backgroundColor: "#FAF7F2",
          borderColor: "#E9E0D7",
        }}
      >
        <span
          className="text-sm font-semibold mr-2"
          style={{
            color: "#A94F2A",
          }}
        >
          ₹
        </span>

        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full py-3 bg-transparent outline-none text-sm"
        />
      </div>
    </div>
  );
}

/* ================= TREND BUTTON ================= */

function TrendButton({
  label,
  selected,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl py-3 text-sm font-semibold border transition"
      style={{
        backgroundColor: selected
          ? "#F4E3D7"
          : "#FAF7F2",
        borderColor: selected
          ? "#A94F2A"
          : "#E9E0D7",
        color: selected
          ? "#A94F2A"
          : "#6F665F",
      }}
    >
      {label}
    </button>
  );
}

/* ================= REASON ================= */

function Reason({ text }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2
        size={15}
        color="#4E7045"
        className="mt-0.5 shrink-0"
      />

      <p className="text-xs text-gray-600">
        {text}
      </p>
    </div>
  );
}

/* ================= SIDEBAR ================= */

function SidebarItem({
  icon: Icon,
  label,
}) {
  return (
    <button
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
      style={{
        color: "#5F5751",
      }}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}

export default DynamicPricingAssistant;
