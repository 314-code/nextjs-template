import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Spread existing configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Base eslint recommended rules
  eslint.configs.recommended,
  
  // TypeScript-specific rules
  ...tseslint.configs.recommended,
  
  // Custom configuration
  {
    rules: {
      // Unused variables configuration
      "@typescript-eslint/no-unused-vars": [
        process.env.NODE_ENV === 'production' ? "error" : "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      
      // Additional helpful rules
      "no-console": process.env.NODE_ENV === 'production' ? "error" : "warn",
      "no-debugger": process.env.NODE_ENV === 'production' ? "error" : "warn",
    },
    
    // Ignore specific files
    ignores: [
      "node_modules/",
      ".next/",
      "dist/",
      "build/",
      "coverage/"
    ]
  }
];