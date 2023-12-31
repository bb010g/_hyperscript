#!/usr/bin/env ts-node
// https://github.com/evanw/esbuild/issues/2388
/// <reference path="../types/node.d.ts" />

import * as esbuild from "esbuild";
import { fileURLToPath, resolve } from "node:url";

const rootUrl = resolve(import.meta.url, "..");

export async function main() {
    await esbuild.build({
        absWorkingDir: fileURLToPath(rootUrl),
        bundle: false,
        charset: "ascii",
        conditions: ["module"],
        entryPoints: ["src/_hyperscript.mjs"],
        outbase: "src/",
        outdir: "dist/",
        outExtension: { ".js": ".mjs" },
        platform: "browser",
        target: "es2015",
    });
}

if (
    "main" in import.meta
        ? (import.meta as any).main
        : (await import("es-main")).default(import.meta)
) {
    await main();
}
