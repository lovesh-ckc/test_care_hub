import Image from "next/image";

type AppointmentData = {
  doctorImage: string;
  doctorName: string;
  specialty: string;
  date: string;
  timeStart: string;
  timeEnd: string;
};

type UpcomingAppointmentsProps = {
  appointments?: AppointmentData[];
};

const defaultAppointment: AppointmentData = {
  doctorImage: "/icons/patient.svg",
  doctorName: "Dr. Sarah Jenkins",
  specialty: "Cardiologist",
  date: "Friday, 23 July 2026",
  timeStart: "09:00",
  timeEnd: "10:00",
};

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#777]" aria-hidden="true">
      <path
        d="M7 3v3M17 3v3M4 8h16M5 21h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#777]" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" aria-hidden="true">
      <rect x="3" y="6" width="14" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 9l4-2v10l-4-2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UpcomingAppointments({ appointments = [defaultAppointment] }: UpcomingAppointmentsProps) {
  const appointment = appointments[0] ?? defaultAppointment;

  return (
    <div className="w-full flex flex-col items-start gap-4 [font-family:var(--font-display),'Haas_Grot_Disp_Trial',sans-serif] motion-fade-up delay-2">
      <h2 className="text-[clamp(1.5rem,6vw,2.2rem)] font-semibold tracking-[1px] text-[#1a1a1a]">
        Upcoming appointments
      </h2>

      <div className="w-full rounded-[20px] bg-white p-4 shadow-[4px_3px_11px_rgba(49,23,23,0),159px_74px_70px_rgba(49,23,23,0.01),90px_42px_59px_rgba(49,23,23,0.03),40px_19px_44px_rgba(49,23,23,0.06),10px_5px_24px_rgba(49,23,23,0.07)] flex flex-col items-start gap-6 card-hover">
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-shrink-0 w-[100px] h-[100px] rounded-full bg-gray-200 overflow-hidden">
              {appointment.doctorImage ? (
                <Image
                  src={appointment.doctorImage}
                  alt={appointment.doctorName}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>

            <div className="flex flex-col items-start gap-1">
              <div className="text-[clamp(1.1rem,4.6vw,1.5rem)] font-semibold tracking-[1px] text-[#1a1a1a]">
                {appointment.doctorName}
              </div>
              <div className="text-[clamp(0.95rem,3.6vw,1.2rem)] text-[#777] [font-family:var(--font-plex),'IBM_Plex_Sans',sans-serif]">
                {appointment.specialty}
              </div>
            </div>
          </div>

          <button className="flex-shrink-0 w-[50px] h-[50px] rounded-full bg-[#f5a574] flex items-center justify-center hover:bg-[#f0935f] transition-colors">
            <VideoIcon />
          </button>
        </div>

        <div className="w-full rounded-lg bg-[#faf9f8] flex flex-col sm:flex-row items-center p-4 gap-4 text-[1.1rem] text-[#777] [font-family:var(--font-plex),'IBM_Plex_Sans',sans-serif]">
          <div className="flex-1 flex items-center justify-center gap-2.5 sm:border-r sm:border-[#1a1a1a] sm:pr-4">
            <CalendarIcon />
            <span className="tracking-wide text-center">{appointment.date}</span>
          </div>

          <div className="flex-1 flex items-center justify-center gap-2.5">
            <ClockIcon />
            <span className="tracking-wide">
              {appointment.timeStart} AM - {appointment.timeEnd} AM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
