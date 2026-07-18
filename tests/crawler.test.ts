import { describe, it } from "vitest"
import { crawlData } from "@src/services/crawlService"

describe("Crawler", () => {
    it("크롤링 테스트", async () => {
        await crawlData();
    })
})