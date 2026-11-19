document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('article-search');
  const articleList = document.querySelector('.articles-list');
  const pagination = document.querySelector('.pagination');

  if (!searchInput || !articleList) {
    return;
  }

  const defaultMarkup = articleList.innerHTML;
  const normalize = (value) => value.toLowerCase().trim();
  let searchData = [];

  fetch('/assets/search-data.json')
    .then((response) => response.json())
    .then((data) => {
      searchData = data.articles || [];
    })
    .catch(() => {
      searchData = [];
    });

  const renderMatches = (query) => {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      articleList.innerHTML = defaultMarkup;
      if (pagination) {
        pagination.style.display = '';
      }
      return;
    }

    const matches = searchData.filter((article) => {
      const haystack = [
        article.title,
        article.excerpt,
        article.content,
        ...(article.tags || [])
      ].join(' ').toLowerCase();

      return haystack.includes(normalizedQuery);
    });

    if (matches.length === 0) {
      articleList.innerHTML = '<li class="search-empty">No articles matched your search.</li>';
      if (pagination) {
        pagination.style.display = 'none';
      }
      return;
    }

    articleList.innerHTML = matches.map((article) => `
      <li>
        <a href="${article.url}">${article.title}</a>
        <p class="article-meta">${article.date}</p>
        ${article.excerpt ? `<p>${article.excerpt}</p>` : ''}
      </li>
    `).join('');

    if (pagination) {
      pagination.style.display = 'none';
    }
  };

  searchInput.addEventListener('input', (event) => {
    renderMatches(event.target.value);
  });
});
