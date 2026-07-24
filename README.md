# MAPID Academy WebGIS Batch 3

Repositori ini terdiri dari dua bagian:

| Folder | Isi | Target deployment |
| --- | --- | --- |
| [`spatial-engine/`](spatial-engine/) | REST API Flask untuk komputasi spasial (shapely + pyproj) | PythonAnywhere |
| [`webapp-maplibre/`](webapp-maplibre/) | Peta web statis (Vite + MapLibre GL) | Render |

Dokumen ini adalah panduan *deployment*. Untuk dokumentasi masing-masing *toolbox* dan
*endpoint*-nya, lihat [`spatial-engine/README.md`](spatial-engine/README.md).

---

## Prasyarat

1. Repositori sudah ter-*push* ke GitHub.
2. Akun [PythonAnywhere](https://www.pythonanywhere.com) — *free tier* sudah cukup. Batasan
   *outbound* (proxy *whitelist*) tidak berpengaruh karena API ini tidak memanggil layanan luar.
3. Akun [Render](https://render.com) — *free static site* sudah cukup.

---

## Bagian A — Persiapan sebelum deploy

Tiga hal berikut **wajib** dibereskan lebih dulu, karena kalau tidak, aplikasi akan ter-*deploy*
tapi tidak berfungsi.

### A.1. URL API masih *hardcoded* ke localhost

Saat ini alamat API ditulis langsung di dua berkas:

- [`webapp-maplibre/src/engine/areaTool.js:12`](webapp-maplibre/src/engine/areaTool.js#L12)
- [`webapp-maplibre/src/engine/bufferTool.js:12`](webapp-maplibre/src/engine/bufferTool.js#L12)

```js
const response = await fetch("http://127.0.0.1:5000/spatial_computation/area", { ... })
```

Setelah *deploy*, `127.0.0.1` menunjuk ke komputer pengunjung — bukan ke server. Selain itu,
halaman Render disajikan lewat HTTPS, sehingga *browser* akan **memblokir** panggilan ke alamat
`http://` biasa (*mixed content*).

Solusi yang disarankan: buat `webapp-maplibre/src/config.js`

```js
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:5000";
```

lalu ganti kedua `fetch` di atas menjadi *template literal*:

```js
import { API_BASE_URL } from "../config";

const response = await fetch(`${API_BASE_URL}/spatial_computation/area`, { ... })
```

Dengan pola ini, `npm run dev` tetap jalan ke Flask lokal tanpa berkas `.env`, sedangkan Render
memakai nilai dari *environment variable* (lihat Bagian C).

### A.2. Halaman kedua tidak ikut ter-*build*

Secara *default* Vite hanya membangun `index.html`, sehingga
[`webapp-maplibre/asia/indonesia.html`](webapp-maplibre/asia/indonesia.html) tidak ikut masuk ke
`dist/`. Daftarkan kedua *entry point* di `webapp-maplibre/vite.config.js`:

```js
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("index.html", import.meta.url)),
        indonesia: fileURLToPath(new URL("asia/indonesia.html", import.meta.url)),
      },
    },
  },
});
```

> Catatan: `__dirname` tidak tersedia di berkas konfigurasi ber-*format* ESM, karena itu dipakai
> `fileURLToPath(new URL(...))`.

### A.3. PythonAnywhere butuh *entry point* WSGI

PythonAnywhere tidak menjalankan `flask run` maupun `gunicorn`; ia memuat objek bernama
`application` dari sebuah berkas WSGI. Buat `spatial-engine/wsgi.py`:

```python
from engine import app as application
```

(Alternatifnya, `from engine import app as application` bisa langsung ditulis di berkas
konfigurasi WSGI milik PythonAnywhere pada Bagian B.5.)

`spatial-engine/requirements.txt` tidak perlu diubah — `flask`, `flask-cors`, `pyproj`, `shapely`,
dan `gunicorn` sudah terdaftar (`gunicorn` sekadar tidak terpakai di PythonAnywhere).

---

## Bagian B — Deploy `spatial-engine` ke PythonAnywhere

### B.1. Clone repo dan siapkan virtualenv

Buka **Consoles → Bash**, lalu:

```bash
git clone https://github.com/<username-github>/mapid-academy-webgis-batch3.git
mkvirtualenv webgis --python=/usr/bin/python3.11
pip install -r ~/mapid-academy-webgis-batch3/spatial-engine/requirements.txt
```

Gunakan Python 3.10 ke atas (pengembangan lokal memakai 3.13). `shapely` dan `pyproj` terpasang
dari *wheel* manylinux, jadi tidak perlu *compiler*.

### B.2. Buat web app

Buka tab **Web → Add a new web app**, pilih **Manual configuration** — **bukan** wizard "Flask",
karena wizard tersebut membuat berkas aplikasi sendiri. Pilih versi Python yang sama dengan
virtualenv di atas.

### B.3. Isi pengaturan di tab Web

| Kolom | Nilai |
| --- | --- |
| Source code | `/home/<user>/mapid-academy-webgis-batch3/spatial-engine` |
| Working directory | `/home/<user>/mapid-academy-webgis-batch3/spatial-engine` |
| Virtualenv | `/home/<user>/.virtualenvs/webgis` |

### B.4. Sunting WSGI configuration file

Klik tautan **WSGI configuration file** di tab Web, hapus seluruh isinya, ganti dengan:

```python
import sys

path = "/home/<user>/mapid-academy-webgis-batch3/spatial-engine"
if path not in sys.path:
    sys.path.insert(0, path)

from wsgi import application
```

Baris `sys.path.insert` **wajib ada** — tanpa itu, `import` ke `toolbox.*` di dalam
[`engine.py`](spatial-engine/engine.py) akan gagal dan web app membalas error 500.

### B.5. Reload dan uji

Klik tombol hijau **Reload**, lalu uji dari terminal mana pun:

```bash
curl -X POST https://<user>.pythonanywhere.com/spatial_computation/area \
  -H "Content-Type: application/json" \
  -d '{"geometry": "POLYGON((110 -7, 111 -7, 111 -8, 110 -8, 110 -7))"}'
```

Respons yang diharapkan berupa JSON berisi `area_ha` dan `unit`. Jika muncul error 500, baca
*error log* yang tautannya ada di tab Web.

> Akun gratis kedaluwarsa setiap 1 bulan. Klik tombol **"Run until 1 month from today"** di tab
> Web secara berkala agar API tetap hidup.

---

## Bagian C — Deploy `webapp-maplibre` ke Render

1. *Push* perubahan dari Bagian A ke GitHub.
2. Di dasbor Render: **New → Static Site**, hubungkan ke repositori ini.
3. Isi pengaturan:

   | Kolom | Nilai |
   | --- | --- |
   | Root Directory | `webapp-maplibre` |
   | Build Command | `npm ci && npm run build` |
   | Publish Directory | `dist` |

4. Buka **Environment → Add Environment Variable**:

   ```
   VITE_API_BASE_URL = https://<user>.pythonanywhere.com
   ```

   Tanpa garis miring di akhir. Vite menanam nilai ini saat **build**, bukan saat *runtime* —
   jadi setiap kali nilainya diubah, situs harus di-*deploy* ulang, bukan sekadar di-*restart*.

5. Klik **Create Static Site** dan tunggu *build* selesai.

---

## Bagian D — Verifikasi

1. **Lokal masih jalan.** Jalankan Flask (`cd spatial-engine && flask --app engine run --debug`)
   dan `cd webapp-maplibre && npm run dev`. Klik poligon di layer `area-pulau` → nilai di `<div id="luas">`
   berubah; klik titik di layer `titik-kota` → poligon *buffer* 1000 km muncul. Ini membuktikan
   *fallback* di `config.js` masih berfungsi.
2. **API produksi.** Perintah `curl` pada Bagian B.5 membalas 200 beserta JSON.
3. **End-to-end.** Buka URL Render, ulangi kedua klik di atas, lalu periksa DevTools:
   - Tab **Network**: permintaan menuju `https://<user>.pythonanywhere.com/...` dan berstatus 200.
   - Tab **Console**: tidak ada error *mixed content* maupun CORS.
4. **Halaman kedua.** `https://<nama>.onrender.com/asia/indonesia.html` terbuka tanpa 404 —
   menandakan konfigurasi Vite di Bagian A.2 sudah benar.

---

## Catatan dan *troubleshooting*

- **CORS.** [`engine.py`](spatial-engine/engine.py) memakai `CORS(app)` (terbuka untuk semua asal).
  Ini disengaja karena API bersifat demo publik. Untuk membatasinya, ganti menjadi
  `CORS(app, origins=["https://<nama>.onrender.com"])`.
- **Error 500 di PythonAnywhere** hampir selalu berarti `sys.path` belum disetel (Bagian B.4) atau
  virtualenv belum dipilih (Bagian B.3). Cek *error log* di tab Web.
- **`dist/` masuk `.gitignore`** — memang seharusnya begitu; Render membangunnya sendiri.
- **Kuota CPU** akun gratis PythonAnywhere terbatas per hari. Endpoint `dijkstra` pada jaringan
  besar bisa menghabiskannya; untuk data seukuran demo ini aman.
- **Ukuran data.** [`webapp-maplibre/src/data/ne.geojson`](webapp-maplibre/src/data/ne.geojson)
  berukuran ~715 KB dan di-*import* dengan `?url`, sehingga disalin apa adanya ke `dist/assets`.
  Wajar bila pemuatan pertama terasa lambat.
