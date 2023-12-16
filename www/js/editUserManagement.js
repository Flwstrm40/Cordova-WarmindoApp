// Fungsi untuk logout
function logout() {
    // Anda dapat menambahkan logika logout di sini, seperti membersihkan token atau menyimpan status logout ke server
    // Setelah logout, arahkan kembali ke halaman index.js atau halaman login lainnya
    window.location.href = '../index.html'; // Gantilah 'index.js' dengan halaman tujuan logout Anda
}

// Function to fetch user data by ID from the API
async function fetchUserByIdFromAPI(userId) {
    try {
        const response = await fetch(`https://cordova-warmindo-api.vercel.app/user/${userId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const userData = await response.json();
        return userData.user; 
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Function to check if the edited username already exists
async function isUsernameExist(username, userId) {
    try {
        const response = await fetch('https://cordova-warmindo-api.vercel.app/user');
        const userData = await response.json();
        
        // Check if the username already exists (excluding the current user being edited)
        const existingUser = userData.user.find(user => user.username === username && user._id !== userId);
        return !!existingUser; // Returns true if the username exists, false otherwise
    } catch (error) {
        console.error('Error checking if username exists:', error);
        throw error;
    }
}

// Function to populate the form with user data
async function populateForm() {
    try {
        // Mengambil ID pengguna yang akan diedit dari localStorage
        const userId = localStorage.getItem('editUserId');
        if (!userId) {
            console.error('User ID not found.');
            return;
        }
        console.log('Editing user with ID', userId);

        const userData = await fetchUserByIdFromAPI(userId);
        console.log("user data", userData)

        // Populate the form fields
        document.getElementById('idpengguna').value = userData.id_pengguna;
        document.getElementById('username').value = userData.username;
        document.getElementById('namapengguna').value = userData.nama_pengguna;
        document.getElementById('idrole').value = userData.id_role;
        document.getElementById('status').value = userData.status;

        // Add event listener to the form for submit action
        document.getElementById('inputForm').addEventListener('submit', async function (event) {
            event.preventDefault();

             // Extract form data
             const newUsername = document.getElementById('username').value;

             // Check if the new username already exists
             const isExist = await isUsernameExist(newUsername, userId);
 
             if (isExist) {
                 alert('Username sudah terpakai. Mohon gunakan yang lain.');
                 return; // Stop the process if the username already exists
             }

            // Extract form data
            const formData = {
                id_pengguna: document.getElementById('idpengguna').value,
                username: document.getElementById('username').value,
                nama_pengguna: document.getElementById('namapengguna').value,
                id_role: document.getElementById('idrole').value,
                status: document.getElementById('status').value,
            };

            // Call API to update user data
            try {
                const response = await fetch(`https://cordova-warmindo-api.vercel.app/user/${userId}`, {
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
                window.location.href = 'userManagement.html';
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        });
    } catch (error) {
        console.error('Error populating form:', error);
    }
}

document.addEventListener('DOMContentLoaded', populateForm);
