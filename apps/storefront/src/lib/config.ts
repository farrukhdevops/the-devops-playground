export const cfg = {
  catalogUrl: process.env.CATALOG_API_URL || "http://catalog-api:8000",
  ordersUrl:  process.env.ORDERS_API_URL  || "http://orders-api:8000",
  paymentsUrl:process.env.PAYMENTS_API_URL|| "http://payments-api:8000",
  bffMockEnabled: (process.env.BFF_MOCK || "false").toLowerCase() === "true",
} as const;
