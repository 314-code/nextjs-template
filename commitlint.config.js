const shell = require("shelljs");

/** @type {import('commitlint').Config} */
module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"],
		],
		"scope-enum": async () => {
			const branch = shell.exec("git rev-parse --abbrev-ref HEAD", { silent: true }).stdout.trim();

			return [
				2,
				"always",
				[
					branch,
					"core",
					"api",
					"ui",
					"db",
					"config",
					"auth",
					"search",
					"checkout",
					"ci",
					"build",
					"eslint",
					"prettier",
				],
			];
		},
		"scope-case": [2, "always", "upper-case"],
	},
};
