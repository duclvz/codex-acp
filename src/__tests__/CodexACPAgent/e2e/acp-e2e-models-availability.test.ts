import {afterEach, beforeEach, expect, it} from "vitest";
import {createAuthenticatedFixture, describeE2E, type SpawnedAgentFixture,} from "./acp-e2e-test-utils";
import {ModelId} from "../../../ModelId";
import {MODEL_CONFIG_ID} from "../../../ModelConfigOption";

const DEFAULT_MODEL_ID = ModelId.create("gpt-5.4-mini", "medium")

describeE2E("Models availability", () => {
    let fixture: SpawnedAgentFixture;

    beforeEach(async () => {
        fixture = await createAuthenticatedFixture();
    });

    afterEach(async () => {
        await fixture.dispose();
    });

    it(`default model is available`, async () => {
        const session = await fixture.createSession();
        const modelConfig = session.configOptions?.find(option => option.id === MODEL_CONFIG_ID);
        const models = modelConfig?.type === "select"
            ? modelConfig.options.map(option => "value" in option ? option.value : null)
            : [];
        expect(models).toContain(DEFAULT_MODEL_ID.model)
    });
});
