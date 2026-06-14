import { z } from 'zod';
export const AppConfigSchema = z.object({
    apiUrl: z.string().url(),
    environment: z.enum(['development', 'production', 'test']),
});
export const GREETING = "Hello from Shared Package!";
//# sourceMappingURL=index.js.map