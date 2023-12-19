// Fungsi untuk mendapatkan data role dari API
async function fetchRoleData() {
    try {
        const response = await fetch('https://cordova-warmindo-api.vercel.app/role');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const roleData = await response.json();
        return roleData.role || [];
    } catch (error) {
        console.error('Error fetching role data:', error);
        return [];
    }
}

// Fungsi untuk mendapatkan data pengguna dari API
function fetchData() {
    fetchRoleData()
        .then(roleData => {
            roleDataResponse = roleData;
            console.log('Data role:', roleDataResponse);
            // Mengambil elemen tbody berdasarkan id
            const roleDataBody = document.getElementById('roleDataBody');
            

            // Membersihkan data yang sudah ada
            roleDataBody.innerHTML = '';

            // Menambahkan baris data baru berdasarkan data role
            roleData
                .sort((a, b) => a.id_role.localeCompare(b.id_role))
                .forEach(role => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${role.id_role}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${role.role}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${role.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button class="text-blue-600 hover:text-blue-900 mr-2" onclick="editUser('${role._id}')">
                            <ion-icon name="create-outline"></ion-icon>
                        </button>
                        <button class="text-red-600 hover:text-red-900" onclick="deleteRole('${role._id}', '${role.role}')">
                            <ion-icon name="trash-outline"></ion-icon>
                        </button>
                    </td>
                    `;
                    roleDataBody.appendChild(row);
                });
        })
        .catch(error => {
            console.error('Error handling role data:', error);
        });
}

// Declare roleData variable
let roleDataResponse;

// Fungsi untuk menghandle submit form
document.getElementById('inputForm').addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Mengambil nilai dari setiap input
  const idrole = document.getElementById('idrole').value;
  const roleName = document.getElementById('role').value;
  const status = document.getElementById('status').value;

  // Validasi: Pastikan semua kolom terisi
  if (!idrole || !roleName || !status) {
      alert("Mohon isi semua kolom");
      return; // Hentikan fungsi jika ada yang kosong
  }


    console.log('Data role:', roleDataResponse);
    const existingRoleId = roleDataResponse.find(role => role.id_role=== idrole);
    if (existingRoleId) {
        alert("ID Role sudah ada. Mohon gunakan yang lain.");
        return;
    }

    const existingRoleName = roleDataResponse.find(role => role.role === roleName);
    if (existingRoleName) {
        alert("Nama Role sudah terpakai. Mohon gunakan yang lain.");
        return;
    }

  

  // Menyusun data pengguna untuk dikirim ke API
  const roleData = {
      id_role: idrole,
      role: roleName,
      status: status
  };

  // Mengirim permintaan POST ke API
  fetch('https://cordova-warmindo-api.vercel.app/role', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(roleData)
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
      console.error('Error adding role data:', error);
      // Tampilkan notifikasi jika gagal
      alert('Gagal menambahkan data');
  });
});

  
// Function to fetch role data by ID
async function fetchRoleById(roleId) {
    try {
      const response = await fetch(`https://cordova-warmindo-api.vercel.app/role/${roleId}`);
      const roleData = await response.json();
      return roleData;
    } catch (error) {
      console.error('Error fetching role data by ID:', error);
      throw error;
    }
  }
  
  // Function to populate the form with role data
  async function populateForm(roleId) {
    try {
      const roleData = await fetchRoleById(roleId);
  
      // Populate the form fields
      document.getElementById('idrole').value = roleData.id_role;
      document.getElementById('role').value = roleData.role;
      document.getElementById('status').value = roleData.status;
    } catch (error) {
      console.error('Error populating form:', error);
    }
  }
  

  async function editUser(roleId) {
    console.log("Edit role", roleId);
    // Mengarahkan ke halaman edituser.html dan menyimpan ID pengguna yang akan diedit di localStorage
    localStorage.setItem('editRoleId', roleId);
    window.location.href = '../editRole.html';
  }
  
  
// Function to delete a role by ID
function deleteRole(roleId, role) {
    // Confirm with the role before proceeding with the deletion
    const confirmDelete = confirm(`Apakah anda yakin ingin menghapus role ${role}? Note: Menghapus role ${role} akan menghapus semua user yang memiliki role ini.`);
    console.log('Deleting role', roleId);
    
    if (!confirmDelete) {
        return; // Role canceled the deletion
    }

    // Send a DELETE request to the API
    fetch(`https://cordova-warmindo-api.vercel.app/role/${roleId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            alert(`Role ${role} berhasil dihapus`);
            // Handle successful deletion
            console.log(`Role with ID ${roleId} deleted successfully.`);
            // You may want to update the UI or perform other actions as needed.
            // Reload the page
            location.reload();
        } else {
            alert(`Role ${role} gagal dihapus`);
            // Handle errors during deletion
            console.error(`Error deleting role with ID ${roleId}.`);
        }
    })
    .catch(error => {
        console.error('Error deleting role:', error);
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


