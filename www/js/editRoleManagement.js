// Fungsi untuk logout
function logout() {
    // Anda dapat menambahkan logika logout di sini, seperti membersihkan token atau menyimpan status logout ke server
    // Setelah logout, arahkan kembali ke halaman index.js atau halaman login lainnya
    window.location.href = '../index.html'; // Gantilah 'index.js' dengan halaman tujuan logout Anda
}

// Function to fetch user data by ID from the API
async function fetchRoleByIdFromAPI(roleId) {
    console.log("fetchRoleByIdFromAPI", roleId);
    try {
        const response = await fetch(`https://cordova-warmindo-api.vercel.app/role/${roleId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const roleData = await response.json();
        console.log("role data", roleData)
        return roleData.role; // Assuming the API response has a 'user' property
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Function to populate the form with user data
async function populateForm() {
    try {
        // Mengambil ID pengguna yang akan diedit dari localStorage
        const roleId = localStorage.getItem('editRoleId');
        console.log("populateForm", roleId);
        if (!roleId) {
            console.error('User ID not found.');
            return;
        }
        console.log('Editing user with ID', roleId);

        const roleData = await fetchRoleByIdFromAPI(roleId);
        console.log("role data", roleData)
        console.log("idrole", roleData.id_role)
        console.log("role", roleData.role)

        // Populate the form fields
        document.getElementById('idrole').value = roleData.id_role;
        document.getElementById('role').value = roleData.role;
        document.getElementById('status').value = roleData.status;

        // Add event listener to the form for submit action
        document.getElementById('inputForm').addEventListener('submit', async function (event) {
            event.preventDefault();

            // Extract form data
            const formData = {
                id_role: document.getElementById('idrole').value,
                role: document.getElementById('role').value,
                status: document.getElementById('status').value,
            };

            // Call API to update user data
            try {
                const response = await fetch(`https://cordova-warmindo-api.vercel.app/role/${roleId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error(`Failed to update user data. Status: ${response.status}`);
                }

                // Display alert and redirect on success
                alert('Data berhasil diperbarui.');
                window.location.href = 'roleManagement.html';
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        });
    } catch (error) {
        console.error('Error populating form:', error);
    }
}

document.addEventListener('DOMContentLoaded', populateForm);
