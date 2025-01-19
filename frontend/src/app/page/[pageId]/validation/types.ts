import { z } from "zod";
import { pageFormSchema } from "./pageFormSchema";

export type FormValues = z.infer<typeof pageFormSchema>;
