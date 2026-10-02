export const roadStages=[
{key:'rocks',count:10,title:'10 büyük taş yolu kapatıyor!',task:'Bir kelime çöz, bir taşı kaldır.',name:'TAŞLI GEÇİT'},
{key:'lava',count:10,title:'Önünde kızgın lavlar var!',task:'Her kelimeyle güvenli bir geçiş taşı yerleştir.',name:'LAV VADİSİ'},
{key:'river',count:10,title:'Nehirden geçmek için köprü kur!',task:'Doğru cevaplarla köprüyü tamamla.',name:'NEHİR GEÇİŞİ'},
{key:'tire',count:8,title:'Eyvah, lastik patladı!',task:'Kelimeleri çözerek lastiği onar.',name:'TAMİR MOLASI'},
{key:'fuel',count:7,title:'Benzin bitti, mağara çok yakın!',task:'Her doğru cevapla depoya yakıt ekle.',name:'MAĞARAYA SON DURAK'}];
export const caveStages=[
{key:'torch',count:9,title:'Meşalen söndü, etraf karanlık!',task:'Kelimeleri çöz, meşaleyi yeniden yak ve yolu aydınlat.',name:'SÖNEN MEŞALE'},
{key:'tiger',count:9,title:'Bir aslan geçidi koruyor!',task:'Doğru cevaplarla aslanı sakinleştir, güvenle geç.',name:'ASLAN GEÇİDİ'},
{key:'snake',count:9,title:'Yılanlar yolu kapatıyor!',task:'Her kelimeyle yılanları yoldan uzaklaştır.',name:'YILAN TÜNELİ'},
{key:'spider',count:9,title:'Örümcek ağına dikkat!',task:'Kelimeleri çöz, örümcekleri uzaklaştır ve geçidi aç.',name:'ÖRÜMCEK SALONU'},
{key:'caveRocks',count:9,title:'Son geçit taşlarla kapanmış!',task:'Her doğru cevapla bir LEGO taşı kaldır. Hazine ileride!',name:'GİZLİ HAZİNE GEÇİDİ'}];
export function stageAt(phase,index){const stages=phase==='cave'?caveStages:roadStages;let offset=0;for(let i=0;i<stages.length;i++){if(index<offset+stages[i].count)return {...stages[i],number:i+1,done:index-offset};offset+=stages[i].count;}return {...stages.at(-1),number:5,done:stages.at(-1).count};}
