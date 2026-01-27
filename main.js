document.addEventListener('DOMContentLoaded', () => {
    // ===== Menu Recommendation =====
    const menuRecommendationDiv = document.getElementById('menu-recommendation');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const shareButtons = document.getElementById('share-buttons');
    const body = document.body;

    // 현재 추천된 메뉴 저장
    let currentMenu = '';

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
            currentMenu = recommendedMenu;

            // Add animation effect
            menuRecommendationDiv.style.opacity = '0';
            menuRecommendationDiv.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                menuRecommendationDiv.textContent = recommendedMenu;
                menuRecommendationDiv.style.opacity = '1';
                menuRecommendationDiv.style.transform = 'translateY(0)';

                // 공유 버튼 표시
                if (shareButtons) {
                    shareButtons.classList.add('visible');
                }
            }, 150);
        });

        // Add CSS transition for animation
        menuRecommendationDiv.style.transition = 'opacity 0.3s, transform 0.3s';
    }

    // ===== SNS Share Functions =====
    const siteUrl = 'https://week1-22d0d.web.app/';
    const lang = document.documentElement.lang || 'ko';

    // 공유 메시지 생성
    function getShareText() {
        if (lang === 'en') {
            return `🍽️ Tonight's dinner is "${currentMenu}"!\n\nCan't decide what to eat? Try this random menu picker!\n`;
        }
        return `🍽️ 오늘 저녁은 "${currentMenu}"(으)로 결정!\n\n뭐 먹을지 고민될 때? 랜덤 메뉴 추천 받아보세요!\n`;
    }

    // 트위터(X) 공유
    window.shareToTwitter = function() {
        if (!currentMenu) {
            alert(lang === 'en' ? 'Please get a menu recommendation first!' : '먼저 메뉴 추천을 받아주세요!');
            return;
        }
        const text = encodeURIComponent(getShareText());
        const url = encodeURIComponent(siteUrl);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
    };

    // 페이스북 공유
    window.shareToFacebook = function() {
        if (!currentMenu) {
            alert(lang === 'en' ? 'Please get a menu recommendation first!' : '먼저 메뉴 추천을 받아주세요!');
            return;
        }
        const url = encodeURIComponent(siteUrl);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
    };

    // 카카오톡 공유
    window.shareToKakao = function() {
        if (!currentMenu) {
            alert(lang === 'en' ? 'Please get a menu recommendation first!' : '먼저 메뉴 추천을 받아주세요!');
            return;
        }
        // Kakao SDK가 로드되지 않은 경우 링크 복사로 대체
        if (typeof Kakao === 'undefined') {
            copyShareLink();
            return;
        }
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: lang === 'en' ? `Tonight's dinner: ${currentMenu}` : `오늘 저녁: ${currentMenu}`,
                description: lang === 'en'
                    ? "Can't decide what to eat? Try this random menu picker!"
                    : '뭐 먹을지 고민될 때? 랜덤 메뉴 추천 받아보세요!',
                imageUrl: 'https://week1-22d0d.web.app/og-image.png',
                link: {
                    mobileWebUrl: siteUrl,
                    webUrl: siteUrl
                }
            },
            buttons: [
                {
                    title: lang === 'en' ? 'Get Recommendation' : '나도 추천받기',
                    link: {
                        mobileWebUrl: siteUrl,
                        webUrl: siteUrl
                    }
                }
            ]
        });
    };

    // 링크 복사
    window.copyShareLink = function() {
        if (!currentMenu) {
            alert(lang === 'en' ? 'Please get a menu recommendation first!' : '먼저 메뉴 추천을 받아주세요!');
            return;
        }
        const shareText = getShareText() + siteUrl;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(shareText).then(() => {
                showCopyToast();
            }).catch(() => {
                fallbackCopy(shareText);
            });
        } else {
            fallbackCopy(shareText);
        }
    };

    // 클립보드 복사 폴백
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showCopyToast();
        } catch (e) {
            alert(lang === 'en' ? 'Failed to copy. Please copy manually.' : '복사에 실패했습니다. 직접 복사해주세요.');
        }
        document.body.removeChild(textarea);
    }

    // 복사 완료 토스트 메시지
    function showCopyToast() {
        const toast = document.getElementById('copy-toast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        } else {
            alert(lang === 'en' ? 'Copied!' : '복사되었습니다!');
        }
    }

    // 네이티브 공유 (모바일)
    window.nativeShare = function() {
        if (!currentMenu) {
            alert(lang === 'en' ? 'Please get a menu recommendation first!' : '먼저 메뉴 추천을 받아주세요!');
            return;
        }
        if (navigator.share) {
            navigator.share({
                title: lang === 'en' ? "What Should I Eat for Dinner?" : '오늘 저녁 뭐 먹지?',
                text: getShareText(),
                url: siteUrl
            }).catch(() => {});
        } else {
            copyShareLink();
        }
    };

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
