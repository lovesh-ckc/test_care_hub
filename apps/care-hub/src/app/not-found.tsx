import { ExpiredState } from "@care-hub/components/states/ExpiredState";

export default function NotFound() {
  return (
    <ExpiredState
      title="Page not found"
      description="The page you requested does not exist or has moved."
    />
  );
}
