
import { createRouteHandler } from "uploadthing/next";

import { type OurFileRouter, ourFileRouter } from "./core";
import { generateReactHelpers } from "@uploadthing/react";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

