import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});

// (function() {
//   const addEvent = EventTarget.prototype.addEventListener;
//   EventTarget.prototype.addEventListener = function(type, listener, options) {
//     let opts = options;

//     if (
//       (type === "touchstart" ||
//         type === "touchmove" ||
//         type === "wheel" ||
//         type === "scroll") &&
//       options !== true &&
//       options !== false &&
//       (!options || options.passive === undefined)
//     ) {
//       opts = { ...options, passive: true };
//     }

//     return addEvent.call(this, type, listener, opts);
//   };
// })();