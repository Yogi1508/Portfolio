import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const mergeCss = (...inputs) => {
    return twMerge(clsx(inputs));
}