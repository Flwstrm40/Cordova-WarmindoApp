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

// Fungsi untuk mengefetch total warung
async function getTotalWarung() {
    try {
      const response = await fetch('https://cordova-warmindo-api.vercel.app/total_warung');
      const data = await response.json();
      const jumlahWarungElement = document.getElementById('jumlah-warung');
      jumlahWarungElement.textContent = data.total_warung;
    } catch (error) {
      console.error('Error fetching total warung:', error.message);
      // Jika terjadi kesalahan, tampilkan pesan kesalahan
      const jumlahWarungElement = document.getElementById('jumlah-warung');
      jumlahWarungElement.textContent = 'Error fetching data';
    }
  }
  
  // Fungsi untuk mengefetch total transaksi
  async function getTotalTransaksi() {
    try {
      const response = await fetch('https://cordova-warmindo-api.vercel.app/total_transaksi');
      const data = await response.json();
      const jumlahTransaksiElement = document.getElementById('jumlah-transaksi');
      jumlahTransaksiElement.textContent = data.total_transaksi;
    } catch (error) {
      console.error('Error fetching total transaksi:', error.message);
      // Jika terjadi kesalahan, tampilkan pesan kesalahan
      const jumlahTransaksiElement = document.getElementById('jumlah-transaksi');
      jumlahTransaksiElement.textContent = 'Error fetching data';
    }
  }
  
  // Panggil fungsi ini saat halaman dimuat
  document.addEventListener('DOMContentLoaded', () => {
    // Fetch total warung dan total transaksi
    getTotalWarung();
    getTotalTransaksi();
  });

