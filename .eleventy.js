const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  // Watch for CSS changes
  eleventyConfig.addWatchTarget("src/assets/css/");
  
  // Copy assets and custom domain file to output
  eleventyConfig.addPassthroughCopy("src/assets/css/");
  eleventyConfig.addPassthroughCopy("src/assets/js/");
  eleventyConfig.addPassthroughCopy("src/assets/images/");
  eleventyConfig.addPassthroughCopy("CNAME");
  
  // Setup Markdown
  const md = markdownIt({
    html: true,
    linkify: true,
  });
  eleventyConfig.setLibrary("md", md);
  
  // Add date filter
  eleventyConfig.addFilter("dateFilter", function(date, format) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const monthLong = d.toLocaleString('default', { month: 'long' });
    const dayNum = d.getDate();
    
    if (format === 'yyyy-MM-dd') {
      return `${year}-${month}-${day}`;
    } else if (format === 'MMMM dd, yyyy') {
      return `${monthLong} ${dayNum}, ${year}`;
    }
    return d.toDateString();
  });
  
  // Collections
  eleventyConfig.addCollection("articles", function (collection) {
    return collection
      .getFilteredByGlob("src/articles/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  eleventyConfig.addCollection("tagList", function (collection) {
    const tags = new Set();

    collection
      .getFilteredByGlob("src/articles/*.md")
      .forEach((item) => {
        const articleTags = Array.isArray(item.data.tags) ? item.data.tags : [];
        articleTags.forEach((tag) => tags.add(tag));
      });

    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  });

  eleventyConfig.addFilter("filterByTag", function (articles, tag) {
    return articles.filter((article) => {
      const articleTags = Array.isArray(article.data.tags) ? article.data.tags : [];
      return articleTags.includes(tag);
    });
  });

  eleventyConfig.addFilter("stripHtml", function (value) {
    return String(value || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  });
  
  return {
    dir: {
      input: "src",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
