module.exports = {
  extends: ["next/core-web-vitals", "next/typescript"],
  rules: {
    // Disable specific rules
    "@typescript-eslint/no-unused-vars": "off", // Ignore unused variables
    "@typescript-eslint/ban-ts-comment": "off", // Ignore `@ts-ignore` comments
    "react-hooks/exhaustive-deps": "off", // Ignore exhaustive-deps warnings in React hooks
    "react/no-unescaped-entities": "off", // Allow unescaped entities in JSX
    "no-console": "warn", // Allow console logs but show warnings
    "no-debugger": "warn", // Allow debugger statements but show warnings
    // Add custom rule configurations if needed
    "no-unused-vars": "off", // Disables general unused vars errors (JS)
    "react/jsx-key": "warn", // Show warnings for missing keys in lists
    "@typescript-eslint/no-explicit-any": "warn", // Show warnings for `any` type usage
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Target TypeScript files specifically
      rules: {
        "@typescript-eslint/no-unused-vars": "off", // Ignore unused variables in TypeScript
        "@typescript-eslint/ban-ts-comment": "off", // Ignore `@ts-ignore` comments in TypeScript
        "@typescript-eslint/no-explicit-any": "warn", // Show warnings for `any` type usage in TypeScript
      },
    },
  ],
  settings: {
    react: {
      version: "detect", // Automatically detect React version
    },
  },
};
