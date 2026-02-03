import path from "path"
import { Server } from "../../server/server"
import { cmd } from "./cmd"
import { withNetworkOptions, resolveNetworkOptions } from "../network"
import { Flag } from "../../flag/flag"

export const ServeCommand = cmd({
  command: "serve [project]",
  builder: (yargs) =>
    withNetworkOptions(yargs).positional("project", {
      type: "string",
      describe: "path to start opencode in",
    }),
  describe: "starts a headless opencode server",
  handler: async (args) => {
    // Change to project directory if specified
    if (args.project) {
      const baseCwd = process.env.PWD ?? process.cwd()
      const cwd = path.resolve(baseCwd, args.project)
      process.chdir(cwd)
    }

    if (!Flag.OPENCODE_SERVER_PASSWORD) {
      console.log("Warning: OPENCODE_SERVER_PASSWORD is not set; server is unsecured.")
    }
    const opts = await resolveNetworkOptions(args)
    const server = Server.listen(opts)
    console.log(`opencode server listening on http://${server.hostname}:${server.port}`)
    await new Promise(() => {})
    await server.stop()
  },
})
