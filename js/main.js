document.addEventListener('DOMContentLoaded', function() {
    // 載入並渲染 Markdown 內容
    fetch('https://raw.githubusercontent.com/JaydenChao101/JaydenChao101/refs/heads/main/README.md')
        .then(response => response.text())
        .then(text => {
            document.getElementById('content').innerHTML = marked.parse(text);
        })
        .catch(error => {
            console.error('Error loading markdown:', error);
            document.getElementById('content').innerHTML = '<p>Error loading content.</p>';
        });

    // 平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});