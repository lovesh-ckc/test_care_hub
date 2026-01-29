"use client";

import { useMemo, useState } from "react";
import { Bottombar } from "@care-hub/components/UI/bottombar/Bottombar";
import LiquidMorph from "../LiquidMorph";

type DocumentCategory = "all" | "lab" | "imaging" | "prescription";

type DocumentItem = {
  id: string;
  title: string;
  size: string;
  date: string;
  category: Exclude<DocumentCategory, "all">;
};

type DocumentScreenProps = {
  onBack?: () => void;
  onNavClick?: (itemId: "home" | "documents" | "list" | "grid") => void;
  activeItem?: "home" | "documents" | "list" | "grid";
};

const documents: DocumentItem[] = [
  { id: "doc-1", title: "Complete Blood Count Test.pdf", size: "2.1 MB", date: "Feb 20, 2025", category: "lab" },
  { id: "doc-2", title: "Chest X-Ray Report.pdf", size: "3.4 MB", date: "Mar 10, 2025", category: "imaging" },
  { id: "doc-3", title: "Prescription - Antibiotics.pdf", size: "4.7 MB", date: "Apr 5, 2025", category: "prescription" },
  { id: "doc-4", title: "Lipid Panel Results.pdf", size: "5.2 MB", date: "May 30, 2025", category: "lab" },
  { id: "doc-5", title: "MRI Scan - Knee.pdf", size: "5.2 MB", date: "May 30, 2025", category: "imaging" },
  { id: "doc-6", title: "Blood Pressure Medication.pdf", size: "2.1 MB", date: "Feb 20, 2025", category: "prescription" },
  { id: "doc-7", title: "Lipid Panel Results.pdf", size: "3.4 MB", date: "Mar 10, 2025", category: "lab" },
  { id: "doc-8", title: "Lipid Panel Results.pdf", size: "4.7 MB", date: "Apr 5, 2025", category: "lab" },
  { id: "doc-9", title: "Lipid Panel Results.pdf", size: "5.2 MB", date: "May 30, 2025", category: "lab" },
];

const tabs: { id: DocumentCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "lab", label: "Lab Results" },
  { id: "imaging", label: "Imaging" },
  { id: "prescription", label: "Prescription" },
];

function DocumentIcon() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-500">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M8 3h7l5 5v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M15 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M9 14h6M9 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 30 30" className="h-5 w-5 text-gray-500" fill="none" aria-hidden="true">
      <path
        d="M26.25 18.75V20.25C26.25 22.3502 26.25 23.4003 25.8413 24.2025C25.4817 24.9081 24.9081 25.4817 24.2025 25.8413C23.4003 26.25 22.3502 26.25 20.25 26.25H9.75C7.6498 26.25 6.5997 26.25 5.79754 25.8413C5.09193 25.4817 4.51825 24.9081 4.15873 24.2025C3.75 23.4003 3.75 22.3502 3.75 20.25V18.75M21.25 12.5L15 18.75M15 18.75L8.75 12.5M15 18.75V3.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DocumentScreen({ onNavClick, activeItem = "documents" }: DocumentScreenProps) {
  const [activeTab, setActiveTab] = useState<DocumentCategory>("all");
  const [query, setQuery] = useState("");

  const filteredDocuments = useMemo(() => {
    const search = query.trim().toLowerCase();
    return documents.filter((doc) => {
      const matchesCategory = activeTab === "all" ? true : doc.category === activeTab;
      const matchesQuery = doc.title.toLowerCase().includes(search);
      return matchesCategory && matchesQuery;
    });
  }, [activeTab, query]);

  return (
    <section className="min-h-screen text-left text-black font-haas-grot-disp-trial">
      <div className="care-shell care-padding flex h-screen flex-col bg-[#FAF9F8] pb-4 pt-4">
        <div className="text-lg font-semibold">Documents</div>

        <div className="mt-3">
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 font-ibm-plex-sans">
            <input
              className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none"
              placeholder="Search documents....."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <svg viewBox="0 0 30 30" className="h-4 w-4 text-gray-500" fill="none" aria-hidden="true">
              <path
                d="M26.25 26.25L20.8125 20.8125M23.75 13.75C23.75 19.2728 19.2728 23.75 13.75 23.75C8.22715 23.75 3.75 19.2728 3.75 13.75C3.75 8.22715 8.22715 3.75 13.75 3.75C19.2728 3.75 23.75 8.22715 23.75 13.75Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-3 rounded-full bg-white p-1 shadow-sm ">
          <div className="grid grid-cols-4 text-center text-xs text-gray-400 font-ibm-plex-sans">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`rounded-full py-2 ${
                  activeTab === tab.id ? "bg-gray-200 text-gray-400 font-semibold" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex-1 overflow-hidden bg-white rounded-md p-2 shadow-sm">
          <div className="flex h-full flex-col overflow-y-auto">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 border-b border-gray-100 px-2 py-3 last:border-b-0">
                <DocumentIcon />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-700">{doc.title}</div>
                  <div className="text-xs text-gray-500 font-ibm-plex-sans">
                    {doc.size} • {doc.date}
                  </div>
                </div>
                <DownloadIcon />
              </div>
            ))}
          </div>
        </div>
        <div className="pt-3 sticky bottom-4">
          <LiquidMorph>
          <Bottombar activeItem={activeItem} onItemClick={onNavClick} />
          </LiquidMorph>
        </div>
      </div>
    </section>
  );
}
