export type PricingRule = {
  basePrice: number;
  quantityBreaks?: { minimum: number; unitPrice: number }[];
  finishSurcharges?: Record<string, number>;
  doubleSidedSurcharge?: number;
  designFee?: number;
  shipping?: number;
};

export type PricingInput = {
  quantity: number;
  finish?: string;
  doubleSided?: boolean;
  designService?: boolean;
};

export type PricingResult = {
  subtotal: number;
  shipping: number;
  total: number;
};

/** Pure pricing function shared by trusted server-side pricing implementations. */
export function calculateConfiguredPrice(input: PricingInput, rules: PricingRule): PricingResult {
  const breaks = [...(rules.quantityBreaks ?? [])].sort((a, b) => b.minimum - a.minimum);
  const selectedBreak = breaks.find((item) => input.quantity >= item.minimum);
  const unitPrice = selectedBreak?.unitPrice ?? rules.basePrice;
  const finishSurcharge = input.finish ? rules.finishSurcharges?.[input.finish] ?? 0 : 0;
  const unitSubtotal = unitPrice + finishSurcharge + (input.doubleSided ? rules.doubleSidedSurcharge ?? 0 : 0);
  const subtotal = unitSubtotal * input.quantity + (input.designService ? rules.designFee ?? 0 : 0);
  const shipping = rules.shipping ?? 0;
  return { subtotal, shipping, total: subtotal + shipping };
}
