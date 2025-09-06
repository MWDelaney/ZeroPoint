export default {
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      if (data.title) {
        const slug = data.eleventy.env.filters.slugify(data.title);
        return `/${slug}/`;
      }
      return false;
    },
  },
};
