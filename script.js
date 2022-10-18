window.addEventListener('DOMContentLoaded', function() {

    const deadline = '2023-06-11';

    function getTimeRemaining(endtime) {							// Определение разницы между дедлайном и текущей датой
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {										// Обработка отриц. значений
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor( (t/(1000*60*60*24)) ),
            hours = Math.floor( (t/(1000*60*60) % 24) ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            seconds = Math.floor( (t/1000) % 60 );
        }
        return {t, days, hours, minutes, seconds};
    }

    function getZero(num){									// Ставим нули перед цифрой
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {							// Установка таймера на страницу(для работы со всеми таймерами на страницах, а не с одним)
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),

            timeInterval = setInterval(updateClock, 1000);					// обновление каждую сек

        updateClock();										// Вызываем, чтобы не было миганий с изнач. датой(из-за задержки)

        function updateClock() {								// Обновление таймера каждую сек. 
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);							// Помещение рассчитанных значений на стр.
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            // Остановка таймера
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
});