import morgan from "morgan";

const isDev = process.env.NODE_ENV === "development";
const logger = morgan("dev");

export default logger;
