document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ko', // 한국어 설정
        events: "{% url 'notes:get_events' %}", // 이벤트 데이터를 가져올 Django URL
        eventClick: function(info) { // 이벤트 클릭 시 동작
            if (info.event.url) {
                window.location.href = info.event.url; // 상세 페이지로 이동
            }
        }
    });

    calendar.render();
});
