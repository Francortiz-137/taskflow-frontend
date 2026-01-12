import { useEffect, useState } from "react";
import { refreshSession } from "./authApi";
import { tokenStore } from "./tokenStore";

export function useSessionBootstrap() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      if (tokenStore.getRefreshToken()) {
        try {
          await refreshSession();
        } catch {
          tokenStore.clear();
        }
      }
      setReady(true);
    }

    bootstrap();
  }, []);

  return ready;
}
