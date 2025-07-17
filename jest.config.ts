import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config = {
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/dist/",
    ],
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.spec.json",
            stringifyContentPathRegex: "\\.(html|svg)$",
        },
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: "<rootDir>/",
    }),
};

export default config;
