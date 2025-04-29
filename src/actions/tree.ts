import { payloadSchema, TreeNode } from "@abdulgalimov/tg-framework";

const defaultTree = {
  core: {
    none: {},
    hide: {},
    command: {
      "@payloads": payloadSchema.object({
        command: payloadSchema.string(),
        value: payloadSchema.string(),
      }),
    },
    text: {},
  },

  main: {
    menu: {},
    ping: {
      "@payloads": payloadSchema.object({
        value: payloadSchema.number(),
      }),
    },
    sendPhoto: {},
  },
};

type TreeWithId = TreeNode<typeof defaultTree>;

export const actionsTree = defaultTree as unknown as TreeWithId;
