document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

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
        lottoNumbersDiv.innerHTML = '';
        const numbers = generateLottoNumbers();
        numbers.forEach(number => {
            const span = document.createElement('span');
            span.className = 'lotto-number';
            span.textContent = number;
            lottoNumbersDiv.appendChild(span);
        });
    });

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }
});
