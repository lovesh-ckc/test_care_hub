"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Bottombar } from "@care-hub/components/UI/bottombar/Bottombar";
import LiquidMorph from "../UI/LiquidMorph";
import { useFeedback } from "@care-hub/components/feedback/FeedbackProvider";

type TodoListScreenProps = {
  onNavClick?: (itemId: "home" | "documents" | "list" | "grid") => void;
  activeItem?: "home" | "documents" | "list" | "grid";
};

type TodoItem = {
  id: string;
  title: string;
  time: string;
  group: "today" | "upcoming";
  detail: "bp" | "vitamin" | "health" | "export";
};

const todoItems: TodoItem[] = [
  { id: "bp", title: "Complete your BP check", time: "12:56 pm", group: "today", detail: "bp" },
  { id: "vitamin", title: "Vitamins D", time: "02:02 pm", group: "today", detail: "vitamin" },
  { id: "health", title: "Health check", time: "03:09 pm", group: "today", detail: "health" },
  { id: "export", title: "Export your data", time: "04:09 pm", group: "upcoming", detail: "export" },
  { id: "glucose", title: "Monitoring blood glucose", time: "05:09 pm", group: "upcoming", detail: "export" },
];

type DetailSheet = "none" | "bp" | "vitamin" | "health" | "export";

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

function Overlay({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 px-4 py-6 motion-fade-in">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close overlay" />
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl motion-fade-up">
        {children}
      </div>
    </div>
  );
}

function CloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      className="flex h-7 w-7 items-center justify-center rounded-full border border-sandybrown text-sandybrown"
      onClick={onClick}
      aria-label="Close"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function TodoCard({ title, time, onClick }: { title: string; time: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left motion-fade-up card-hover"
      onClick={onClick}
    >
      <div>
        <div className="text-sm font-semibold text-gray-700">{title}</div>
        <div className="mt-2 text-xs text-gray-500 font-ibm-plex-sans">
          {time} <span className="ml-2 text-gray-500">Track</span>
        </div>
      </div>
      <svg viewBox="0 0 20 20" className="h-4 w-4 text-gray-500" fill="none" aria-hidden="true">
        <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function PreviousTasks({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen text-left text-black font-haas-grot-disp-trial">
      <div className="care-shell min-h-screen care-padding bg-[#FAF9F8] pb-6 pt-4">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-sandybrown text-sandybrown"
          onClick={onBack}
          aria-label="Back"
        >
          <Image className="h-4 w-4" width={16} height={16} alt="" src="/Leftarrow.svg" />
        </button>
        <div className="mt-4 text-lg font-semibold motion-fade-up">Previous tasks</div>
        <div className="mt-1 text-sm text-gray-500 font-ibm-plex-sans motion-fade-up delay-1">Only the last 3 months of Tasks visible</div>

        <div className="mt-4 flex flex-col gap-3">
          {[
            { title: "Completed you BP check", time: "12:56 pm" },
            { title: "Vitamins C Updated", time: "02:02 pm" },
            { title: "Blood pressure updated", time: "03:09 pm" },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 motion-fade-up card-hover">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-700">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path
                      d="M4 10l3 3 9-9"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700">{item.title}</div>
                  <div className="text-xs text-gray-500 font-ibm-plex-sans">{item.time}</div>
                </div>
              </div>
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-gray-500" fill="none" aria-hidden="true">
                <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TodoListScreen({ onNavClick, activeItem = "list" }: TodoListScreenProps) {
  const { tap, confirm } = useFeedback();
  const [activeOverlay, setActiveOverlay] = useState<DetailSheet>("none");
  const [showPrevious, setShowPrevious] = useState(false);

  const todayItems = useMemo(() => todoItems.filter((item) => item.group === "today"), []);
  const upcomingItems = useMemo(() => todoItems.filter((item) => item.group === "upcoming"), []);

  if (showPrevious) {
    return <PreviousTasks onBack={() => setShowPrevious(false)} />;
  }

  return (
    <div className="min-h-screen text-left text-black bg-amber-400 font-haas-grot-disp-trial">
      <div className="care-shell care-padding min-h-screen flex flex-col bg-[#FAF9F8] pb-4 pt-4">
        <div className="text-lg font-semibold motion-fade-up">To Do Lists</div>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-700 motion-fade-up delay-1">
          <span className="font-semibold text-gray-700">2 items to do</span>
          <button type="button" className="text-gray-700" onClick={() => setShowPrevious(true)}>
            Show previous
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-3">
          {todayItems.map((item) => (
            <TodoCard
              key={item.id}
              title={item.title}
              time={item.time}
              onClick={() => {
                tap();
                setActiveOverlay(item.detail);
              }}
            />
          ))}
        </div>

        <div className="mt-6 text-sm font-semibold text-gray-700 motion-fade-up delay-2">Upcoming</div>
        <div className="mt-3 flex flex-col gap-3">
          {upcomingItems.map((item) => (
            <TodoCard
              key={item.id}
              title={item.title}
              time={item.time}
              onClick={() => {
                tap();
                setActiveOverlay(item.detail);
              }}
            />
          ))}
        </div>

        
      </div>
          <div className="pt-3 sticky bottom-4">
                  <LiquidMorph>
                  <Bottombar activeItem={activeItem} onItemClick={onNavClick} />
                  </LiquidMorph>
          </div>
      <Overlay open={activeOverlay === "bp"} onClose={() => setActiveOverlay("none")}>
        <div className="p-6 text-center">
          <div className="flex justify-end">
            <CloseButton onClick={() => setActiveOverlay("none")} />
          </div>
          <div className="text-lg font-semibold text-gray-700">Time for your blood pressure check</div>
          <div className="mt-2 text-sm text-gray-500 font-ibm-plex-sans">
            Please measure and record your blood pressure to keep your care team updated.
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-full bg-orange-400 px-4 py-3 text-sm font-semibold text-white"
            onClick={confirm}
          >
            Record now
          </button>
        </div>
      </Overlay>

      <Overlay open={activeOverlay === "vitamin"} onClose={() => setActiveOverlay("none")}>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-gray-700">Daily Vitamin D Supplement</div>
              <div className="text-xs text-gray-500 font-ibm-plex-sans">
                Take your vitamin D supplement with food for better absorption.
              </div>
            </div>
            <CloseButton onClick={() => setActiveOverlay("none")} />
          </div>
          <div className="mt-4 h-px w-full bg-orange-200" />
          <div className="mt-4 text-xs font-semibold text-gray-700">Dosage Information</div>
          <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-gray-500 font-ibm-plex-sans">
            <div>
              <div>Dosage</div>
              <div className="mt-1 text-gray-700">2000 IU</div>
            </div>
            <div>
              <div>Frequency</div>
              <div className="mt-1 text-gray-700">Daily</div>
            </div>
            <div>
              <div>Best Taken with</div>
              <div className="mt-1 text-gray-700">Meals</div>
            </div>
          </div>
          <div className="mt-5 text-xs font-semibold text-gray-700">This Week</div>
          <div className="mt-3 flex items-center gap-3">
            {weekDays.map((day, index) => (
              <div key={day + index} className="flex flex-col items-center gap-2 text-xs text-gray-700">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${index < 3 ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-500"}`}>
                  {index < 3 ? "v" : ""}
                </div>
                <span>{day}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 text-xs font-semibold text-gray-700">Notes</div>
          <textarea
            className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-700 placeholder:text-gray-500 focus:outline-none"
            rows={3}
            placeholder="Add any notes about this medication...."
          />
          <button
            type="button"
            className="mt-4 w-full rounded-full bg-orange-400 px-4 py-3 text-sm font-semibold text-white"
            onClick={confirm}
          >
            Mark as Taken
          </button>
        </div>
      </Overlay>

      <Overlay open={activeOverlay === "health"} onClose={() => setActiveOverlay("none")}>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-gray-700">Daily Health Assessment</div>
              <div className="text-xs text-gray-500 font-ibm-plex-sans">
                Complete your daily health check-in to track your overall wellness.
              </div>
            </div>
            <CloseButton onClick={() => setActiveOverlay("none")} />
          </div>
          <div className="mt-4 h-px w-full bg-orange-200" />
          <div className="mt-4 text-xs font-semibold text-gray-700">Vital Signs</div>
          <div className="mt-3 flex flex-col gap-3 text-xs text-gray-500 font-ibm-plex-sans">
            {[
              { label: "Heart Rate", value: "72 bpm" },
              { label: "Temperature", value: "98.6 F" },
              { label: "Oxygen Level", value: "98 %" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-500">*</div>
                <div className="flex-1">
                  <div className="text-xs text-gray-700">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs font-semibold text-gray-700">How are you feeling?</div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {["Great", "Okay", "Tired", "Unwell"].map((label) => (
              <button key={label} type="button" className="rounded-full border border-gray-200 px-3 py-2 text-xs text-gray-700">
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-full bg-orange-400 px-4 py-3 text-sm font-semibold text-white"
            onClick={confirm}
          >
            Complete Check In
          </button>
        </div>
      </Overlay>

      <Overlay open={activeOverlay === "export"} onClose={() => setActiveOverlay("none")}>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-gray-700">Your Health Data</div>
              <div className="text-xs text-gray-500 font-ibm-plex-sans">
                Export your health data for personal records or to share with your healthcare provider.
              </div>
            </div>
            <CloseButton onClick={() => setActiveOverlay("none")} />
          </div>
          <div className="mt-4 h-px w-full bg-orange-200" />
          <div className="mt-4 text-xs font-semibold text-gray-700">Select Date Range</div>
          <div className="mt-3 space-y-3">
            {["From", "To"].map((label) => (
              <label key={label} className="block text-xs text-gray-500 font-ibm-plex-sans">
                {label}
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-xs text-gray-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-500" fill="none" aria-hidden="true">
                    <path
                      d="M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Select date
                </div>
              </label>
            ))}
          </div>

          <div className="mt-4 text-xs font-semibold text-gray-700">Export Data</div>
          <div className="mt-2 rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-700">
            PDF Report
            <div className="text-xs text-gray-500 font-ibm-plex-sans">Readable document with charts</div>
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-full bg-orange-400 px-4 py-3 text-sm font-semibold text-white"
            onClick={confirm}
          >
            Export Data
          </button>
        </div>
      </Overlay>
    </div>
  );
}
