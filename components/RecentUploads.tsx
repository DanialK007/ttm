"use client";

import { useState } from "react";
import { FaThLarge, FaTh, FaThList, FaBorderAll } from "react-icons/fa";
import { FiSquare, FiMaximize } from "react-icons/fi";
import { CiGrid2H, CiGrid2V, CiGrid42 } from "react-icons/ci";
import { BsFillGridFill, BsGrid } from "react-icons/bs";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { MdDelete, MdOutlineFileDownload } from "react-icons/md";

export default function RecentUploads({ urls }: { urls: string[] }) {
  const [square, setSquare] = useState(false);
  const [gridMode, setGridMode] = useState<1 | 2 | 3 | "4-responsive" | "auto">(
    "auto"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [grider, setGrider] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
        className={`grid gap-2 w-fit mx-auto p-2 ${
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
                      ? "rounded-2xl border max-w-2xl border-white/20 md:rounded-3xl overflow-hidden active:scale-90 duration-300 col-span-2 row-span-2"
                      : "rounded-2xl border max-w-2xl border-white/20 md:rounded-3xl overflow-hidden active:scale-90 duration-300"
                    : "rounded-2xl border max-w-2xl border-white/20 md:rounded-3xl overflow-hidden active:scale-90 duration-300"
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

      <div className="sticky w-fit bottom-0 p-2 z-20 flex flex-col-reverse md:flex-row md:items-center gap-1">
        <button
          onClick={() => setGrider(!grider)}
          className="bg-black/60 z-20 text-white backdrop-blur-sm size-10 flex items-center justify-center rounded-full border-white/20 cursor-pointer active:scale-90 hover:scale-105 duration-300 border"
        >
          <BsFillGridFill
            className={`duration-300 ${!grider && "rotate-180"}`}
          />
        </button>
        <div
          className={`flex flex-col md:flex-row gap-1 justify-between w-fit duration-500 ${
            grider
              ? ""
              : "translate-y-ful md:translate-y-0 md:-translate-x-full scale-50 blur-xl pointer-events-none"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-1 p-1 bg-black/40 backdrop-blur-sm rounded-full border border-white/20">
            <button
              onClick={() => setGridMode(1)}
              className={`size-8 flex items-center justify-center rounded-full border-white/25 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                gridMode === 1
                  ? "bg-black text-white border-white/50"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <CiGrid2H size={16} />
            </button>
            <button
              onClick={() => setGridMode(2)}
              className={`size-8 flex items-center justify-center rounded-full border-white/25 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                gridMode === 2
                  ? "bg-black text-white border-white/50"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <CiGrid2V size={16} />
            </button>
            <button
              onClick={() => setGridMode(3)}
              className={`size-8 flex items-center justify-center rounded-full border-white/25 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                gridMode === 3
                  ? "bg-black text-white border-white/50"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <BsGrid size={16} />
            </button>
            <button
              onClick={() => setGridMode("4-responsive")}
              className={`size-8 flex items-center justify-center rounded-full border-white/25 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                gridMode === "4-responsive"
                  ? "bg-black text-white border-white/50"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <TfiLayoutGrid3 size={14} />
            </button>
            <button
              onClick={() => setGridMode("auto")}
              className={`size-8 flex items-center justify-center rounded-full border-white/25 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                gridMode === "auto"
                  ? "bg-black text-white border-white/50"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <CiGrid42 size={16} />
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-1 p-1 bg-black/40 backdrop-blur-sm rounded-full border border-white/20">
            <button
              onClick={() => setSquare(true)}
              className={`size-8 flex items-center justify-center rounded-full border-white/25 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                square === true
                  ? "bg-black text-white border-white/50"
                  : "bg-black/30 backdrop-blur-sm"
              }`}
            >
              <FiSquare size={16} />
            </button>
            <button
              onClick={() => setSquare(false)}
              className={`size-8 flex items-center justify-center rounded-full border-white/25 cursor-pointer active:scale-90 hover:scale-105 duration-300 border ${
                square === false
                  ? "bg-black text-white border-white/50"
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
          <div className="relative py-20 space-y-2 min-h-96 flex flex-col justify-between">
            <img
              key={selectedImage}
              src={selectedImage.replace("/upload/", "/upload/q_auto,f_auto/")}
              className={`max-h-[85vh] max-w-[85vw] rounded-2xl shadow-2xl bg-black/80`}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex justify-between h-10 w-full">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!selectedImage) return;
                  setConfirmDelete(true);
                }}
                className={`h-9 flex items-center justify-center rounded-full border-red-500/25 cursor-pointer active:scale-90 hover:scale-105 duration-700 border bg-black/50 hover:bg-black text-red-500 overflow-hidden ${
                  modalOpen ? "delay-50 w-24" : "blur-2xl w-5"
                }`}
              >
                <MdDelete className="me-1 text-lg" />
                <span>Delete</span>
              </button>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!selectedImage) return;
                  try {
                    const response = await fetch(
                      selectedImage.replace(
                        "/upload/",
                        "/upload/q_auto,f_auto/"
                      )
                    );
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download =
                      selectedImage.split("/").pop() || "download.jpg";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  } catch (err) {
                    console.error("Download failed", err);
                  }
                }}
                className={`h-9 flex items-center justify-center rounded-full border-white/25 cursor-pointer active:scale-90 hover:scale-105 duration-700 border bg-black/50 hover:bg-black overflow-hidden ${
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

      <div
        className={`fixed bg-black/50 backdrop-blur-sm inset-0 flex items-center justify-center duration-300 z-50 ${
          confirmDelete ? "" : "opacity-0 pointer-events-none"
        }`}
      >
        {selectedImage && confirmDelete && (
          <div
            className={`max-w-56 bg-black/20 backdrop-blur-sm border border-white/20 text-center text-white rounded-3xl p-5 flex flex-col items-center gap-4 delay-75`}
          >
            <p className="">Are you sure you want to delete this photo?</p>
            <div className="flex w-full justify-between text-sm">
              <button
                className="w-20 py-1 pe-0.5 flex items-center justify-center text-red-500 bg-black/50 rounded-full border border-red-500 cursor-pointer hover:scale-105 duration-300"
                onClick={async () => {
                  setDeleting(true);
                  try {
                    const index = selectedImage.indexOf("ttm/");
                    const withFolder = selectedImage.substring(index);
                    const publicId = withFolder.replace(/\.[^/.]+$/, "");

                    await fetch("/api/delete", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ public_id: publicId }),
                    });

                    setConfirmDelete(false);
                    setModalOpen(false);
                    window.location.reload();
                  } catch (err) {
                    alert("Delete failed");
                    console.log("Delete failed", err);
                  } finally {
                    setDeleting(false);
                  }
                }}
              >
                {deleting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <MdDelete className="me-1 text-lg" /> Delete
                  </>
                )}
              </button>
              <button
                className=" text-neutral-200 w-20 py-1 bg-black/50 rounded-full border border-neutral-200 cursor-pointer hover:scale-105 duration-300"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
