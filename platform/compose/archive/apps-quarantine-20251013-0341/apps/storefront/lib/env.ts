export const CFG = {
  CATALOG: process.env.CATALOG_API_URL ?? "http://catalog-api:8000",
  ORDERS:  process.env.ORDERS_API_URL  ?? "http://orders-api:8000",
  PAYMENTS:process.env.PAYMENTS_API_URL?? "http://payments-api:8000",
  MOCKS:   (process.env.BFF_ENABLE_MOCKS ?? "false").toLowerCase() === "true",
};
