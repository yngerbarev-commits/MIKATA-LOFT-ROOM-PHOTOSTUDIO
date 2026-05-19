document.addEventListener('DOMContentLoaded', () => {
    const daysGrid = document.getElementById('daysGrid');
    const timeSlots = document.getElementById('timeSlots');
    const timeSection = document.getElementById('timeSection');
    const actionBtn = document.getElementById('actionBtn');
    
    let selectedDate = null;
    let selectedTime = null;
    let currentStep = 1;

    // Զբաղված ժամերի տվյալներ (օրինակ)
    const bookedTimes = {
        "14": ["10:00", "14:00"],
        "15": ["12:00", "13:00", "18:00"],
        "18": ["11:00", "15:00"],
        "22": ["10:00", "11:00", "12:00"]
    };

    const availableDays = [14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26];
    const workingHours = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

    function initCalendar() {
        daysGrid.innerHTML = '';
        [30, 31].forEach(d => {
            const el = document.createElement('div');
            el.className = 'day mute';
            el.innerText = d;
            daysGrid.appendChild(el);
        });

        for (let i = 1; i <= 30; i++) {
            const el = document.createElement('div');
            el.className = 'day' + (i === 12 ? ' today' : '');
            el.innerText = i;
            
            if (availableDays.includes(i)) {
                el.classList.add('available');
                el.onclick = () => {
                    document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
                    el.classList.add('selected');
                    selectedDate = i;
                    showTimeSlots(i);
                };
            }
            daysGrid.appendChild(el);
        }
    }

    function showTimeSlots(day) {
        timeSection.style.display = 'block';
        timeSlots.innerHTML = '';
        selectedTime = null;
        actionBtn.disabled = true;

        const takenForThisDay = bookedTimes[day.toString()] || [];

        workingHours.forEach(hour => {
            const slot = document.createElement('div');
            slot.className = 'slot';
            slot.innerText = hour;

            if (takenForThisDay.includes(hour)) {
                slot.classList.add('taken');
            } else {
                slot.onclick = () => {
                    document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
                    slot.classList.add('selected');
                    selectedTime = hour;
                    actionBtn.disabled = false;
                };
            }
            timeSlots.appendChild(slot);
        });
    }

    actionBtn.onclick = () => {
        if (currentStep === 1) {
            document.getElementById('step-1').classList.remove('active');
            document.getElementById('step-2').classList.add('active');
            document.querySelector('.nav-item.active').classList.remove('active');
            document.getElementById('nav-2').classList.add('active');
            document.getElementById('dot-1').classList.add('completed');
            
            document.getElementById('selectionSummary').innerHTML = 
                `<strong>Ամսաթիվ՝</strong> Ապրիլի ${selectedDate}, 2026<br><strong>Ժամ՝</strong> ${selectedTime}`;
            actionBtn.innerText = 'Ամրագրել';
            currentStep = 2;
        } else {
            const name = document.getElementById('clientName').value;
            const phone = document.getElementById('clientPhone').value;
            if (name.trim() && phone.trim()) {
                alert(`Շնորհակալություն, ${name}!\nՁեր ամրագրումը հաջողությամբ գրանցվեց:\nՕր: Ապրիլի ${selectedDate}\nԺամ: ${selectedTime}`);
                location.reload();
            } else {
                alert("Խնդրում ենք լրացնել պարտադիր դաշտերը:");
            }
        }
    };

    initCalendar();
});