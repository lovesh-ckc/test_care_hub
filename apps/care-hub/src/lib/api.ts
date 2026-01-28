import { mockCareConfigs } from "./mockConfig";
import { CareConfig } from "./types";

export async function fetchCareConfig(token: string): Promise<CareConfig> {
  // TODO: Replace this mock with a real API call when backend is ready.
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v/${token}`, {
  //   method: "GET",
  //   cache: "no-store",
  // });
  // if (!response.ok) {
  //   throw new Error("Invalid or expired link.");
  // }
  // return (await response.json()) as CareConfig;

  await new Promise((resolve) => setTimeout(resolve, 200));

  const selectedConfig = mockCareConfigs[token];
  console.log("selectedConfig ---->", selectedConfig);

  if (!selectedConfig) {
    throw new Error("Invalid or expired link.");
  }

  return selectedConfig;
}
