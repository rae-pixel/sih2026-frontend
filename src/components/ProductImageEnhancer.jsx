import { useRef, useState } from "react";

import {
  Menu,
  Search,
  Bell,
  Mail,
  Camera,
  ChevronDown,
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
  Upload,
  Image as ImageIcon,
  WandSparkles,
  CheckCircle2,
  X,
  ArrowLeft,
} from "lucide-react";

function ProductImageEnhancer({onComplete, onBack }) {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const [image, setImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [enhanced, setEnhanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);

  // ================= IMAGE UPLOAD =================

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be smaller than 10MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    // Clean previous blob URL
    if (image?.startsWith("blob:")) {
      URL.revokeObjectURL(image);
    }

    setImage(imageUrl);
    setEnhancedImage(null);
    setEnhanced(false);
    setLoading(false);

    // Allow selecting the same file again
    e.target.value = "";
  };

  // ================= CAMERA =================

  const openCamera = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        alert("Camera is not supported by this browser.");
        return;
      }

      const mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
          },
          audio: false,
        });

      setStream(mediaStream);
      setCameraOpen(true);

      // Give React time to render video
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(() => {});
        }
      }, 100);
    } catch (error) {
      console.error("Camera access denied:", error);

      alert(
        "Unable to access camera. Please allow camera permission and try again."
      );
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      alert("Camera is not ready yet. Please try again.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      alert("Unable to capture photo.");
      return;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const imageUrl = canvas.toDataURL(
      "image/jpeg",
      0.92
    );

    setImage(imageUrl);
    setEnhancedImage(null);
    setEnhanced(false);
    setLoading(false);

    // Stop camera
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    setStream(null);
    setCameraOpen(false);
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    setStream(null);
    setCameraOpen(false);
  };

  // ================= AI ENHANCEMENT =================

  const handleEnhance = () => {
    if (!image || loading) return;

    setLoading(true);

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext("2d");

      if (!context) {
        setLoading(false);
        alert("Unable to enhance image.");
        return;
      }

      /*
        MOCK AI ENHANCEMENT

        In the real application this can later
        be replaced with an actual AI API.

        Currently we simulate:
        - cleaner background
        - improved lighting
        - better contrast
        - slightly improved saturation
      */

      context.fillStyle = "#F5F1EC";
      context.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      context.filter =
        "brightness(1.12) contrast(1.05) saturate(1.08)";

      context.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const enhancedUrl = canvas.toDataURL(
        "image/jpeg",
        0.92
      );

      setTimeout(() => {
        setEnhancedImage(enhancedUrl);
        setLoading(false);
        setEnhanced(true);
      }, 1500);
    };

    img.onerror = () => {
      setLoading(false);
      alert("Unable to process this image.");
    };

    img.src = image;
  };

  // ================= REMOVE IMAGE =================

  const removeImage = () => {
    if (image?.startsWith("blob:")) {
      URL.revokeObjectURL(image);
    }

    setImage(null);
    setEnhancedImage(null);
    setEnhanced(false);
    setLoading(false);
  };

  // ================= UI =================

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: "#FAF7F2",
        color: "#2E241F",
      }}
    >
      {/* ================= CAMERA MODAL ================= */}

      {cameraOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{
            backgroundColor: "rgba(0,0,0,0.75)",
          }}
        >
          <div
            className="w-full max-w-lg rounded-2xl p-5"
            style={{
              backgroundColor: "#FFFDF9",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Take product photo
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Position your product clearly inside
                  the frame.
                </p>
              </div>

              <button
                onClick={closeCamera}
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: "#F4E3D7",
                  color: "#A94F2A",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: "#000",
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full"
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={closeCamera}
                className="flex-1 rounded-xl py-3 font-semibold"
                style={{
                  backgroundColor: "#F4E3D7",
                  color: "#A94F2A",
                }}
              >
                Cancel
              </button>

              <button
                onClick={capturePhoto}
                className="flex-1 rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#A94F2A",
                  color: "#fff",
                }}
              >
                <Camera size={18} />
                Capture Photo
              </button>
            </div>
          </div>
        </div>
      )}

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
              AI Cataloging
            </p>

            <p className="text-xs text-gray-500 mb-3">
              Smart. Fast. Effortless.
            </p>

            <button
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="w-full rounded-lg py-2 text-xs font-semibold"
              style={{
                backgroundColor: "#A94F2A",
                color: "#fff",
              }}
            >
              Create New Listing
            </button>
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

        {/* CONTENT */}

        <section className="p-5 md:p-8 max-w-7xl mx-auto">
          {/* HEADING */}
<button
  onClick={onBack}
  className="flex items-center gap-2 mb-5 text-sm font-semibold"
  style={{ color: "#A94F2A" }}
>
  <ArrowLeft size={17} />
  Back
</button>

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
                AI Cataloging
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold">
              Add your product
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Upload a clear photo and let AI
              prepare it for your store.
            </p>
          </div>

          {/* GRID */}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* ================= UPLOAD ================= */}

            <div
              className="lg:col-span-2 rounded-2xl p-6 md:p-8 border"
              style={{
                backgroundColor: "#FFFDF9",
                borderColor: "#E9E0D7",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold">
                    Product image
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Add a high-quality image of
                    your handmade product.
                  </p>
                </div>

                {image && (
                  <button
                    onClick={removeImage}
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: "#F8E9DF",
                    }}
                  >
                    <X
                      size={17}
                      color="#A94F2A"
                    />
                  </button>
                )}
              </div>

              {!image ? (
                <div>
                  {/* UPLOAD BUTTON */}

                  <button
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="w-full min-h-[360px] rounded-2xl flex flex-col items-center justify-center border-2 border-dashed transition"
                    style={{
                      backgroundColor: "#FAF7F2",
                      borderColor: "#DCCFC5",
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: "#F4E3D7",
                      }}
                    >
                      <Upload
                        size={28}
                        color="#A94F2A"
                      />
                    </div>

                    <p className="font-semibold mb-1">
                      Upload product photo
                    </p>

                    <p className="text-xs text-gray-500 mb-4">
                      Drag & drop or click to browse
                    </p>

                    <span
                      className="text-[11px]"
                      style={{
                        color: "#8A817A",
                      }}
                    >
                      JPG, PNG or WEBP · Max 10MB
                    </span>
                  </button>

                  {/* CAMERA BUTTON */}

                  <button
                    onClick={openCamera}
                    className="w-full mt-3 rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "#F4E3D7",
                      color: "#A94F2A",
                    }}
                  >
                    <Camera size={18} />
                    Take photo with camera
                  </button>
                </div>
              ) : (
                <div
                  className="relative rounded-2xl overflow-hidden min-h-[360px] flex items-center justify-center"
                  style={{
                    backgroundColor: "#F3EEE8",
                  }}
                >
                  <img
                    src={
                      enhanced && enhancedImage
                        ? enhancedImage
                        : image
                    }
                    alt="Product"
                    className="max-h-[360px] max-w-full object-contain"
                  />

                  {enhanced && (
                    <div
                      className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: "#E5F4EA",
                        color: "#287A48",
                      }}
                    >
                      <CheckCircle2 size={14} />
                      AI Enhanced
                    </div>
                  )}
                </div>
              )}

              {/* HIDDEN FILE INPUT */}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* ENHANCE BUTTON */}

              {image && !enhanced && (
                <button
                  onClick={handleEnhance}
                  disabled={loading}
                  className="w-full mt-5 rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#A94F2A",
                    color: "#fff",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  <WandSparkles size={18} />

                  {loading
                    ? "Enhancing image..."
                    : "Enhance with AI"}
                </button>
              )}

              {/* AFTER ENHANCEMENT */}

              {enhanced && (
  <>
    <button
      onClick={() =>
        fileInputRef.current?.click()
      }
      className="w-full mt-5 rounded-xl py-3.5 font-semibold"
      style={{
        backgroundColor: "#F4E3D7",
        color: "#A94F2A",
      }}
    >
      Upload another image
    </button>

    <button
      onClick={() =>
  onComplete?.(
    enhancedImage || image
  )
}
      className="w-full mt-3 rounded-xl py-3.5 font-semibold"
      style={{
        backgroundColor: "#A94F2A",
        color: "#fff",
      }}
    >
      Continue to Pricing
    </button>
  </>
)}
            </div>

            {/* ================= RIGHT SIDE ================= */}

            <div className="space-y-6">
              {/* AI ENHANCEMENT CARD */}

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
                  <WandSparkles
                    size={21}
                    color="#A94F2A"
                  />
                </div>

                <h2 className="text-lg font-semibold mb-2">
                  AI Enhancement
                </h2>

                <p className="text-xs text-gray-500 leading-relaxed">
                  Our AI can improve your product
                  photo by cleaning the background
                  and improving lighting.
                </p>

                <div className="mt-5 space-y-3">
                  <Feature text="Clean background" />
                  <Feature text="Improve lighting" />
                  <Feature text="Highlight product details" />
                </div>
              </div>

              {/* PHOTO TIP */}

              <div
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "#E8F0E5",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon
                    size={18}
                    color="#4E7045"
                  />

                  <h3
                    className="font-semibold"
                    style={{
                      color: "#3E5C38",
                    }}
                  >
                    Photo tip
                  </h3>
                </div>

                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: "#596653",
                  }}
                >
                  Use natural lighting and make
                  sure your entire product is
                  visible. Clear photos help buyers
                  trust your products.
                </p>
              </div>
            </div>
          </div>

          {/* ================= STATUS ================= */}

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
                Ready to create your listing
              </p>

              <p className="text-xs text-gray-500">
                {image
                  ? enhanced
                    ? "Your product image has been enhanced and is ready."
                    : "Enhance your image to continue."
                  : "Add a product image to continue."}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ================= SIDEBAR ITEM =================

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

// ================= FEATURE =================

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: "#E8F0E5",
        }}
      >
        <CheckCircle2
          size={14}
          color="#4E7045"
        />
      </div>

      <span className="text-xs text-gray-600">
        {text}
      </span>
    </div>
  );
}

export default ProductImageEnhancer;
