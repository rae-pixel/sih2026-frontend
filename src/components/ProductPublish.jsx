import { useState } from "react";
import {
  Store,
  Image,
  Pencil,
  ArrowLeft,
  IndianRupee,
  Package,
  Tag,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function ProductPublish({ image, price , onBack }) {
  const [published, setPublished] = useState(false);

  const product = {
    name: "My Handmade Product",
    description:
      "A handmade product crafted with care and traditional techniques.",
    category: "Handicraft",
    craftType: "Artisan Craft",
    price: Number(price) || 0,
    stock: 1,
    region: "Your Region",
    image: image,
  };

  if (published) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{
          backgroundColor: "#FAF7F2",
          color: "#2E241F",
        }}
      >
        <div
          className="w-full max-w-md rounded-2xl p-8 text-center border"
          style={{
            backgroundColor: "#FFFDF9",
            borderColor: "#E9E0D7",
          }}
        >
          <div
            className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
            style={{
              backgroundColor: "#E8F0E5",
            }}
          >
            <CheckCircle2 size={32} color="#4E7045" />
          </div>

          <h1 className="text-2xl font-semibold mb-2">
            Product published!
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Your product is now ready to be listed in your catalog.
          </p>

          <button
            onClick={() => setPublished(false)}
            className="w-full rounded-xl py-3 font-semibold"
            style={{
              backgroundColor: "#A94F2A",
              color: "#fff",
            }}
          >
            Back to product
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#FAF7F2",
        color: "#2E241F",
      }}
    >
      {/* HEADER */}
      <header
        className="h-20 px-5 md:px-8 flex items-center border-b"
        style={{
          backgroundColor: "#FFFDF9",
          borderColor: "#E9E0D7",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#F4E3D7",
            }}
          >
            <Store size={21} color="#A94F2A" />
          </div>

          <div>
            <h1
              className="text-xl font-semibold"
              style={{ color: "#8F4325" }}
            >
              Sih
            </h1>

            <p className="text-[10px] text-gray-500">
              Product Catalog
            </p>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto p-5 md:p-8">
         {/* BACK */}
  <button
    onClick={onBack}
    className="flex items-center gap-2 text-sm font-semibold mb-5"
    style={{ color: "#A94F2A" }}
  >
    <ArrowLeft size={18} />
    Back to Pricing
  </button>

        {/* TITLE */}
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} color="#A94F2A" />

            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "#A94F2A" }}
            >
              Final Review
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold">
            Review your product
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Check your product details before publishing it to your catalog.
          </p>
        </div>

        {/* PRODUCT */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* IMAGE */}
          <div
            className="rounded-2xl p-5 border"
            style={{
              backgroundColor: "#FFFDF9",
              borderColor: "#E9E0D7",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">
                Product image
              </h2>

              <button
                className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: "#A94F2A" }}
              >
                <Pencil size={14} />
                Edit
              </button>
            </div>

            <div className="rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[360px] object-cover"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div
            className="rounded-2xl p-6 border"
            style={{
              backgroundColor: "#FFFDF9",
              borderColor: "#E9E0D7",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                Product details
              </h2>

              <button
                className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: "#A94F2A" }}
              >
                <Pencil size={14} />
                Edit
              </button>
            </div>

            <div className="space-y-5">
              <Detail
                icon={Tag}
                label="Product name"
                value={product.name}
              />

              <Detail
                icon={Package}
                label="Category"
                value={`${product.category} • ${product.craftType}`}
              />

              <Detail
                icon={IndianRupee}
                label="Selling price"
                value={`₹${product.price.toLocaleString("en-IN")}`}
              />

              <Detail
                icon={Package}
                label="Available stock"
                value={`${product.stock} items`}
              />

              <Detail
                icon={Store}
                label="Region"
                value={product.region}
              />
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div
          className="mt-6 rounded-2xl p-6 border"
          style={{
            backgroundColor: "#FFFDF9",
            borderColor: "#E9E0D7",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">
              Product description
            </h2>

            <button
              className="flex items-center gap-1 text-xs font-semibold"
              style={{ color: "#A94F2A" }}
            >
              <Pencil size={14} />
              Edit
            </button>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* PUBLISH */}
        <div
          className="mt-6 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          style={{
            backgroundColor: "#E8F0E5",
          }}
        >
          <div>
            <h3
              className="font-semibold"
              style={{ color: "#3E5C38" }}
            >
              Everything looks good?
            </h3>

            <p
              className="text-xs mt-1"
              style={{ color: "#596653" }}
            >
              Publish your product to make it available in your catalog.
            </p>
          </div>

          <button
            onClick={() => setPublished(true)}
            className="rounded-xl px-7 py-3 font-semibold flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#A94F2A",
              color: "#fff",
            }}
          >
            <CheckCircle2 size={18} />
            Publish Product
          </button>
        </div>

      </main>
    </div>
  );
}

/* ================= DETAIL ================= */

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{
          backgroundColor: "#F4E3D7",
        }}
      >
        <Icon size={17} color="#A94F2A" />
      </div>

      <div>
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="text-sm font-semibold mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
}

export default ProductPublish;
