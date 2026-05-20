document.addEventListener('DOMContentLoaded', function() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    if (countdownElements.length === 0) return;

    function updateTimers() {
        const now = new Date().getTime();

        countdownElements.forEach(el => {
            const targetDateStr = el.getAttribute('data-date');
            if (!targetDateStr) return;

            const targetDate = new Date(targetDateStr).getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                el.innerHTML = '<span class="expired">Подія відбулась</span>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            el.innerHTML = `
                <div class="timer-block">
                    <span class="num">${days}</span><span class="label">дн</span>
                </div>
                <div class="timer-block">
                    <span class="num">${hours.toString().padStart(2, '0')}</span><span class="label">год</span>
                </div>
                <div class="timer-block">
                    <span class="num">${minutes.toString().padStart(2, '0')}</span><span class="label">хв</span>
                </div>
                <div class="timer-block">
                    <span class="num">${seconds.toString().padStart(2, '0')}</span><span class="label">сек</span>
                </div>
            `;
        });
    }

    updateTimers();
    setInterval(updateTimers, 1000);
});