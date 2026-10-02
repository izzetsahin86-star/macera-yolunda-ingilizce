# Macera Yolunda — İngilizce Oyunu

Fotoğraflardaki yeşil/turuncu arazi arabasından esinlenen, telefon ve bilgisayarda çalışan kelime macerası.

## Oyna

`index.html` dosyasını bir statik sunucuyla açın. Yerel çalıştırma: `npm start`, ardından http://localhost:3000.
Vercel gibi statik hosting servislerinde Framework: Other, çıktı dizini: `.`; derleme gerektirmez.

## Üç mod

1. İngilizce → Türkçe: 3 seçenek, 5 can.
2. İngilizce → Türkçe: yazılı cevap, 5 can.
3. Türkçe → İngilizce: yazılı cevap, 7 can.

Her oyun, “1. Tema Kelime Listesi.pdf” içindeki 45 kelime/ifadenin tamamını karışık sırayla sorar. 10 taş, 10 lav geçiş taşı, 10 köprü parçası, 8 lastik onarım adımı, 7 yakıt adımı tamamlanınca hazine kazanılır. Yanlış cevap bir can azaltır; doğru cevap gösterilir ve aynı kelimeyi çözmeden ilerlenmez. Türkçe karakter farkları, alternatif Türkçe anlamlar, İngilizcede a/an kullanım farkı ve tire/boşluk farkı kabul edilir.

Kelime seslendirmesi tarayıcının konuşma desteğine bağlıdır. Ses efektleri isteğe bağlıdır. Oyun verileri sunucuya gönderilmez. Menüye dönmek mevcut macerayı sıfırlar.

## Kontrol

`npm test`

## 3D LEGO görünümü

Yerel Three.js modülleriyle gerçek WebGL sahnesi: referans araca göre yeşil/turuncu 4×4, vinç, tavan kutusu, minifigür, dişli lastikler; LEGO taban, ağaçlar, dağlar, engeller ve açılan hazine sandığı. Dönen tekerlekler, sahne giriş sürüşü, taş kaldırma, köprü ve lav geçişi animasyonları vardır. Sahne yatay sürüklenerek döndürülebilir. WebGL desteği gerekir. Three.js lisansı `vendor/LICENSE` içindedir.
