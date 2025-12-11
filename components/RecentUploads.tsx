"use client";

import { useState } from "react";
import { FaThLarge, FaTh, FaThList, FaBorderAll } from "react-icons/fa";
import { FiSquare, FiMaximize } from "react-icons/fi";
import { CiGrid2H, CiGrid2V, CiGrid42 } from "react-icons/ci";
import { BsGrid } from "react-icons/bs";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { MdOutlineFileDownload } from "react-icons/md";

export default function RecentUploads({ urls }: { urls: string[] }) {
  const [square, setSquare] = useState(false);
  const [gridMode, setGridMode] = useState<1 | 2 | 3 | "4-responsive" | "auto">(
    "auto"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!urls.length) return null;

  const generateBigIndexes = (count: number) => {
    const big = [0];
    const jumps = [7, 5];
    for (let n = 1; n < count; n++) {
      big.push(big[n - 1] + jumps[(n - 1) % 2]);
    }
    return big;
  };

  const patternBig = generateBigIndexes(urls.length);

  return (
    <>
      <div
        className={`grid gap-2 p-2 ${
          gridMode === "auto"
            ? "grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            : gridMode === "4-responsive"
            ? "grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
            : gridMode === 1
            ? "grid-cols-1"
            : gridMode === 2
            ? "grid-cols-2"
            : gridMode === 3
            ? "grid-cols-3"
            : "grid-cols-4"
        }`}
        style={{}}
      >
        {[...urls]
          // .sort(() => Math.random() - 0.5)
          .map((url, i) => {
            const isBig = patternBig.includes(i);

            return url ? (
              <div
                key={i}
                onClick={() => {
                  setSelectedImage(url);
                  setModalOpen(true);
                }}
                className={
                  gridMode === "auto"
                    ? isBig
                      ? "rounded-2xl md:rounded-3xl overflow-hidden active:scale-90 duration-300 col-span-2 row-span-2"
                      : "rounded-2xl md:rounded-3xl overflow-hidden active:scale-90 duration-300"
                    : "rounded-2xl md:rounded-3xl overflow-hidden active:scale-90 duration-300"
                }
              >
                <img
                  src={url.replace("/upload/", "/upload/q_50,f_auto/")}
                  alt={`Uploaded ${i + 1}`}
                  className={`w-full cursor-pointer object-cover object-bottom hover:scale-110 brightness-90 duration-1000 ease-out ${
                    square ? "aspect-square" : "h-full"
                  }`}
                />
              </div>
            ) : null;
          })}
      </div>

      <div className="sticky bottom-0 p-2 z-20">
        <div className="flex gap-1 justify-between w-fit">
          <div className="flex gap-1 p-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
            <button
              onClick={() => setGridMode(1)}
              className={`size-8 flex items-center justify-center rounded-full border-white/40 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                gridMode === 1
                  ? "bg-black text-white"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <CiGrid2H size={16} />
            </button>
            <button
              onClick={() => setGridMode(2)}
              className={`size-8 flex items-center justify-center rounded-full border-white/40 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                gridMode === 2
                  ? "bg-black text-white"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <CiGrid2V size={16} />
            </button>
            <button
              onClick={() => setGridMode(3)}
              className={`size-8 flex items-center justify-center rounded-full border-white/40 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                gridMode === 3
                  ? "bg-black text-white"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <BsGrid size={16} />
            </button>
            <button
              onClick={() => setGridMode("4-responsive")}
              className={`size-8 flex items-center justify-center rounded-full border-white/40 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                gridMode === "4-responsive"
                  ? "bg-black text-white"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <TfiLayoutGrid3 size={14} />
            </button>
            <button
              onClick={() => setGridMode("auto")}
              className={`size-8 flex items-center justify-center rounded-full border-white/40 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                gridMode === "auto"
                  ? "bg-black text-white"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <CiGrid42 size={16} />
            </button>
          </div>
          <div className="flex gap-1 p-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
            <button
              onClick={() => setSquare(true)}
              className={`size-8 flex items-center justify-center rounded-full border-white/40 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                square === true
                  ? "bg-black text-white"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <FiSquare size={16} />
            </button>
            <button
              onClick={() => setSquare(false)}
              className={`size-8 flex items-center justify-center rounded-full border-white/40 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                square === false
                  ? "bg-black text-white"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <FiMaximize size={16} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 duration-500 ${
          modalOpen && selectedImage && "p-5"
        } ${modalOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={() => setModalOpen(false)}
      >
        {selectedImage && (
          <div className="relative py-20 space-y-2">
            <img
              key={selectedImage}
              src={selectedImage.replace("/upload/", "/upload/q_auto,f_auto/")}
              className={`max-h-[85vh] max-w-[85vw] rounded-2xl shadow-2xl bg-black`}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="abso lute bottom-0 left-0 flex justify-end h-10 w-full">
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!selectedImage) return;
                  try {
                    const response = await fetch(selectedImage.replace("/upload/", "/upload/q_auto,f_auto/"));
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = selectedImage.split('/').pop() || 'download.jpg';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  } catch (err) {
                    console.error("Download failed", err);
                  }
                }}
                className={`h-9 flex items-center justify-center rounded-full border-white/40 cursor-pointer active:scale-90 hover:scale-105 duration-700 border bg-black/50 hover:bg-black overflow-hidden ${
                  modalOpen ? "delay-300 w-30" : "blur-2xl w-5"
                }`}
              >
                <MdOutlineFileDownload className="me-1 text-lg" />
                <span>Download</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
