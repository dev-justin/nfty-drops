"use client";

// ThirdWeb SDK
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

function ThirdWebContext({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      {children}
    </ThirdwebProvider>
  );
}

export default ThirdWebContext;
