export type ThemeConfig = {
  brand: string;
  brandContrast: string;
  surface: string;
  surfaceMuted: string;
  ink: string;
  mutedInk: string;
  radius: number;
  displayFont: string;
  bodyFont: string;
  greetingFont: string;
  headingFont: string;
};

export type HeroSection = {
  id: string;
  type: "hero";
  props: {
    title: string;
    subtitle: string;
    badge: string;
    patientName: string;
    careWindow: string;
  };
};

export type InfoGridSection = {
  id: string;
  type: "infoGrid";
  props: {
    items: { label: string; value: string }[];
  };
};

export type StepListSection = {
  id: string;
  type: "stepList";
  props: {
    title: string;
    steps: { title: string; detail: string }[];
  };
};

export type MedListSection = {
  id: string;
  type: "medList";
  props: {
    title: string;
    meds: { name: string; dosage: string; time: string }[];
  };
};

export type ContactSection = {
  id: string;
  type: "contact";
  props: {
    title: string;
    supportLabel: string;
    supportNumber: string;
    note: string;
  };
};

export type NoteSection = {
  id: string;
  type: "note";
  props: {
    title: string;
    text: string;
  };
};

export type WelcomeSection = {
  id: string;
  type: "welcome";
  props: {
    title: string;
    subtitle: string;
    buttonLabel: string;
    note: string;
    gradientStart: string;
    gradientEnd: string;
    textMuted: string;
    noteColor: string;
    buttonColor: string;
    buttonTextColor: string;
    blobColor: string;
  };
};

export type OnboardingSlide = {
  id: string;
  title: string;
  subtitle: string;
  blobColor: string;
  illustration: "laptop" | "chat" | "support" | "highfive";
  ctaLabel?: string;
};

export type OnboardingSliderSection = {
  id: string;
  type: "onboardingSlider";
  props: {
    slides: OnboardingSlide[];
    titleColor: string;
    subtitleColor: string;
    dotActiveColor: string;
    dotInactiveColor: string;
    titleFontSize: string;
    titleFontWeight: number;
    titleFontFamily: string;
    subtitleFontSize: string;
    subtitleFontWeight: number;
    subtitleFontFamily: string;
    textAlign: "left" | "center";
    dotActiveWidth: string;
    dotInactiveWidth: string;
    dotHeight: string;
    dotRadius: string;
    dotInactiveOpacity: number;
  };
};

export type ConnectFormSection = {
  id: string;
  type: "connectForm";
  props: {
    title: string;
    description: string;
    abhaPlaceholder: string;
    mobilePlaceholder: string;
    countryCode: string;
    separatorText: string;
    buttonLabel: string;
    buttonDisabledColor: string;
    buttonEnabledColor: string;
    buttonTextColor: string;
    borderColor: string;
    textMuted: string;
    iconStroke: string;
    blobColor: string;
  };
};

export type OtpVerifySection = {
  id: string;
  type: "otpVerify";
  props: {
    description: string;
    helperText: string;
    resendLabel: string;
    buttonLabel: string;
    buttonDisabledColor: string;
    buttonEnabledColor: string;
    buttonTextColor: string;
    borderColor: string;
    textMuted: string;
    iconStroke: string;
    blobColor: string;
  };
};

export type SosDoesSection = {
  id: string;
  type: "sosDoes";
  props: {
    title?: string;
    subtitle?: string;
    buttonLabel?: string;
    note?: string;
    gradientStart?: string;
    gradientEnd?: string;
    textMuted?: string;
    noteColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    blobColor?: string;
    borderColor?: string;
  };
};

export type SosWorksSection = {
  id: string;
  type: "sosWorks";
  props: {
    title?: string;
    subtitle?: string;
    buttonLabel?: string;
    borderColor?: string;
    note?: string;
    gradientStart?: string;
    gradientEnd?: string;
    textMuted?: string;
    noteColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    blobColor?: string;
  };
};

export type Dashboard = {
  id: string;
  type: "dashboard";
  props: {
    welcomeMessage: string;
  };
};

export type LayoutSection =
  | HeroSection
  | InfoGridSection
  | StepListSection
  | MedListSection
  | ContactSection
  | NoteSection
  | WelcomeSection
  | SosDoesSection
  | SosWorksSection
  | OnboardingSliderSection
  | ConnectFormSection
  | Dashboard
  | OtpVerifySection;

export type CareConfig = {
  patient: {
    id: string;
    name: string;
  };
  theme: ThemeConfig;
  layout: LayoutSection[];
};
