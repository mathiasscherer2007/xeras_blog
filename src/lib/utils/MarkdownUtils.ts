import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

export async function renderSafeMarkdown(markdown: string): Promise<string> {
    return DOMPurify.sanitize(await marked.parse(markdown));
}

export function renderUnsafeMarkdown(markdown: string): Promise<string> | string {
    return marked.parse(markdown);
}

export function sanitizeMarkdown(dirty: string): string {
    return DOMPurify.sanitize(dirty);
}