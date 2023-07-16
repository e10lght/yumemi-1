/* eslint-disable no-undef */
/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
};