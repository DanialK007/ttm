"use client";

import { useState } from "react";
import { FaThLarge, FaTh, FaThList, FaBorderAll } from "react-icons/fa";
import { FiSquare, FiMaximize } from "react-icons/fi";
import { CiGrid2H, CiGrid2V, CiGrid42 } from "react-icons/ci";
import { BsGrid } from "react-icons/bs";
import { TfiLayoutGrid3 } from "react-icons/tfi";

export default function RecentUploads({ urls }: { urls: string[] }) {
  const [square, setSquare] = useState(false);
  const [gridMode, setGridMode] = useState<1 | 2 | 3 | 4 | "auto">("auto");
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
      <div className="flex justify-between">
        <div className="flex gap-2 p-2">
          <button onClick={() => setGridMode(1)} className="size-10 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 rounded-full cursor-pointer active:scale-90 hover:scale-105 duration-300"><CiGrid2H size={18} /></button>
          <button onClick={() => setGridMode(2)} className="size-10 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 rounded-full cursor-pointer active:scale-90 hover:scale-105 duration-300"><CiGrid2V size={18} /></button>
          <button onClick={() => setGridMode(3)} className="size-10 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 rounded-full cursor-pointer active:scale-90 hover:scale-105 duration-300"><BsGrid size={18} /></button>
          <button onClick={() => setGridMode(4)} className="size-10 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 rounded-full cursor-pointer active:scale-90 hover:scale-105 duration-300"><TfiLayoutGrid3 size={16} /></button>
          <button onClick={() => setGridMode("auto")} className="size-10 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 rounded-full cursor-pointer active:scale-90 hover:scale-105 duration-300"><CiGrid42 size={18} /></button>
        </div>
        <div className="flex gap-2 p-2">
          <button
            onClick={() => setSquare(true)}
            className="size-10 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 rounded-full cursor-pointer hover:scale-105 active:scale-90 duration-300"
          >
            <FiSquare size={18} />
          </button>
          <button
            onClick={() => setSquare(false)}
            className="size-10 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 rounded-full cursor-pointer hover:scale-105 active:scale-90 duration-300"
          >
            <FiMaximize size={18} />
          </button>
        </div>
      </div>
      <div
        className={`grid gap-2 p-2 ${
          gridMode === "auto" ? "grid-cols-3 md:grid-cols-4 lg:grid-cols-6" : ""
        }`}
        style={
          gridMode !== "auto"
            ? { gridTemplateColumns: `repeat(${gridMode}, 1fr)` }
            : {}
        }
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
                      ? "rounded-2xl md:rounded-3xl overflow-hidden col-span-2 row-span-2"
                      : "rounded-2xl md:rounded-3xl overflow-hidden"
                    : "rounded-2xl md:rounded-3xl overflow-hidden"
                }
              >
                <img
                  src={url}
                  alt={`Uploaded ${i + 1}`}
                  className={`w-full cursor-pointer object-cover object-bottom hover:scale-110 brightness-90 duration-700 ease-out ${
                    square ? "aspect-square" : "h-full"
                  }`}
                />
              </div>
            ) : null;
          })}
      </div>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 duration-500 ${
          modalOpen && selectedImage && "p-4"
        } ${modalOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={() => setModalOpen(false)}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </>
  );
}
