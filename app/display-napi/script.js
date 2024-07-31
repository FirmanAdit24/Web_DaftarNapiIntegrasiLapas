document.querySelectorAll('.scroll-container').forEach(container => {
    const content = container.querySelector('.scroll-content');
    const rows = content.querySelectorAll('tr').length;
    const rowHeight = content.querySelector('tr').offsetHeight;
    const totalHeight = rows * rowHeight;
    content.style.height = `${totalHeight}px`;
    content.style.animationDuration = `${totalHeight / 7}s`; // Atur kecepatan scroll di sini
    
});


// // Fungsi untuk mengganti tampilan
// function toggleScreens() {
//     const screen1 = document.getElementById('screen1');
//     const screen2 = document.getElementById('screen2');
//     if (screen1.classList.contains('hidden')) {
//         screen1.classList.remove('hidden');
//         screen2.classList.add('hidden');
//     } else {
//         screen1.classList.add('hidden');
//         screen2.classList.remove('hidden');
//     }
// }

// // Interval waktu untuk mengganti tampilan (misalnya setiap 10 detik)
// setInterval(toggleScreens, 10000);


// Function to update clock every second
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('tanggal').textContent = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);


  function playDisplay(total) {
    // Function to show screen1
    function showScreen1() {
        document.getElementById('screen1').classList.remove('hidden');
        document.getElementById('screen2').classList.add('hidden');
        startScrolling();
    }

    // Function to show screen2
    function showScreen2() {
        document.getElementById('screen1').classList.add('hidden');
        document.getElementById('screen2').classList.remove('hidden');
        setTimeout(showScreen1, 30000); // Show screen2 for 30 seconds
    }

    // Function to start scrolling tables
    function startScrolling() {
        let scrollContainers = document.querySelectorAll('.scroll-container');
        let maxScrollDuration = 0;

        scrollContainers.forEach(container => {
            const content = container.querySelector('.scroll-content');
            const rows = content.querySelectorAll('tr').length;
            const rowHeight = content.querySelector('tr').offsetHeight;
            const totalHeight = rows * rowHeight;
            content.style.height = `${totalHeight}px`;
            console.log(total)
            console.log(rowHeight)
            const scrollDuration = totalHeight / 7; // Adjust the scroll speed here
            content.style.animationDuration = `${scrollDuration}s`;

            // Track the maximum scroll duration
            if (scrollDuration > maxScrollDuration) {
                maxScrollDuration = scrollDuration;
            }

            // Apply scrolling animation
            content.style.animation = `scrolling ${scrollDuration}s linear infinite`;
        });

        // Set a timeout to show screen2 after the longest scroll duration
        setTimeout(showScreen2, maxScrollDuration * 1000);
    }

    // Keyframes for scrolling animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes scrolling {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100%); }
        }
    `;
    document.head.appendChild(style);

    // Initialize by showing screen1
    showScreen1();
};