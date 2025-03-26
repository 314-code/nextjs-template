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
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		rules: {
			// Unused variables configuration with more explicit warnings
			"@typescript-eslint/no-unused-vars": [
				"warn", // Changed to always warn
				{
					args: "all",
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
				},
			],

			// Additional helpful rules
			"no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
			"no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
			
			// Enforce consistent unused variable handling
			"no-unused-vars": "off", // Disable base rule in favor of TypeScript rule
		},

		// Ignore specific files
		ignores: ["node_modules/", ".next/", "dist/", "build/", "coverage/"],
	},
];