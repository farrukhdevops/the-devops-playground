import { CFG } from "./env";

/** Back-compat alias so routes can import `cfg` */
export const cfg = {
  catalogUrl:  CFG.CATALOG,
  ordersUrl:   CFG.ORDERS,
  paymentsUrl: CFG.PAYMENTS,
  bffMockEnabled: CFG.MOCKS,
};
export type Cfg = typeof cfg;
