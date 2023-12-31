import { fileURLToPath } from "node:url";
import type {
    OutputOptions as RollupOutputOptions,
    Plugin as RollupPlugin,
    RollupOptions,
} from "rollup";
import gzip from "rollup-plugin-gzip";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import sucrase from "@rollup/plugin-sucrase";
import terser from "@rollup/plugin-terser";

const coreEsOptions = {
    file: "dist/_hyperscript.mjs",
    format: "es",
    generatedCode: "es2015",
} satisfies RollupOutputOptions;
const coreUmdOptions = {
    amd: {
        id: "_hyperscript",
    },
    file: "dist/_hyperscript.js",
    format: "umd",
    generatedCode: "es2015",
    name: "_hyperscript",
    indent: "    ",
    plugins: [] as RollupPlugin<any>[],
} satisfies RollupOutputOptions;
const coreMinifiedUmdOptions = Object.assign({}, coreUmdOptions, {
    file: "dist/_hyperscript.min.js",
    plugins: coreUmdOptions.plugins.concat([
        terser({
            mangle: {
                eval: true,
            },
        }),
    ]),
} satisfies Partial<RollupOutputOptions>) satisfies RollupOutputOptions;
const coreIifeOutroReplacementCounts = new Map();
const coreIifeOutroReplacementGuard = (replacement: string) => (id: string) => {
    const replacementCount = coreIifeOutroReplacementCounts.get(id) ?? 0;
    if (replacementCount > 1) {
        throw new Error(`\`global._hyperscript = factory()\` found more than once in ${id}`);
    }
    coreIifeOutroReplacementCounts.set(id, replacementCount + 1);
    return replacement;
};
const coreOptions = {
    input: "src/_hyperscript.mts",
    output: [coreEsOptions, coreUmdOptions, coreMinifiedUmdOptions],
    plugins: [
        sucrase({
            disableESTransforms: true,
            transforms: ['typescript'],
        }),
        // disable AMD in UMD finalizer
        replace({
            delimiters: ["(?:\n    )?", ""],
            include: [/\.(?:min\.)?js$/],
            preventAssignment: false,
            values: {
                "typeof define === 'function' && define.amd ? define('_hyperscript', factory) :":
                    "",
                "typeof define==='function'&&define.amd?define('_hyperscript',f):": "",
            },
        }),
        // custom outro for IIFE finalizer
        replace({
            delimiters: ["(?:\\b|(?<=[(]\\s*))", "(?:\\b|(?=\\s*[);]))(?!\\.)"],
            include: [/\.(?:min\.)?js$/],
            preventAssignment: false,
            values: {
                "g._hyperscript=f()": coreIifeOutroReplacementGuard(
                    "(g._hyperscript=f(),'document'in g&&g._hyperscript.browserInit(),g._hyperscript)",
                ),
                "global._hyperscript = factory()": coreIifeOutroReplacementGuard(
                    "(global._hyperscript = factory(), 'document' in global && global._hyperscript.browserInit(), global._hyperscript)",
                ),
            },
        }),
        gzip({
            filter: /\.min\.m?js$/,
        }),
    ],
    treeshake: false,
} satisfies RollupOptions;

const corePath = fileURLToPath(new URL("src/_hyperscript.mjs", import.meta.url));

export default [
    coreOptions,
    {
        external: [corePath],
        input: "src/node-hyperscript.mjs",
        output: [
            {
                file: "dist/node-hyperscript.js",
                format: "cjs",
                paths: {
                    [corePath]: "./_hyperscript.js",
                }
            },
        ],
        plugins: [
            replace({
                include: "src/node-hyperscript.mjs",
                preventAssignment: true,
                values: {
                    "nodeRequire": "require",
                },
            }),
            nodeResolve({
                browser: false,
            }),
        ],
        treeshake: {
            moduleSideEffects: false,
        },
    },
] as RollupOptions[];
