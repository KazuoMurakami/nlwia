import { summaryExample } from "./utils/summary.js";
import { pipeline } from "@xenova/transformers";
export default async function summarize(text) {
    try {
        console.log("realizando o resumo...");
        const generator = await pipeline(
            "summarization",
            "Xenova/distilbart-cnn-6-6"
        );

        const output = await generator(text);
        return output[0].summary_text;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
