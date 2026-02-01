#!/usr/bin/env bun
import { $ } from "bun"

await $`./script/generate.ts`
await $`./packages/sdk/js/script/build.ts`
await $`./packages/opencode/script/build.ts --single`
