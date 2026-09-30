/**
 * dsh-at-file host types: the plugin configuration face. The wire contract
 * types live in `contract.ts` and are re-exported here for the host entry.
 */

import type { AtFileSettings, FileEntry, FileIgnoreRuleInput, WorkspaceIgnoreFiles } from './contract.ts'

export type { AtFileSettings, FileEntry, FileIgnoreRuleInput, WorkspaceIgnoreFiles } from './contract.ts'

/** Resolved plugin configuration (schema defaults applied). */
export interface ResolvedConfig {
  /** Hard cap on indexed entries per workspace; the walk stops and reports truncation. */
  readonly maxIndexedFiles: number
  /** Directory basenames the index walk skips entirely. */
  readonly ignoreDirs: readonly string[]
  /** Whether the @file surface is enabled; false hides picker, dock, and reference injection. */
  readonly enabled: boolean
  /** Global Exact and Regex basename filters; legacy strings are insensitive Exact rules. */
  readonly ignoreFiles: FileIgnoreRuleInput[]
  /** Whether an empty global filter list was explicitly saved by a current client. */
  readonly ignoreFilesConfigured: boolean
  /** Workspace-specific filters added to the global filters. */
  readonly workspaceIgnoreFiles: WorkspaceIgnoreFiles[]
  /** Whether @ tokens inserted through paste stay ordinary text. */
  readonly ignorePastedMentions: boolean
}
