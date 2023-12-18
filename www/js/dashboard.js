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

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return null;
    }
  }

  async function populateWarungCards() {
    try {
      const warungData = await fetchData('https://cordova-warmindo-api.vercel.app/warung');
      const warungContainer = document.getElementById('panel-1');
  
      if (warungData && Array.isArray(warungData.warung) && warungContainer) {
        warungData.warung.forEach(warung => {
          // Create elements for warung details and append them to the card
          const warungCard = document.createElement('div');
          warungCard.classList.add('flex', 'items-center', 'max-w-full', 'bg-white', 'p-6', 'rounded-lg', 'shadow-md', 'mb-5', 'border', 'border-solid', 'border-gray-300');
  
          // Create and append other elements for warung details (e.g., image, name, ID)
          const warungLogo = document.createElement('img');
          warungLogo.src = warung.logo;
          warungLogo.alt = 'Warung Logo';
          warungLogo.classList.add('w-16', 'h-16', 'rounded-full', 'mr-6');
          warungCard.appendChild(warungLogo);
  
          const warungDetails = document.createElement('div');
          // Populate warung details
          warungDetails.innerHTML = `
            <h2 class="text-xl font-semibold text-gray-800">${warung.nama_warung}</h2>
            <p class="text-gray-600">ID: <span class="font-bold">${warung.id_warung}</span></p>
            <p class="text-gray-600">Lokasi: <span class="font-bold">${warung.lokasi}</span></p>
            <!-- Other Warung Details -->
            <!-- Add more details as needed -->
          `;
          warungCard.appendChild(warungDetails);
  
          // Append the warung card to the warung container
          warungContainer.appendChild(warungCard);
        });
      } else {
        console.error('Invalid or empty warung data:', warungData);
      }
    } catch (error) {
      console.error('Error fetching warung data:', error.message);
    }
  }
  
  // Function to format number as rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

async function populateTransaksiTable() {
  try {
    const transaksiData = await fetchData('https://cordova-warmindo-api.vercel.app/transaksi');
    const transaksiTableBody = document.getElementById('transaksiTableBody');

    // Clear previous data
    transaksiTableBody.innerHTML = '';

    if (transaksiData && transaksiData.transaksi && transaksiData.transaksi.length > 0 && transaksiTableBody) {

      // Extract only the date part from the timestamp
      // Iterate over each transaksi and create table rows
      // sort by id_transaksi
      transaksiData.transaksi
      .sort((a, b) => a.id_transaksi.localeCompare(b.id_transaksi))
      .forEach((transaksi) => {
        const tanggalPart = transaksi.tanggal.split('T')[0];
        const formattedTotal = formatRupiah(transaksi.total);
        const formattedDiskon = formatRupiah(transaksi.total_diskon);
        const tableRow = document.createElement('tr');
        // Populate table cells with transaksi details
        tableRow.innerHTML = `
          <td class="px-6 py-4 whitespace-nowrap">${transaksi.id_transaksi || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${tanggalPart || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${transaksi.waktu || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${transaksi.shift || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${transaksi.id_pengguna || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${transaksi.id_pelanggan || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${transaksi.status || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${transaksi.kode_meja || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${transaksi.nama_pelanggan || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${formattedTotal || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${transaksi.metode_pembayaran || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${formattedDiskon || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">${transaksi.id_promosi || '-'}</td>
        `;
        // Append the table row to the table body
        transaksiTableBody.appendChild(tableRow);
      });
    } else {
      console.error('Invalid or empty transaksi data:', transaksiData);
    }
  } catch (error) {
    console.error('Error fetching transaksi data:', error.message);
  }
}

  
  // Panggil fungsi ini saat halaman dimuat
  document.addEventListener('DOMContentLoaded', () => {
    // Fetch total warung dan total transaksi serta data warung dan transaski
    getTotalWarung();
    getTotalTransaksi();
    populateWarungCards();
    populateTransaksiTable();
  });

