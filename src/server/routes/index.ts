import { RegisterRoute } from "../types";
import { registerAuthRoutes } from "./auth";

export const registerRoutes: RegisterRoute = (app) => {
  registerAuthRoutes(app)
}