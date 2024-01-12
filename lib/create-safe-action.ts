// create-safe-action.ts
export type ActionState<TInput, TOutput> =
  | {
      data: TOutput;
      error?: undefined;
    }
  | {
      data?: undefined;
      error: string;
    };

export const createSafeAction =
  <TInput, TOutput>(handler: (data: TInput) => Promise<ActionState<TInput, TOutput>>) =>
  async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    try {
      const result = await handler(data);
      return result;
    } catch (error) {
      return {
        error: 'Internal server error',
      } as ActionState<TInput, TOutput>;
    }
  };
