import { payloadSchema, TreeNode } from "@abdulgalimov/tg-framework";

const defaultTree = {
  core: {
    none: {},
    hide: {},
    command: {
      "@payloads": payloadSchema.object({
        command: payloadSchema.string(),
        value: payloadSchema.string().optional(),
      }),
    },
    text: {},
  },

  main: {
    menu: {},
    ping: {}
  }
};

type TreeWithId = TreeNode<typeof defaultTree>;

export const actionsTree = defaultTree as unknown as TreeWithId;
