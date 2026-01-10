const urlInput = document.getElementById('url-input');
const goBtn = document.getElementById('go-btn');
const browserFrame = document.getElementById('browser-frame');

function navigate() {
    let url = urlInput.value.trim();
    if (url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        browserFrame.src = url;
    }
}

goBtn.addEventListener('click', navigate);

urlInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        navigate();
    }
});
