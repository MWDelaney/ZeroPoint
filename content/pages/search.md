---
title: Search Results 🔍
permalink: /search/
---
This page displays search results powered by [Pagefind](https://pagefind.app/).

<div id="search"></div>
<script type="module" src="/assets/search/pagefind.js"></script>
<script type="module" src="/assets/search/pagefind-ui.js"></script>
<script type="module">
  window.addEventListener('DOMContentLoaded', () => {
    new PagefindUI({
      element: '#search',
      showSubResults: true,
      bundlePath: '/assets/search/'
    });
  });
</script>
