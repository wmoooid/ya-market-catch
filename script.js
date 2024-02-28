window.addEventListener('load', () => {
    try {
        if (window.yandex) {
            let count = 0;
            let interval = setInterval(findWithControl, 1000);

            function findWithControl() {
                ++count;
                const result = findAndHide();

                if (count >= 20) {
                    clearInterval(interval);
                    console.warn('Маркет не найден');
                }

                if (result) {
                    console.info('Маркет скрыт');
                    clearInterval(interval);
                }
            }

            function findAndHide() {
                const marketImage = document.querySelector('img[src*="data:image/svg+xml;base64,PHN2Z');
                const marketLink = document.querySelector('a[href*="https://sovetnik.market.yandex.ru/');

                const foundItem = marketImage || marketLink;

                if (foundItem) {
                    hideParent(foundItem);
                    return true;
                }

                return false;
            }

            function hideParent(node) {
                if (!node.parentNode) return;
                if (node.parentNode.tagName === 'BODY' && node.id) {
                    node.style.display = 'none';
                    return;
                }
                hideParent(node.parentNode);
            }
        }
    } catch (error) {
        console.error('Ошибка в ловце маркета', error);
    }
});
