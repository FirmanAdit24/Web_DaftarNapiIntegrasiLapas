@echo off
cd C:\WebDaftarNarapidanaLapasMakassar\WebDaftarNarapidana
start "" "http://localhost:8000/login.html"
python -m http.server 8000
pause
