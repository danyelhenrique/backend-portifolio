import dotEnv from "dotenv";
import { resolve } from "path";
const isTest = process.env.NODE_ENV === "test";
const isDev = process.env.NODE_ENV === "development";

const testPath = resolve(__dirname, "..", "..", ".env.test");
const devPath = resolve(__dirname, "..", "..", ".env.dev");
const prodPath = resolve(__dirname, "..", "..", "..", ".env");

const config = dotEnv.config({
  debug: process.env.NODE_ENV !== "production",
  path: (isDev && devPath) || (isTest && testPath) || prodPath,
});

export default config;
