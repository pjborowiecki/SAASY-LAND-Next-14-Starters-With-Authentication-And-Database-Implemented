// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  },
  readingTime: {
    type: "number",
    resolve: (doc) => {
      const content = String(doc.body.raw);
      const wordsPerMinute = 200;
      const numberOfWords = content.split(/\s/g).length;
      const minutes = numberOfWords / wordsPerMinute;
      return Math.ceil(minutes);
    }
  }
};
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string"
    },
    date: {
      type: "date",
      required: true
    },
    published: {
      type: "boolean",
      default: true
    },
    image: {
      type: "string",
      required: true
    },
    authors: {
      type: "list",
      of: { type: "string" },
      required: true
    }
  },
  computedFields
}));
var Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `authors/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string"
    },
    avatar: {
      type: "string",
      required: true
    },
    twitter: {
      type: "string",
      required: true
    }
  },
  computedFields
}));
var Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string"
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Post, Author, Page],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: { dark: "github-dark", light: "github-light" },
          /**
           * @param {{ children: string | any[]; }} node
           */
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          /**
           * @param {{ properties: { className: string[]; }; }} node
           */
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          /**
           * @param {{ properties: { className: string[]; }; }} node
           */
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          }
        }
      ]
    ]
  }
});
export {
  Author,
  Page,
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-2GH35M4L.mjs.map
