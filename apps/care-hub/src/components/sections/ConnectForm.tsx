"use client";

import type { ConnectFormSection } from "@care-hub/lib/types";
import { EmailOtpRequest } from "@care-hub/components/sections/EmailOtpRequest";

type ConnectFormProps = {
  section: ConnectFormSection;
  onBack?: () => void;
  onNext?: () => void;
};

export function ConnectForm({ section, onBack, onNext }: ConnectFormProps) {
  return <EmailOtpRequest section={section} onBack={onBack} onNext={onNext} />;
}
