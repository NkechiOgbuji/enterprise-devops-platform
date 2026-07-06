const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const register = new client.Registry();

client.collectDefaultMetrics({
  register,
});

const httpRequestCounter = new client.Counter({
  name: "enterprise_app_http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

register.registerMetric(httpRequestCounter);

app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
  });

  next();
});

app.get("/", (req, res) => {
  res.json({
    application: "Enterprise DevOps App",
    status: "running",
    environment: process.env.NODE_ENV || "development",
    message: "Enterprise platform workload is running successfully",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`Enterprise DevOps App running on port ${PORT}`);
});