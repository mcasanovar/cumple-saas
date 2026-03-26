export type PaymentStatus = "pending" | "approved" | "rejected" | "cancelled";

export type CreatePreferenceResult =
  | { success: true; checkoutUrl: string; preferenceId: string }
  | { success: false; error: string };

export type PaymentCallbackParams = {
  payment_id?: string;
  status?: PaymentStatus;
  external_reference?: string;
  merchant_order_id?: string;
};
