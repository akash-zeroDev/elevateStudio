// Mock Supabase admin client to prevent build errors until the real Supabase backend is configured
export const supabaseAdmin = {
  from: (table: string) => ({
    insert: async (data: any) => {
      console.log(`[Mock Supabase] Inserting into ${table}:`, data);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { error: null };
    },
  }),
};
