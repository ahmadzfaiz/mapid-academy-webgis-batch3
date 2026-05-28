# Toolbox Spatial in Python

## 1. Spatial Computation

### 1.1. Area
Mengukur luas dalam sebuah poligon menggunakan pengukuran geodesi menggunakan *ellipsoid* `WGS84`. Input geometri harus dalam format WKT dan menggunakan koordinat geografis.
```bash
python -m toolbox.spatial_computation.area \
  "POLYGON((110 -7, 111 -7, 111 -8, 110 -8, 110 -7), (110.4 -7.4, 110.6 -7.4, 110.6 -7.6, 110.4 -7.6, 110.4 -7.4))"
```

### 1.2. Distance
Mengukur jarak antara 2 geometri menggunakan pengukuran geodesi menggunakan *ellipsoid* `WGS84`. Input geometri harus dalam format WKT dan menggunakan koordinat geografis.
```bash
python -m toolbox.spatial_computation.distance \
    "POINT(110.3644 -7.7956)" \
    "POINT(106.8456 -6.2088)"
```

### 1.3. Length
Mengukur panjang pada garis atau keliling pada poligon menggunakan pengukuran geodesi menggunakan *ellipsoid* `WGS84`. Input geometri harus dalam format WKT dan menggunakan koordinat geografis.
```bash
python -m toolbox.spatial_computation.length \
  "POLYGON((110 -7, 111 -7, 111 -8, 110 -8, 110 -7))"
```

## 2. Geometry Manipulation

### 2.1. Buffer
Membuat geometri penyangga menggunakan perhitungan proyeksi **Azimuthal Equidistant**. Catatan: perhitungan hanya akurat pada skala perkotaan, lihat tabel di bawah.
```bash
python -m toolbox.geometry_manipulation.buffer \
  "POINT(110.3644 -7.7956)" 1000
```

| Jarak dari centroid | Distorsi tangensial | Distorsi maksimum |
| ------------------- | ------------------- | ----------------- |
| 100 km              | ~0.0041%            | ~0.04 m per km.   |
| 500 km              | ~0.10%              | ~1 m per km       |
| 1,000 km            | ~0.41%              | ~4 m per km       |
| 2,000 km            | ~1.66%              | ~16 m per km      |
| 3,000 km            | ~3.79%              | ~38 m per km      |
| 5,000 km            | ~11.05%             | ~110 m per km     |

### 2.2. Centroid
Membuat titik gravitasi pada sebuah input geometri. Input geometri harus dalam format WKT dan menggunakan koordinat geografis.
```bash
python -m toolbox.geometry_manipulation.centroid \
  "POLYGON((110 -7, 111 -7, 111 -8, 110 -8, 110 -7))"
```

### 2.3. Intersections
Membuat geometri baru di antara 2 input geometri yang mengalami titik persinggungan. Input geometri harus dalam format WKT dan menggunakan koordinat geografis.
```bash
python -m toolbox.geometry_manipulation.intersections \
  "POLYGON((110 -7, 111 -7, 111 -8, 110 -8, 110 -7))" \
  "POLYGON((110.5 -7.5, 112 -7.5, 112 -9, 110.5 -9, 110.5 -7.5))"
```