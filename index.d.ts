export type PluginArgs = {
  kv: KVNamespace;
  respondWith: (args: { formData: FormData }) => Promise<Response>;
};

export default function (args: PluginArgs): PagesFunction;