import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { connectDatabase, disconnectDatabase } from "./config/database.config";
import { Env } from "./config/env.config";
import { HTTPSTATUS } from "./config/http-status.config";
import { configurePassport, passport } from "./config/passport.config";
import { stripeWebhookController } from "./controllers/stripe-webhook.controller";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { apiLimiter } from "./middlewares/rateLimiter.middleware";
import { routes } from "./routes/v1";
import { NotFoundException } from "./utils/app-error";
import { logger } from "./utils/logger";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
// Stripe signs the exact bytes it sent, so this one route keeps the raw body
// and must be mounted before any JSON parser.
app.post(
  "/api/v1/webhooks/stripe",
  express.raw({ type: "application/json", limit: "100kb" }),
  stripeWebhookController,
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(cookieParser());

if (Env.CORS_ORIGIN) {
  app.use(
    cors({
      origin: Env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
      credentials: true,
    }),
  );
}

configurePassport();
app.use(passport.initialize());

app.get("/health", (_request, response) => response.status(HTTPSTATUS.OK).json({ status: "ok" }));

app.use("/api/v1", apiLimiter, routes);

app.use((request, _response, next) => {
  next(new NotFoundException(`Route not found: ${request.method} ${request.originalUrl}`));
});

app.use(errorHandler);

const startServer = async () => {
  // Fail fast and loudly: never report the API as ready without its database.
  await connectDatabase();

  
  const server = app.listen(Env.PORT, () => {
    logger.info("API listening", { port: Env.PORT, environment: Env.NODE_ENV });
  });

  const shutdownSignals: NodeJS.Signals[] = ["SIGTERM", "SIGINT"];
  let shuttingDown = false;

  const shutdown = (signal: NodeJS.Signals) => {
    if (shuttingDown) return;
    shuttingDown = true;

    logger.info("Shutting down API", { signal });

    server.close(async (error) => {
      if (error) logger.error("Shutdown failed", { error: error.message });

      await disconnectDatabase().catch((disconnectError: unknown) => {
        logger.error("Database disconnect failed", {
          error: disconnectError instanceof Error ? disconnectError.message : "Unknown error",
        });
      });

      process.exitCode = error ? 1 : 0;
    });
  };

  shutdownSignals.forEach((signal) => process.once(signal, () => shutdown(signal)));

  process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled promise rejection", {
      error: reason instanceof Error ? reason.message : String(reason),
    });
  });

  process.on("uncaughtException", (error) => {
    logger.error("Uncaught exception", { error: error.message });
    shutdown("SIGTERM");
  });
};

void startServer().catch((error: unknown) => {
  logger.error("API failed to start", {
    error: error instanceof Error ? error.message : "Unknown error",
  });
  process.exit(1);
});
