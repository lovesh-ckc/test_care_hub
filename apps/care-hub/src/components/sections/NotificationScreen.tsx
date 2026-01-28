"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type NotificationCategory = "all" | "schedules" | "alerts" | "messages";

type NotificationItem = {
  id: string;
  title: string;
  time: string;
  category: Exclude<NotificationCategory, "all">;
  unread?: boolean;
};

const notificationItems: NotificationItem[] = [
  {
    id: "all-1",
    title: "It’s time for your Atorvastatin (20mg). Best to take it with food.",
    time: "2 min ago.",
    category: "alerts",
    unread: true,
  },
  {
    id: "all-2",
    title: "Your Smartwatch has lost connection. Please reconnect to continue monitoring.",
    time: "5 min ago.",
    category: "alerts",
    unread: true,
  },
  {
    id: "all-3",
    title: "Your blood work results from Jan 21st are ready for review.",
    time: "10 min ago.",
    category: "messages",
    unread: true,
  },
  {
    id: "all-4",
    title: "Your video call with Dr. Sarah Jenkins is scheduled for today.",
    time: "15 min ago.",
    category: "schedules",
    unread: true,
  },
  {
    id: "all-5",
    title: "Your appointment with Dr. Alex Thompson is confirmed.",
    time: "30 min ago.",
    category: "schedules",
    unread: true,
  },
  {
    id: "all-6",
    title: "It’s time for your follow-up appointment reminder.",
    time: "1 hr ago.",
    category: "schedules",
    unread: true,
  },
  {
    id: "all-7",
    title: "Your prescription refill for Lisinopril is ready.",
    time: "1 hr ago.",
    category: "alerts",
    unread: true,
  },
  {
    id: "all-8",
    title: "You have new lab tests scheduled for next week.",
    time: "1 hr ago.",
    category: "schedules",
    unread: true,
  },
  {
    id: "schedule-1",
    title: "Your appointment with Dr. Alex Thompson",
    time: "30 min ago.",
    category: "schedules",
    unread: true,
  },
  {
    id: "schedule-2",
    title: "Your video call with Dr. Sarah Jenkins is set",
    time: "30 min ago.",
    category: "schedules",
    unread: true,
  },
  {
    id: "schedule-3",
    title: "Your follow-up appointment with Dr. Emily",
    time: "1 hour ago.",
    category: "schedules",
    unread: true,
  },
  {
    id: "schedule-4",
    title: "You have a consultation with Dr. Sarah Lee",
    time: "2 hours ago.",
    category: "schedules",
    unread: true,
  },
  {
    id: "schedule-5",
    title: "Your lab results review with Dr. John Smith",
    time: "1 hour ago.",
    category: "schedules",
    unread: true,
  },
  {
    id: "schedule-6",
    title: "You have a telehealth session with Dr. Lisa",
    time: "2 hours ago.",
    category: "schedules",
    unread: true,
  },
  {
    id: "schedule-7",
    title: "Your annual check-up with Dr. Michael Brown",
    time: "3 hours ago.",
    category: "schedules",
    unread: true,
  },
  {
    id: "schedule-8",
    title: "You have a physical therapy appointment tomorrow",
    time: "4 hours ago.",
    category: "schedules",
    unread: true,
  },
  {
    id: "alert-1",
    title: "Your lab results are ready for review. Click to view.",
    time: "10 min ago.",
    category: "alerts",
    unread: true,
  },
  {
    id: "alert-2",
    title: "Update: Dr. Aris has changed your dosage for this week.",
    time: "55 min ago.",
    category: "alerts",
    unread: true,
  },
  {
    id: "alert-3",
    title: "It looks like you forgot to take your 7:45 AM medication.",
    time: "50 min ago.",
    category: "alerts",
    unread: true,
  },
  {
    id: "alert-4",
    title: "Your Pulse Oximeter has lost connection. Reconnect now.",
    time: "30 min ago.",
    category: "alerts",
    unread: true,
  },
  {
    id: "alert-5",
    title: "Alert: Your blood pressure readings have been elevated.",
    time: "25 min ago.",
    category: "alerts",
    unread: true,
  },
  {
    id: "alert-6",
    title: "Notification: A new message from your dietitian.",
    time: "20 min ago.",
    category: "alerts",
    unread: true,
  },
  {
    id: "alert-7",
    title: "Action required: Please update your medication list.",
    time: "15 min ago.",
    category: "alerts",
    unread: true,
  },
  {
    id: "alert-8",
    title: "Good news: Your recent tests show improvement!",
    time: "5 min ago.",
    category: "alerts",
    unread: true,
  },
  {
    id: "message-1",
    title: "Your nurse, Maria Sanchez, has sent you a message.",
    time: "30 min ago.",
    category: "messages",
    unread: true,
  },
  {
    id: "message-2",
    title: "Dr. John Doe has scheduled a follow-up appointment.",
    time: "15 min ago.",
    category: "messages",
    unread: true,
  },
  {
    id: "message-3",
    title: "Your lab results are ready for review. Click to view.",
    time: "10 min ago.",
    category: "messages",
    unread: true,
  },
  {
    id: "message-4",
    title: "Reminder: You have a medication refill due.",
    time: "5 min ago.",
    category: "messages",
    unread: true,
  },
  {
    id: "message-5",
    title: "Your physical therapy session is confirmed.",
    time: "2 min ago.",
    category: "messages",
    unread: true,
  },
  {
    id: "message-6",
    title: "Patient support has sent you a new resource.",
    time: "1 min ago.",
    category: "messages",
    unread: true,
  },
  {
    id: "message-7",
    title: "Feedback requested: We value your opinion.",
    time: "Just now.",
    category: "messages",
    unread: true,
  },
  {
    id: "message-8",
    title: "A new health tip has been added to your plan.",
    time: "Now.",
    category: "messages",
    unread: true,
  },
];

type NotificationScreenProps = {
  onBack?: () => void;
};

const categoryTabs: { id: NotificationCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "schedules", label: "Schedules" },
  { id: "alerts", label: "Alerts" },
  { id: "messages", label: "Messages" },
];

function NotificationIcon({ category }: { category: NotificationItem["category"] }) {
  const iconStyles =
    category === "alerts" ? "bg-orange-400" : category === "schedules" ? "bg-orange-400" : "bg-orange-400";

  return (
    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${iconStyles} text-white`}>
      {category === "alerts" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M12 7v6m0 4h.01M10.29 3.86l-7.4 12.8A2 2 0 0 0 4.6 20h14.8a2 2 0 0 0 1.71-3.34l-7.4-12.8a2 2 0 0 0-3.42 0Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : category === "schedules" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M8 2v4M16 2v4M4 8h16M6 12h6M6 16h4M4 6h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

export function NotificationScreen({ onBack }: NotificationScreenProps) {
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all");

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return notificationItems;
    return notificationItems.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen text-left text-black font-haas-grot-disp-trial">
      <div className="mx-auto flex h-screen w-full max-w-md flex-col bg-whitesmoke px-4 pb-6 pt-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-sandybrown text-sandybrown"
            onClick={onBack}
            aria-label="Back"
          >
            <Image className="h-4 w-4" width={16} height={16} alt="" src="/Leftarrow.svg" />
          </button>
          <div className="text-lg font-semibold">Notification</div>
          <button type="button" className="text-xs text-gray-500 font-ibm-plex-sans">
            Mark all as read
          </button>
        </div>

        <div className="mt-4 rounded-num-100 bg-white p-1 shadow-sm">
          <div className="grid grid-cols-4 text-xs text-center text-gray-500 font-ibm-plex-sans">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`rounded-md py-2 ${
                  activeTab === tab.id ? "bg-gray-200 text-gray-400 font-semibold" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex-1 overflow-hidden rounded-num-20 bg-white p-2 shadow-md">
          <div className="flex h-full flex-col overflow-y-auto">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-2 py-3 ${
                  index < filteredItems.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <NotificationIcon category={item.category} />
                <div className="flex-1">
                  <div className="text-sm text-gray-700">{item.title}</div>
                  <div className="text-xs text-gray-500 font-ibm-plex-sans">{item.time}</div>
                </div>
                {item.unread ? <span className="h-2 w-2 rounded-full bg-orange-400" /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
