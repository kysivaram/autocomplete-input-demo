document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        const form = document.getElementById('demoForm');
        const paragraphElement = document.getElementById('selectedData');
        form.addEventListener('submit', demoFormSubmit);

        function demoFormSubmit(event) {
            event.preventDefault();
            const selectedMonth = document.getElementById('monthPicker').shadowRoot.getElementById("monthInput").value;
            const selectedDay = document.getElementById('dayPicker').shadowRoot.getElementById("dayInput").value;
            paragraphElement.innerHTML = `Month: ${selectedMonth} <br /> Day: ${selectedDay}`;
        }
    }
}