document.addEventListener('DOMContentLoaded', () => {
    const menuRecommendationDiv = document.getElementById('menu-recommendation');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const dinnerMenus = [
        "치킨", "피자", "삼겹살", "족발", "보쌈", "짜장면", "짬뽕", "떡볶이", "김치찌개", "된장찌개", "부대찌개", "초밥", "파스타", "스테이크", "햄버거", "샌드위치", "샐러드", "라면", "우동", "돈까스"
    ];

    // Theme toggle
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Save theme preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    generateBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
        const recommendedMenu = dinnerMenus[randomIndex];
        menuRecommendationDiv.textContent = recommendedMenu;
    });
});
