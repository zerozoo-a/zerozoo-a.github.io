import { type MermaidConfig } from './config.type.js';
/**
 * Default mermaid configuration options.
 *
 * Please see the Mermaid config JSON Schema for the default JSON values.
 * Non-JSON JS default values are listed in this file, e.g. functions, or
 * `undefined` (explicitly set so that `configKeys` finds them).
 */
declare const config: Partial<MermaidConfig>;
export declare const configKeys: string[];
export default config;
