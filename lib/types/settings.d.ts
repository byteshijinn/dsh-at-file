/**
 * The `at-file` settings: the durable enable switch, pasted-mention policy,
 * and file-name filters managed from the Web client.
 *
 * dsh 0.2 removed `ctx.settings.register`, so settings namespaces can no
 * longer be registered imperatively. The settings now live in the plugin's
 * own `Config` (see `src/index.ts`): schema-derived forms, editable from the
 * profile patch with Loader hot-reload. This module keeps the field schemas
 * in one place (shared by `Config` and the store validator) and provides the
 * process-local live store the runtime reads on every call, so
 * `atFile/updateSettings` takes effect without a restart.
 */
import z from '@deepseek-ai/schemastery';
import type { SettingsNamespace } from '@deepseek-ai/dsh-settings';
import type { AtFileSettings } from './contract.ts';
import type { FileIgnoreRule } from './contract.ts';
/**
 * @deprecated dsh 0.2 removed namespace registration; kept for import
 * compatibility only. Configure the plugin through its own `Config` instead.
 */
export declare const AT_FILE_NAMESPACE: SettingsNamespace;
/** One file filter rule (legacy strings stay accepted as exact, insensitive rules). */
export declare const fileIgnoreRuleSchema: z<string | FileIgnoreRule, string | FileIgnoreRule, "plain">;
/** Workspace-scoped file filter rows. */
export declare const workspaceIgnoreFilesSchema: z<({
    workspace?: string | null | undefined;
    ignoreFiles?: (string | FileIgnoreRule)[] | null | undefined;
} & import("@deepseek-ai/cosmokit").Dict)[], Schemastery.ObjectT<NoInfer<{
    workspace: z<string, string, "plain">;
    ignoreFiles: z<(string | FileIgnoreRule)[], (string | FileIgnoreRule)[], "plain">;
}>>[], "plain">;
/** Schemastery schema of the `at-file` settings section (store validator). */
export declare const AtFileSettingsSchema: z<AtFileSettings>;
/** Live process-local settings store backing the runtime and the wire endpoints. */
export interface AtFileSettingsStore {
    get(): AtFileSettings;
    update(patch: Partial<AtFileSettings>): Promise<AtFileSettings>;
}
/**
 * Create the store seeded from the resolved plugin Config. Runtime writes via
 * `atFile/updateSettings` update the live value immediately; durable edits go
 * through the plugin Config in the profile patch (applied on Loader reload).
 * @param initial - settings resolved from the plugin Config.
 * @returns the live store backing the runtime's per-call reads.
 */
export declare function createAtFileSettingsStore(initial: AtFileSettings): AtFileSettingsStore;
