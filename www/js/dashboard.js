function toggleMenu() {
    const menuDropdown = document.getElementById('menuDropdown');
    menuDropdown.style.display = (menuDropdown.style.display === 'block') ? 'none' : 'block';
}

function navigateTo(destination) {
    // Implementasi navigasi ke halaman Warung atau Karyawan
    console.log(`Navigasi ke ${destination}`);
}

// Fungsi untuk logout
function logout() {
    // Anda dapat menambahkan logika logout di sini, seperti membersihkan token atau menyimpan status logout ke server
    // Setelah logout, arahkan kembali ke halaman index.js atau halaman login lainnya
    window.location.href = '../index.html'; // Gantilah 'index.js' dengan halaman tujuan logout Anda
}
function readWarung() {
    window.location.href = '../warungList.html'; 
}
function readKaryawan() {
    window.location.href = '../karyawanList.html';
}

