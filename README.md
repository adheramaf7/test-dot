## Petunjuk Instalasi

 1. Clone aplikasi pada repository ini.
 2. Jalankan perintah `composer install` untuk mengunduh dependency yang digunakan pada aplikasi.
 3. Duplikat file **.env.example** kemudian rename menjadi **.env** . Bisa juga dengan menjalankan perintah `cp .env.example .env`
 4. Jalankan perintah `php artisan key:generate` untuk membuat **APP_KEY** baru.
 5. Buat database dengan nama bebas, kemudian sesuaikan setting koneksi database yang terdapat pada file **.env** pada entry dengan awalan **DB_**
 6. Jalankan perintah `php artisan migrate --seed` untuk membuat table yang dibutuhkan oleh aplikasi dan mengisikan data awalan yang digunakan aplikasi.
 7. Jalankan perintah `npm install` untuk mengunduh frontend dependency yang digunakan.
 8. Jalankan perintah `npm run build` untuk proses compile seluruh code frontend.
 9. Jalankan `php artisan serve` untuk menjalankan server aplikasi.   
 10. Buka alamat http://localhost:8000 pada browser
 11. Login dengan menggunakan email: **test@example.com** dan password: **test**

**Developed by:** 
Adhe Rama Febrianto (https://adhe-portfolio.vercel.app).
