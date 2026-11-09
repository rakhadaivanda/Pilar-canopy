# Deploy & Konfigurasi Server (VPS)

Panduan operasional server produksi `https://canopy.rezekibarokahjaya.net`.

## Arsitektur Singkat

| Bagian | Lokasi / Proses |
| --- | --- |
| Source code di VPS | `/var/www/dashboard-canopy` |
| Hasil build frontend | `/var/www/dashboard-canopy/dist` |
| Backend Express | `server/index.js`, dijalankan PM2 dengan nama `canopy-auth` |
| Port backend | `3001` |
| Web server | Nginx |
| Sitemap | `public/sitemap.xml` → disalin ke `dist/sitemap.xml` saat build |
| Robots | `public/robots.txt` → disalin ke `dist/robots.txt` saat build |

Nginx menyajikan file statis dari folder `dist`, lalu meneruskan `/api/` ke backend Express di `127.0.0.1:3001`.

## Prasyarat Server

- Git, Node.js 18+ (disarankan Node.js 20 LTS), npm
- PM2
- Nginx
- Akses SSH ke VPS
- File service account Google atau environment variable `GOOGLE_SERVICE_ACCOUNT_JSON`
- File `.env` produksi sudah berisi `SESSION_SECRET`, `SHEET_ID`, dan `SHEET_RANGE`

Jangan commit file `.env` atau file service account ke GitHub.

## Alur Deploy Otomatis

Push ke branch `main` menjalankan `.github/workflows/deploy.yml`. Workflow tersebut:

1. Masuk ke `/var/www/dashboard-canopy`
2. Menjalankan `git pull origin main`
3. Install dependency backend dan frontend
4. Menjalankan `npm run build`
5. Memverifikasi `dist/sitemap.xml` dan `dist/robots.txt` ada dan sitemap berisi `<urlset`
6. Restart atau start PM2 `canopy-auth`
7. Mengatur permission folder untuk Nginx

Workflow **tidak** mengubah konfigurasi Nginx. Konfigurasi Nginx dilakukan manual sekali saat setup atau saat ada perubahan routing.

## Checklist Deploy Manual

### 1. Masuk ke VPS dan folder project

```bash
ssh user@vps
cd /var/www/dashboard-canopy
```

### 2. Ambil kode terbaru

```bash
git pull origin main
```

### 3. Install dependency dan build

```bash
npm install
npm run build
```

### 4. Pastikan file SEO ikut ter-build

```bash
ls -l dist/sitemap.xml dist/robots.txt
head -n 3 dist/sitemap.xml
```

Output `head` harus berawalan:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
```

Jika `dist/sitemap.xml` tidak ada, jangan lanjut deploy. Periksa log build Vite.

### 5. Restart backend

```bash
pm2 restart canopy-auth --update-env
pm2 status
```

Jika proses belum ada:

```bash
pm2 start server/index.js --name canopy-auth --update-env
```

### 6. Atur permission

```bash
sudo chown -R www-data:www-data /var/www/dashboard-canopy
sudo chmod -R 755 /var/www/dashboard-canopy
```

## Konfigurasi Nginx

### 1. Cari file server block yang dipakai

```bash
ls /etc/nginx/sites-enabled/
grep -R "server_name canopy.rezekibarokahjaya.net" /etc/nginx/sites-available/
```

### 2. Edit file server block

```bash
sudo nano /etc/nginx/sites-available/NAMA-FILE
```

Jangan membuat server block baru jika domain sudah punya konfigurasi HTTPS. Tambahkan atau sesuaikan bagian berikut di dalam server block yang sudah ada.

```nginx
root /var/www/dashboard-canopy/dist;
index index.html;

location = /sitemap.xml {
    types { application/xml xml; }
    default_type application/xml;
    try_files $uri =404;
    add_header Cache-Control "public, max-age=3600";
}

location = /robots.txt {
    default_type text/plain;
    try_files $uri =404;
    add_header Cache-Control "public, max-age=3600";
}

location /api/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

Snippet yang sama tersedia di repository:

```bash
cat deploy/nginx-canopy.conf
```

### 3. Test dan reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Jika `nginx -t` gagal, jangan reload. Perbaiki konfigurasi terlebih dahulu.

## Verifikasi Setelah Deploy

### Sitemap harus XML, bukan HTML

```bash
curl -I https://canopy.rezekibarokahjaya.net/sitemap.xml
curl -s https://canopy.rezekibarokahjaya.net/sitemap.xml | head -n 3
```

Yang diharapkan:

```text
HTTP/1.1 200 OK
Content-Type: application/xml; charset=utf-8
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
```

`text/xml` juga diterima Google, tetapi konfigurasi project ini memakai `application/xml`.

### Robots

```bash
curl -I https://canopy.rezekibarokahjaya.net/robots.txt
curl -s https://canopy.rezekibarokahjaya.net/robots.txt
```

Harus menghasilkan `Content-Type: text/plain` dan berisi baris `Sitemap:`.

### Backend lokal

```bash
curl -I http://127.0.0.1:3001/sitemap.xml
curl -s http://127.0.0.1:3001/sitemap.xml | head -n 3
```

Jika ini benar tetapi domain publik masih HTML, masalahnya ada di Nginx.

### SPA fallback

```bash
curl -I https://canopy.rezekibarokahjaya.net/beberapa-route
```

Route halaman React harus `200` dengan `text/html`. Request file yang tidak ada, misalnya `/file-tidak-ada.js`, sebaiknya `404`, bukan `index.html`.

## Troubleshooting

### `/sitemap.xml` masih mengembalikan HTML

Periksa berurutan:

```bash
ls -l /var/www/dashboard-canopy/dist/sitemap.xml
grep -R "root " /etc/nginx/sites-available/
grep -R "try_files" /etc/nginx/sites-available/
sudo nginx -T | grep -n "server_name\|root \|sitemap"
```

Penyebab umum:

- `dist/sitemap.xml` tidak ada karena build gagal
- `root` Nginx tidak mengarah ke `/var/www/dashboard-canopy/dist`
- Server block lain menangkap domain yang sama
- Konfigurasi Nginx belum direload

### Sitemap 404

- Pastikan file ada di `dist/sitemap.xml`
- Pastikan permission file dan folder bisa dibaca `www-data`
- Pastikan `try_files $uri =404;` untuk lokasi sitemap tidak salah path

### MIME type salah

Pastikan blok `location = /sitemap.xml` memakai `default_type application/xml;` dan blok `types` berisi `application/xml xml;`. Setelah edit, jalankan `sudo nginx -t && sudo systemctl reload nginx`.

### Backend error setelah deploy

```bash
pm2 logs canopy-auth
pm2 restart canopy-auth --update-env
```

Periksa juga `.env` dan akses service account Google.

### Google Search Console masih error

Setelah server benar:

1. Buka Google Search Console.
2. Gunakan URL Inspection pada `https://canopy.rezekibarokahjaya.net/sitemap.xml`.
3. Klik **Request indexing** atau submit ulang sitemap.
4. Tunggu Google melakukan crawl ulang.

Ambil respons `curl` terbaru sebagai bukti bahwa server sudah mengirim XML, bukan HTML.

## Perintah Cepat

```bash
cd /var/www/dashboard-canopy
git pull origin main
npm install
npm run build
test -f dist/sitemap.xml && head -n 2 dist/sitemap.xml
pm2 restart canopy-auth --update-env
sudo nginx -t
sudo systemctl reload nginx
curl -I https://canopy.rezekibarokahjaya.net/sitemap.xml
```
