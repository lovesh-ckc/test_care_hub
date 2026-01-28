import type { ComponentType } from "react";
import type {
  ContactSection,
  HeroSection,
  InfoGridSection,
  MedListSection,
  NoteSection,
  OnboardingSliderSection,
  StepListSection,
  WelcomeSection,
  ConnectFormSection,
  OtpVerifySection,
  SosDoesSection,
  SosWorksSection,
  Dashboard,
} from "@care-hub/lib/types";
import { HeroCard } from "@care-hub/components/sections/HeroCard";
import { InfoGrid } from "@care-hub/components/sections/InfoGrid";
import { StepList } from "@care-hub/components/sections/StepList";
import { MedList } from "@care-hub/components/sections/MedList";
import { ContactCard } from "@care-hub/components/sections/ContactCard";
import { NoteCard } from "@care-hub/components/sections/NoteCard";
import { WelcomeHero } from "@care-hub/components/sections/WelcomeHero";
import { OnboardingSlider } from "@care-hub/components/sections/OnboardingSlider";
import { ConnectForm } from "@care-hub/components/sections/ConnectForm";
import { OtpVerify } from "@care-hub/components/sections/OtpVerify";
import { SosDoes } from "@care-hub/components/sections/SosDoes";
import { SosWorks } from "@care-hub/components/sections/SosWorks";
import { DashboardContainer } from "@care-hub/components/sections/DashboardContainer";

type SectionComponentMap = {
  welcome: ComponentType<{ section: WelcomeSection }>;
  onboardingSlider: ComponentType<{ section: OnboardingSliderSection }>;
  connectForm: ComponentType<{ section: ConnectFormSection }>;
  otpVerify: ComponentType<{ section: OtpVerifySection }>;
  hero: ComponentType<{ section: HeroSection }>;
  infoGrid: ComponentType<{ section: InfoGridSection }>;
  stepList: ComponentType<{ section: StepListSection }>;
  medList: ComponentType<{ section: MedListSection }>;
  contact: ComponentType<{ section: ContactSection }>;
  note: ComponentType<{ section: NoteSection }>;
  sosDoes: ComponentType<{ section: SosDoesSection }>;
  sosWorks: ComponentType<{ section: SosWorksSection }>;
  dashboard: ComponentType<{ section: Dashboard }>;
};

export const sectionRegistry: SectionComponentMap = {
  welcome: WelcomeHero,
  onboardingSlider: OnboardingSlider,
  connectForm: ConnectForm,
  otpVerify: OtpVerify,
  hero: HeroCard,
  infoGrid: InfoGrid,
  stepList: StepList,
  medList: MedList,
  contact: ContactCard,
  note: NoteCard,
  sosDoes: SosDoes,
  sosWorks: SosWorks,
  dashboard: DashboardContainer,
};
