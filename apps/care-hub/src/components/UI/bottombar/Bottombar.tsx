"use client";

type BottombarProps = {
  activeItem?: "home" | "documents" | "list" | "grid";
  onItemClick?: (itemId: "home" | "documents" | "list" | "grid") => void;
};

type NavItem = {
  id: "home" | "documents" | "list" | "grid";
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg viewBox="0 0 36 36" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M12 25.5001H24M16.5265 4.14612L6.35309 12.0588C5.67303 12.5877 5.33301 12.8522 5.08804 13.1834C4.87105 13.4768 4.7094 13.8073 4.61104 14.1587C4.5 14.5554 4.5 14.9862 4.5 15.8477V26.7001C4.5 28.3803 4.5 29.2203 4.82698 29.8621C5.1146 30.4266 5.57354 30.8855 6.13803 31.1731C6.77976 31.5001 7.61984 31.5001 9.3 31.5001H26.7C28.3802 31.5001 29.2202 31.5001 29.862 31.1731C30.4265 30.8855 30.8854 30.4266 31.173 29.8621C31.5 29.2203 31.5 28.3803 31.5 26.7001V15.8477C31.5 14.9862 31.5 14.5554 31.389 14.1587C31.2906 13.8073 31.129 13.4768 30.912 13.1834C30.667 12.8522 30.327 12.5877 29.6469 12.0588L19.4735 4.14612C18.9465 3.73624 18.683 3.5313 18.392 3.45252C18.1353 3.38301 17.8647 3.38301 17.608 3.45252C17.317 3.5313 17.0535 3.73624 16.5265 4.14612Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "documents",
    label: "Documents",
    icon: (
      <svg viewBox="0 0 36 36" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M21 3.4043V9.60011C21 10.4402 21 10.8602 21.1635 11.1811C21.3073 11.4633 21.5368 11.6928 21.819 11.8366C22.1399 12.0001 22.5599 12.0001 23.4 12.0001H29.5958M21 25.5H12M24 19.5H12M30 14.9823V25.8C30 28.3202 30 29.5804 29.5095 30.543C29.0781 31.3897 28.3897 32.0781 27.543 32.5095C26.5804 33 25.3202 33 22.8 33H13.2C10.6798 33 9.41965 33 8.45704 32.5095C7.61031 32.0781 6.9219 31.3897 6.49047 30.543C6 29.5804 6 28.3202 6 25.8V10.2C6 7.67976 6 6.41965 6.49047 5.45704C6.9219 4.61031 7.61031 3.9219 8.45704 3.49047C9.41965 3 10.6798 3 13.2 3H18.0177C19.1183 3 19.6686 3 20.1865 3.12434C20.6457 3.23457 21.0847 3.41639 21.4873 3.66312C21.9414 3.94141 22.3305 4.33055 23.1088 5.10883L27.8912 9.89117C28.6695 10.6695 29.0586 11.0586 29.3369 11.5127C29.5836 11.9153 29.7654 12.3543 29.8757 12.8135C30 13.3314 30 13.8817 30 14.9823Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "list",
    label: "To-Do List",
    icon: (
      <svg viewBox="0 0 36 36" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M31.5 18L13.5 18M31.5 9L13.5 9M31.5 27L13.5 27M7.5 18C7.5 18.8284 6.82843 19.5 6 19.5C5.17157 19.5 4.5 18.8284 4.5 18C4.5 17.1716 5.17157 16.5 6 16.5C6.82843 16.5 7.5 17.1716 7.5 18ZM7.5 9C7.5 9.82843 6.82843 10.5 6 10.5C5.17157 10.5 4.5 9.82843 4.5 9C4.5 8.17157 5.17157 7.5 6 7.5C6.82843 7.5 7.5 8.17157 7.5 9ZM7.5 27C7.5 27.8284 6.82843 28.5 6 28.5C5.17157 28.5 4.5 27.8284 4.5 27C4.5 26.1716 5.17157 25.5 6 25.5C6.82843 25.5 7.5 26.1716 7.5 27Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "grid",
    label: "Devices",
    icon: (
      <svg viewBox="0 0 54 54" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M16.3998 17.7444C16.3998 17.002 17.0017 16.4001 17.7441 16.4001L23.1672 16.4001C23.9096 16.4001 24.5115 17.002 24.5115 17.7444L24.5115 23.1675C24.5115 23.9099 23.9096 24.5118 23.1672 24.5118L17.7441 24.5118C17.0017 24.5118 16.3998 23.9099 16.3998 23.1675L16.3998 17.7444Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M29.2281 17.7444C29.2281 17.002 29.83 16.4001 30.5725 16.4001L35.9955 16.4001C36.738 16.4001 37.3398 17.002 37.3398 17.7444L37.3398 23.1675C37.3398 23.9099 36.738 24.5118 35.9955 24.5118L30.5725 24.5118C29.83 24.5118 29.2281 23.9099 29.2281 23.1675L29.2281 17.7444Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16.3998 30.5728C16.3998 29.8303 17.0017 29.2284 17.7441 29.2284H23.1672C23.9096 29.2284 24.5115 29.8303 24.5115 30.5728L24.5115 35.9958C24.5115 36.7383 23.9096 37.3401 23.1672 37.3401L17.7441 37.3401C17.0017 37.3401 16.3998 36.7383 16.3998 35.9958V30.5728Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M29.2281 30.5728C29.2281 29.8303 29.83 29.2284 30.5725 29.2284L35.9955 29.2284C36.738 29.2284 37.3398 29.8303 37.3398 30.5728L37.3398 35.9958C37.3398 36.7383 36.738 37.3401 35.9955 37.3401H30.5725C29.83 37.3401 29.2281 36.7383 29.2281 35.9958L29.2281 30.5728Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

export function Bottombar({ activeItem = "home", onItemClick }: BottombarProps) {
  return (
    <nav className="flex w-full items-center justify-between gap-2 rounded-full  px-3 py-2">
      {navItems.map((item) => {
        const isActive = item.id === activeItem;
        return (
          <button   
            key={item.id}
            type="button"
            onClick={() => onItemClick?.(item.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-sm transition ${
              isActive ? "bg-black text-white" : "text-gray-700"
            }`}
          >
            <span className="flex items-center justify-center">{item.icon}</span>
            <span className={`${isActive ? "block" : "hidden"} whitespace-nowrap`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
