import { z } from 'zod';
export declare const AppConfigSchema: z.ZodObject<{
    apiUrl: z.ZodString;
    environment: z.ZodEnum<["development", "production", "test"]>;
}, "strip", z.ZodTypeAny, {
    apiUrl: string;
    environment: "development" | "production" | "test";
}, {
    apiUrl: string;
    environment: "development" | "production" | "test";
}>;
export type AppConfig = z.infer<typeof AppConfigSchema>;
export declare const GREETING = "Hello from Shared Package!";
