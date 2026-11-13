
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Offline from "./offline";

interface ConnectivityGateProps {
  children: ReactNode;
}

export default function ConnectivityGate({
  children,
}: ConnectivityGateProps) {
  const [online, setOnline] = useState(
    navigator.onLine
  );

  useEffect(() => {
    const checkConnection = () => {
      setOnline(navigator.onLine);
    };

    window.addEventListener("online", checkConnection);
    window.addEventListener("offline", checkConnection);

    return () => {
      window.removeEventListener("online", checkConnection);
      window.removeEventListener("offline", checkConnection);
    };
  }, []);

  if (!online) {
    return <Offline />;
  }

  return <>{children}</>;
}
