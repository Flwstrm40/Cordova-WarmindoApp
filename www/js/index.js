const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const apiURL = 'https://cordova-warmindo-api.vercel.app';

    try {
        const response = await fetch(`${apiURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Login berhasil
            console.log('Login berhasil:', data.user);

            // Redirect ke halaman dashboard atau lakukan operasi lainnya
            window.location.href = '../dashboardE1.html';
        } else {
            // Login gagal, tampilkan pesan kesalahan
            console.error('Login gagal:', data.message);

            // Tampilkan pesan kesalahan kepada pengguna
            alert('Username atau password salah. Silakan coba lagi.');
        }
    } catch (error) {
        console.error('Terjadi kesalahan:', error.message);

        // Tampilkan pesan kesalahan umum kepada pengguna
        alert('Terjadi kesalahan. Silakan coba lagi.');
    }
});
