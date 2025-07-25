import type {Config} from "jest";

const config: Config = {
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
    transform: {
        "^.+\\.(ts|js|html)$": [
            "jest-preset-angular",
            {
                tsconfig: "<rootDir>/tsconfig.spec.json",
                stringifyContentPathRegex: "\\.(html|svg)$",
            },
        ],
    },
    moduleNameMapper: {
        "^@app/(.*)$": "<rootDir>/src/app/$1",
    },
};

export default config;
