import path from "path";
import { fileURLToPath } from "url";

import { defineConfig } from "vite-plus";

export default defineConfig({
  build: {
    outDir: fileURLToPath(new URL("./templates/assets/dist", import.meta.url)),
    emptyOutDir: true,
    lib: {
      entry: path.resolve(process.cwd(), "src/main.ts"),
      name: "main",
      fileName: "main",
      formats: ["iife"],
    },
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  fmt: {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    endOfLine: "lf",
    sortPackageJson: true,
    insertFinalNewline: true,
    sortImports: {},
    ignorePatterns: [],
  },
  staged: {
    "*": ["vp check"],
  },
});
