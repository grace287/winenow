// document.addEventListener('DOMContentLoaded', () => {
//     const calendarCells = document.querySelectorAll('.calendar td:not(.noday)');
//
//     calendarCells.forEach(cell => {
//         cell.addEventListener('click', (e) => {
//             e.preventDefault();
//             const day = cell.textContent;
//             const notesForDay = noteCounts[day] || [];
//
//             let notesHtml = '<h3>시음 노트 목록</h3><ul>';
//             notesForDay.forEach(note => {
//                 notesHtml += `<li><a href="{% url 'notes:note_detail' 0 %}".replace('0', note.id)>${note.wine_name}</a>(${note.tasting_date})</li>`;
//             });
//             notesHtml += '</ul>';
//
//             const noteDetails = document.getElementById('note-details');
//             noteDetails.innerHTML = notesHtml;
//             noteDetails.classList.remove('hidden');
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const calendarCells = document.querySelectorAll('.calendar td:not(.noday)');
    const noteDetails = document.getElementById('note-details');

    calendarCells.forEach(cell => {
        const day = parseInt(cell.textContent); // Parse day as integer
        if (noteCounts[day]) {
            const noteCount = noteCounts[day].length;
            cell.innerHTML = `${day}<span class="note-count">(${noteCount})</span>`;
            cell.addEventListener('click', () => {
                const notesForDay = noteCounts[day];
                let notesHtml = '<h3>시음 노트 목록</h3><ul>';
                notesForDay.forEach(note => {
                    notesHtml += `<li><a href="{% url 'notes:note_detail' 0 %}".replace('0', note.id) >${note.wine_name}</a></li>`;
                });
                notesHtml += '</ul>';
                noteDetails.innerHTML = notesHtml;
                noteDetails.classList.remove('hidden');
            });
        }
    });
});