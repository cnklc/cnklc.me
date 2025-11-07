document.addEventListener('DOMContentLoaded', () => {
    const articleListDiv = document.getElementById('article-list');
    const articleDetailDiv = document.getElementById('article-detail');
    const articlesUl = document.getElementById('articles');
    const articleTitle = document.getElementById('article-title');
    const articleContent = document.getElementById('article-content');
    const backToListBtn = document.getElementById('back-to-list');

    const articles = [
        { id: 'ilk-makale', title: 'İlk Makale', file: 'Makale/ilk-makale.md' },
        { id: 'ikinci-makale', title: 'İkinci Makale', file: 'Makale/ikinci-makale.md' }
    ];

    function renderArticleList() {
        articlesUl.innerHTML = '';
        articles.forEach(article => {
            const li = document.createElement('li');
            li.textContent = article.title;
            li.dataset.articleId = article.id;
            li.addEventListener('click', () => loadArticle(article));
            articlesUl.appendChild(li);
        });
    }

    async function loadArticle(article) {
        try {
            const response = await fetch(article.file);
            const markdown = await response.text();
            // In a real application, you would use a markdown parser here
            // For simplicity, we'll just display the raw markdown for now
            // Example: articleContent.innerHTML = marked.parse(markdown);
            articleTitle.textContent = article.title;
            articleContent.innerHTML = `<pre>${markdown}</pre>`; // Display raw markdown

            articleListDiv.style.display = 'none';
            articleDetailDiv.style.display = 'block';
        } catch (error) {
            console.error('Error loading article:', error);
            articleTitle.textContent = 'Hata';
            articleContent.textContent = 'Makale yüklenirken bir hata oluştu.';
            articleListDiv.style.display = 'none';
            articleDetailDiv.style.display = 'block';
        }
    }

    backToListBtn.addEventListener('click', () => {
        articleDetailDiv.style.display = 'none';
        articleListDiv.style.display = 'block';
    });

    renderArticleList();
});
