exports.data = function() {
  return {
    permalink: "./_generated-serverless-collections.json",
    permalinkBypassOutputDir: true,
    layout: false,
  };
};

exports.render = function(data) {
  let entries = [];
  for(let entry of data.collections.all) {
    if(entry.data && entry.data.title) {
      let o = {
        data: {
          page: {
            url: entry.data.page.url,
            title: entry.data.title,
            content: entry.templateContent,
          },
        }
      };
      entries.push(o);
    }
  }

  return JSON.stringify({
    pages: entries
  }, null, 2);
};
