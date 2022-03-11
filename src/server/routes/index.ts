import { RegisterRoute } from "../types";
import { registerAuthRoutes } from "./auth";
import { registerTransactionRoutes } from "./transaction";

export const registerRoutes: RegisterRoute = (app) => {
  registerAuthRoutes(app)
  registerTransactionRoutes(app)
}