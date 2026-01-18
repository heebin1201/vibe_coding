document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');

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
