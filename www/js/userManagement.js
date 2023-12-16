// Fungsi untuk mendapatkan data pengguna dari API
function fetchData() {
    fetch('https://cordova-warmindo-api.vercel.app/user')
      .then(response => response.json())
      .then(userData => {
        userDataResponse = userData;
        // Mengambil elemen tbody berdasarkan id
        const userDataBody = document.getElementById('userDataBody');
  
        // Membersihkan data yang sudah ada
        userDataBody.innerHTML = '';
  
        // Mengambil data role dari API
        fetch('https://cordova-warmindo-api.vercel.app/role')
          .then(response => response.json())
          .then(roleData => {
            // Membuat objek untuk memetakan ID role ke nama role
            const roleMap = {};
            roleData.user.forEach(role => {
              roleMap[role.id_role] = role.role;
            });
  
            // Menambahkan baris data baru berdasarkan data pengguna
            userData.user
            .sort((a, b) => a.id_pengguna.localeCompare(b.id_pengguna))
            .forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">${user.id_pengguna}</td>
                <td class="px-6 py-4 whitespace-nowrap">${user.username}</td>
                <td class="px-6 py-4 whitespace-nowrap">${user.nama_pengguna}</td>
                <td class="px-6 py-4 whitespace-nowrap">${roleMap[user.id_role]}</td>
                <td class="px-6 py-4 whitespace-nowrap">${user.status}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button class="text-blue-600 hover:text-blue-900 mr-2" onclick="editUser('${user._id}')">
                    <ion-icon name="create-outline"></ion-icon>
                    </button>
                    <button class="text-red-600 hover:text-red-900" onclick="deleteUser('${user._id}', '${user.username}')">
                    <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </td>
                `;
                userDataBody.appendChild(row);
            });
          })
          .catch(error => {
            console.error('Error fetching role data:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
}

// Declare userData variable
let userDataResponse;

// Fungsi untuk menghandle submit form
document.getElementById('inputForm').addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Mengambil nilai dari setiap input
  const idpengguna = document.getElementById('idpengguna').value;
  const username = document.getElementById('username').value;
  const namapengguna = document.getElementById('namapengguna').value;
  const idrole = document.getElementById('idrole').value;
  const status = document.getElementById('status').value;

  // Validasi: Pastikan semua kolom terisi
  if (!idpengguna || !username || !namapengguna || !idrole || !status) {
      alert("Mohon isi semua kolom");
      return; // Hentikan fungsi jika ada yang kosong
  }

  // Validasi: Cek apakah ID pengguna atau username sudah ada
  const existingUserId = userDataResponse.user.find(user => user.id_pengguna === idpengguna);
  if (existingUserId) {
      alert("ID Pengguna sudah ada. Mohon gunakan yang lain.");
      return;
  }
  const existingUserUname = userDataResponse.user.find(user => user.username === username);
  if (existingUserUname) {
      alert("Username sudah terpakai. Mohon gunakan yang lain.");
      return;
  }

  // Menyusun data pengguna untuk dikirim ke API
  const userData = {
      id_pengguna: idpengguna,
      username: username,
      nama_pengguna: namapengguna,
      id_role: idrole,
      status: status
  };

  // Mengirim permintaan POST ke API
  fetch('https://cordova-warmindo-api.vercel.app/user', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
      // Tampilkan notifikasi jika berhasil
      alert('Data berhasil ditambahkan');
      // Handle respons dari API jika diperlukan
      console.log('Data berhasil ditambahkan:', data);
      // Reset form setelah berhasil
      document.getElementById('inputForm').reset();

      location.reload();
  })
  .catch(error => {
      // Handle error jika permintaan gagal
      console.error('Error adding user data:', error);
      // Tampilkan notifikasi jika gagal
      alert('Gagal menambahkan data');
  });
});

  
// Function to fetch user data by ID
async function fetchUserById(userId) {
    try {
      const response = await fetch(`https://cordova-warmindo-api.vercel.app/user/${userId}`);
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data by ID:', error);
      throw error;
    }
  }
  
  // Function to populate the form with user data
  async function populateForm(userId) {
    try {
      const userData = await fetchUserById(userId);
  
      // Populate the form fields
      document.getElementById('idpengguna').value = userData.id_pengguna;
      document.getElementById('username').value = userData.username;
      document.getElementById('namapengguna').value = userData.nama_pengguna;
      document.getElementById('idrole').value = userData.id_role;
      document.getElementById('status').value = userData.status;
    } catch (error) {
      console.error('Error populating form:', error);
    }
  }
  

  async function editUser(userId) {
    console.log("Edit user", userId);
    // Mengarahkan ke halaman edituser.html dan menyimpan ID pengguna yang akan diedit di localStorage
    localStorage.setItem('editUserId', userId);
    window.location.href = '../edituser.html';
  }
  
  
// Function to delete a user by ID
function deleteUser(userId, username) {
    // Confirm with the user before proceeding with the deletion
    const confirmDelete = confirm(`Apakah anda yakin ingin menghapus user ${username}?`);
    
    if (!confirmDelete) {
        return; // User canceled the deletion
    }

    // Send a DELETE request to the API
    fetch(`https://cordova-warmindo-api.vercel.app/user/${userId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            alert(`User ${username} berhasil dihapus`);
            // Handle successful deletion
            console.log(`User with ID ${userId} deleted successfully.`);
            // You may want to update the UI or perform other actions as needed.
            // Reload the page
            location.reload();
        } else {
            alert(`User ${username} gagal dihapus`);
            // Handle errors during deletion
            console.error(`Error deleting user with ID ${userId}.`);
        }
    })
    .catch(error => {
        console.error('Error deleting user:', error);
    });
}

// Memanggil fungsi fetchData saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchData);


// Fungsi untuk logout
function logout() {
  // Anda dapat menambahkan logika logout di sini, seperti membersihkan token atau menyimpan status logout ke server
  // Setelah logout, arahkan kembali ke halaman index.js atau halaman login lainnya
  window.location.href = '../index.html'; // Gantilah 'index.js' dengan halaman tujuan logout Anda
}


