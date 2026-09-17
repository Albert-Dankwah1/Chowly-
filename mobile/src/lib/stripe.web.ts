export const initStripe = async (_params?: unknown): Promise<void> => {};

export const useStripe = () => ({
  initPaymentSheet: async (_params?: unknown) => ({ error: undefined }),
  presentPaymentSheet: async () => ({ error: undefined }),
});
