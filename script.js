
document.addEventListener('DOMContentLoaded', () => {

    // --- Animation on Scroll Logic ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // --- Secret Code and Download Logic ---
    const secretCodeInput = document.getElementById('secretCode');
    const downloadButtons = document.getElementById('downloadButtons');
    const statusText = document.getElementById('statusText');
    const correctCode = 'YAWARP374';

    secretCodeInput.addEventListener('input', () => {
        if (secretCodeInput.value.trim().toUpperCase() === correctCode) {
            statusText.textContent = 'Код верный! Теперь ты можешь скачать конфигурацию.';
            statusText.style.color = '#a7d1ff';
            downloadButtons.style.display = 'flex';
        } else {
            statusText.textContent = 'После ввода кода, ты получишь специальную WARP конфигурацию.';
            statusText.style.color = 'white';
            downloadButtons.style.display = 'none';
        }
    });

    // --- File Generation and Download ---
    // This configuration data is taken from your prompt.
    // We create a clean, standard WireGuard configuration from it.
    const wireguardConfig = `[Interface]
PrivateKey = wv6C1DcmjXooP5uxjFYcVEYq/oBEd3PdMwnMyjVsgMk=
Address = 172.16.0.2/32, 2606:4700:110:8e9a:ffbb:e93d:346e:c98/128
DNS = 176.99.11.77, 80.78.247.254, 2a00:f940:2:4:2::5d1b, 2a00:f940:2:4:2::21ed
MTU = 1280

[Peer]
PublicKey = bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = engage.cloudflareclient.com:4500
PersistentKeepalive = 25
`;

    function downloadFile(filename, content) {
        const element = document.createElement('a');
        const file = new Blob([content], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
    }

    document.getElementById('downloadWireGuard').addEventListener('click', () => {
        downloadFile('ReadyWARP-WireGuard.conf', wireguardConfig);
    });

    document.getElementById('downloadAmnezia').addEventListener('click', () => {
        downloadFile('ReadyWARP-AmneziaWG.conf', wireguardConfig);
    });

});
