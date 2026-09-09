import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

export async function renderSafeMarkdown(markdown: string): Promise<string> {
    return DOMPurify.sanitize(await marked.parse(markdown));
}