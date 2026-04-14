/**
 * Business name configuration.
 * Switch ACTIVE_BUSINESS to change the displayed brand.
 */
export const BUSINESS_NAMES = {
  1: "Kohinoor Cars",
  2: "HM'ZAH Cars",
  3: "Shree Vaishnavi Cars",
  4: "Harsha Cars",
  5: "National Motors",
} as const;

export type BusinessKey = keyof typeof BUSINESS_NAMES;

export const ACTIVE_BUSINESS: BusinessKey = 5;

/** Active business name – use across the app */
export const BUSINESS_NAME = BUSINESS_NAMES[ACTIVE_BUSINESS];
