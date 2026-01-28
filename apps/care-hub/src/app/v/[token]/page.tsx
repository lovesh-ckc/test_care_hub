import { LayoutRenderer } from "@care-hub/components/layout/LayoutRenderer";
import { ClientCareFlow } from "@care-hub/components/layout/ClientCareFlow";
import { TabletFrame } from "@care-hub/components/layout/TabletFrame";
import { ExpiredState } from "@care-hub/components/states/ExpiredState";
import { fetchCareConfig } from "@care-hub/lib/api";

type CareLinkPageProps = {
  params: Promise<{ token: string }>;
};

export default async function CareLinkPage({ params }: CareLinkPageProps) {
  const { token } = await params;

  let config;
  try {
    config = await fetchCareConfig(token);
  } catch {
    return (
      <ExpiredState
        title="Invite expired"
        description="This invite link has already been used or has expired."
      />
    );
  }

  if (!config) {
    return (
      <ExpiredState
        title="Invite expired"
        description="This invite link has already been used or has expired."
      />
    );
  }

  const isFullScreenFlow = config.layout.every(
    (section) =>
      section.type === "welcome" ||
      section.type === "onboardingSlider" ||
      section.type === "connectForm" ||
      section.type === "otpVerify" ||
      section.type === "sosDoes" ||
      section.type === "sosWorks" ||
      section.type === "dashboard"
  );

  return (
    <TabletFrame theme={config.theme} variant={isFullScreenFlow ? "flat" : "frame"}>
      {isFullScreenFlow ? (
        <ClientCareFlow layout={config.layout} />
      ) : (
        <LayoutRenderer layout={config.layout} />
      )}
    </TabletFrame>
  );
}
