document.addEventListener('DOMContentLoaded', () => {
    // ===== Menu Recommendation =====
    const menuRecommendationDiv = document.getElementById('menu-recommendation');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    const dinnerMenus = {
        "ko": [
            "치킨", "피자", "삼겹살", "족발", "보쌈", "짜장면", "짬뽕", "떡볶이", "김치찌개", "된장찌개", "부대찌개", "초밥", "파스타", "스테이크", "햄버거", "샌드위치", "샐러드", "라면", "우동", "돈까스"
        ],
        "en": [
            "Chicken", "Pizza", "Pork Belly", "Jokbal", "Bossam", "Jajangmyeon", "Jjamppong", "Tteokbokki", "Kimchi Jjigae", "Doenjang Jjigae", "Budae Jjigae", "Sushi", "Pasta", "Steak", "Hamburger", "Sandwich", "Salad", "Ramen", "Udon", "Donkatsu"
        ]
    };

    // ===== Theme Toggle =====
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // ===== Menu Generation =====
    if (generateBtn && menuRecommendationDiv) {
        generateBtn.addEventListener('click', () => {
            const lang = document.documentElement.lang || 'ko';
            const menus = dinnerMenus[lang] || dinnerMenus['ko'];
            const randomIndex = Math.floor(Math.random() * menus.length);
            const recommendedMenu = menus[randomIndex];

            // Add animation effect
            menuRecommendationDiv.style.opacity = '0';
            menuRecommendationDiv.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                menuRecommendationDiv.textContent = recommendedMenu;
                menuRecommendationDiv.style.opacity = '1';
                menuRecommendationDiv.style.transform = 'translateY(0)';
            }, 150);
        });

        // Add CSS transition for animation
        menuRecommendationDiv.style.transition = 'opacity 0.3s, transform 0.3s';
    }

    // ===== Mobile Menu Toggle =====
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.main-nav')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
