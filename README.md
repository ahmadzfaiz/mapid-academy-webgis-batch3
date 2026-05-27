# Toolbox Spatial in Python

## 1. Spatial Computation

### 1.1. Area
Mengukur luas dalam sebuah poligon menggunakan pengukuran geodesi. Input geometri harus dalam format WKT dan menggunakan koordinat geografis.
```bash
.venv/bin/python -m toolbox.spatial_computation.area \
  "POLYGON((110 -7, 111 -7, 111 -8, 110 -8, 110 -7), (110.4 -7.4, 110.6 -7.4, 110.6 -7.6, 110.4 -7.6, 110.4 -7.4))"
```

### 1.2. Distance
Mengukur jarak antara 2 geometri menggunakan pengukuran geodesi. Input geometri harus dalam format WKT dan menggunakan koordinat geografis.
```bash
.venv/bin/python -m toolbox.spatial_computation.distance \
    "POINT(110.3644 -7.7956)" \
    "POINT(106.8456 -6.2088)"
```

### 1.3. Length
Mengukur panjang pada garis atau keliling pada poligon menggunakan pengukuran geodesi. Input geometri harus dalam format WKT dan menggunakan koordinat geografis.
```bash
python -m toolbox.spatial_computation.length \
  "POLYGON((110 -7, 111 -7, 111 -8, 110 -8, 110 -7))"
```