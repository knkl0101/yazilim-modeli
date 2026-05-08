export type StageId =
  | "planlama"
  | "gelistirme"
  | "test"
  | "uygulama"
  | "bakim";

export type TestProtocol = {
  id: string;
  name: string;
  status: "Geçti" | "Uyarı" | "Çalışıyor" | "Beklemede";
  metric: string;
  detail?: string;
};

export type DashboardCard = {
  id: string;
  title: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
};

/** Uzun açıklamalı metin: başlık, giriş ve alt başlıklar (ör. Planlama sayfası). */
export type StageDeepDive = {
  /** Örn. "Planlama ve Analiz nedir?" */
  overviewTitle: string;
  overviewParagraphs: string[];
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
};

export type CoraStage = {
  id: StageId;
  title: string;
  navLabel: string;
  shortTitle: string;
  route: string;
  accent: string;
  accentRgb: string;
  description: string;
  narrative: string;
  /** İsteğe bağlı: başlık ve alt başlıkların açıklamalı anlatımı */
  deepDive?: StageDeepDive;
  testProtocols: TestProtocol[];
  outputs: string[];
  dashboard: DashboardCard[];
};

/** Ana akışta kullanılacak görsel: `public/cora.png`. */
export const CORA_HOME_FLOW_IMAGE = "/cora.png";

export const CORA_STAGES: CoraStage[] = [
  {
    id: "planlama",
    title: "Planlama ve Analiz",
    navLabel: "Planlama",
    shortTitle: "Planlama ve Analiz",
    route: "/planlama",
    accent: "#FF3B30",
    accentRgb: "255, 59, 48",
    description:
      "İş hedefleri, kapsam ve paydaş beklentileri; test edilebilir gereksinimler ve risk odaklı plan.",
    narrative:
      "Bu aşamada gereksinim netliği ve risk görünürlüğü oluşturulur. Her karar kalemi, ilerideki test senaryolarına izlenebilir bağlar.",
    deepDive: {
      overviewTitle: "Planlama ve Analiz nedir?",
      overviewParagraphs: [
        "Planlama ve Analiz, yazılım yaşam döngüsünün temelidir. Bu aşamada “ne yapılacağı”, “kimler için yapılacağı”, “hangi sınırlar içinde kalınacağı” ve “başarı nasıl ölçülecek” soruları netleştirilir. Amaç yalnızca doküman üretmek değil; ilerideki geliştirme, test ve yayın adımlarında tartışmayı azaltacak kadar kesin, ölçülebilir ve paydaşlarca anlaşılmış bir zemin hazırlamaktır.",
        "C.O.R.A yaklaşımında planlama “tek seferlik bir toplantı” değil, gereksinim ve risklerin sürekli sorgulandığı bir doğrulama zinciridir. Burada üretilen her çıktı, sonraki aşamalardaki test modüllerine bağlanır: net bir gereksinim, yazılabilir bir test senaryosuna; görünür bir risk ise önceliklendirilmiş bir test ve azaltma planına dönüşür.",
      ],
      sections: [
        {
          heading: "İhtiyaç ve Gereksinim Analizi Testi",
          paragraphs: [
            "Bu test modülü, kullanıcı ve iş ihtiyaçlarının ve teknik gereksinimlerin geliştirmeye başlamadan önce gerçekten “hazır” olup olmadığını doğrular. Odak, maddelerin yazılmış olması değil; anlaşılmış, ölçülebilir, tutarlı ve uygulanabilir olmasıdır.",
            "Pratikte ekibin şu sorulara ortak cevap verebildiğini kontrol ederiz: Kapsam sınırları net mi? Kabul ölçütleri tanımlı mı? Öncelikler ve bağımlılıklar kayıt altında mı? Varsayımlar ve bilinmeyenler açıkça listelenmiş mi? Belirsiz veya çelişkili maddeler, bu aşamada giderilmezse ileride pahalı değişiklik taleplerine ve test tekrarına dönüşür.",
            "Sonuç olarak İhtiyaç ve Gereksinim Analizi Testi, projenin “doğru işi yapma” güvencesinin ilk halkasıdır: geliştiriciye değil, önce tanıma ve kabul kriterlerine bağlılık sağlar.",
          ],
        },
        {
          heading: "Risk Analizi Testi",
          paragraphs: [
            "Risk Analizi Testi, projenin öncesinde ve boyunca olası tehditleri yapılandırılmış biçimde ortaya çıkarma ve azaltma yükümlülüğü üretme sürecidir. Teknik riskler (mimari, entegrasyon, performans), süreç riskleri (kaynak, bağımlılık, iletişim) ve iş/takvim riskleri birlikte ele alınır.",
            "Bu modülün “test” yönü şudur: riskler sadece liste halinde bırakılmaz; her madde için olasılık ve etkiyle birlikte ölçüm, izleme ve tetikleyici koşullar tanımlanır. Böylece ekip, “ne zaman risk gerçekleşiyor?” sorusuna erken uyarılarla yanıt verebilir ve test yatırımını en kritik alanlara yönlendirebilir.",
            "Özeti: Risk Analizi Testi, belirsizliği yönetilebilir hale getirir; planlama çıktılarını teknik borç, güvenlik veya operasyonel sürprizlere karşı daha dayanıklı kılar ve ilerideki test stratejisinin önceliklerini belirler.",
          ],
        },
      ],
    },
    testProtocols: [
      {
        id: "req",
        name: "İhtiyaç ve Gereksinim Analizi Testi",
        status: "Geçti",
        metric: "Kapsam uyumu %98",
        detail: "Eksik / belirsiz madde: 3",
      },
      {
        id: "risk",
        name: "Risk Analizi Testi",
        status: "Uyarı",
        metric: "Yüksek risk: 2",
        detail: "Azaltma planı atandı",
      },
    ],
    outputs: ["BRD özeti", "Risk matrisi v1.2", "Test stratejisi taslak"],
    dashboard: [
      {
        id: "d1",
        title: "Gereksinim kararlılığı",
        value: "%94",
        delta: "+3%",
        trend: "up",
      },
      {
        id: "d2",
        title: "Açık soru",
        value: "5",
        delta: "-2",
        trend: "down",
      },
      {
        id: "d3",
        title: "Onay blokları",
        value: "0",
        delta: "0",
        trend: "flat",
      },
    ],
  },
  {
    id: "gelistirme",
    title: "Geliştirme",
    navLabel: "Geliştirme",
    shortTitle: "Geliştirme",
    route: "/gelistirme",
    accent: "#007AFF",
    accentRgb: "0, 122, 255",
    description:
      "Kod üretimi, kalite kapıları ve sürekli geri bildirimle erken hata yakalama.",
    narrative:
      "Birim ve statik analiz, değişiklik hızını korurken regresyon riskini düşürür; her commit çizgisinde kalite sinyali üretilir.",
    deepDive: {
      overviewTitle: "Geliştirme nedir?",
      overviewParagraphs: [
        "Geliştirme aşaması, planlanan işin somut yazılım çıktısına dönüştüğü yerdir. Burada amaç yalnızca “kodu yazmak” değil; her değişikliğin izlenebilir, gözden geçirilebilir ve otomatik doğrulamaya tabi olmasıdır. C.O.R.A modelinde geliştirme, hız ile kaliteyi birbirine düşman etmez: erken geri bildirim sayesinde hatalar üretim veya son test aşamasına taşınmadan yakalanır.",
        "Bu aşamanın iki test modülü — birim testleri ve statik analiz / kod incelemesi — geliştirme hattının günlük ritmini oluşturur. Biri davranışın küçük parçalarında doğruluk sağlar, diğeri ise standartlara uyumu, güvenlik ve sürdürülebilirlik sinyallerini kod henüz çalıştırılmadan üretir.",
      ],
      sections: [
        {
          heading: "Birim Testi (Unit Test)",
          paragraphs: [
            "Birim testi, yazılımın en küçük anlamlı parçalarını (fonksiyon, sınıf, modül) diğer bileşenlerden izole veya kontrollü biçimde ayırarak doğrulayan testlerdir. Amaç, her parçanın sözleşmesine (girdi–çıktı, kenar durumlar, hata durumları) uyduğunu tekrarlanabilir şekilde kanıtlamaktır.",
            "İyi bir birim testi seti, refactoring ve yeni özellik eklerken “eski davranış bozuldu mu?” sorusuna hızlı yanıt verir. Sürekli entegrasyonda bu testler her commit’te veya PR’da koşarak regresyon riskini düşürür; başarısızlık, sorunun hangi değişiklikten kaynaklandığını dar bir alanda aramanızı sağlar.",
            "Özetle Birim Testi modülü, geliştirme kalitesinin sırt çantasıdır: hızlı geri bildirim, belge görevi gören yaşayan örnekler ve sonraki entegrasyon testleri için güvenilir bir zemin sunar.",
          ],
        },
        {
          heading: "Kod İnceleme ve Statik Analiz Testi",
          paragraphs: [
            "Kod incelemesi, en az bir diğer geliştiricinin değişikliği okuyup mantık, okunabilirlik ve mimari uygunluk açısından sorguladığı insan merkezli bir kalite kapısıdır. Statik analiz ise kodu çalıştırmadan otomatik araçlarla tarar; olası bug kalıpları, güvenlik zayıflıkları, stil ihlalleri ve karmaşıklık uyarıları üretir.",
            "İkisini birlikte düşündüğümüzde: statik analiz geniş yüzeyi hızla tarar, kod incelemesi ise bağlamı, iş kurallarını ve “araçların göremediği” tasarım kararlarını ele alır. Bu modülün “test” olması, çıktının evrimsel olmasından kaynaklanır — ihlal sayısı azaltılır, kurallar güncellenir, PR kalitesi ölçülür.",
            "Sonuç: Kod İnceleme ve Statik Analiz Testi, üretim öncesi pahalı hataları erken keser; ekip içi bilgi paylaşımını artırır ve teknik borcun kontrolsüz büyümesini yavaşlatır.",
          ],
        },
      ],
    },
    testProtocols: [
      {
        id: "unit",
        name: "Birim Testi (Unit Test)",
        status: "Geçti",
        metric: "1.842 senaryo",
        detail: "Süre: 42 sn",
      },
      {
        id: "static",
        name: "Kod İnceleme ve Statik Analiz Testi",
        status: "Uyarı",
        metric: "Kural ihlali: 7",
        detail: "PR #1847",
      },
    ],
    outputs: ["API sözleşmesi", "Özellik bayrakları", "CI kalite raporu"],
    dashboard: [
      {
        id: "d1",
        title: "Derleme başarısı",
        value: "%99.1",
        delta: "+0.4%",
        trend: "up",
      },
      {
        id: "d2",
        title: "Kod kapsamı",
        value: "%81",
        delta: "+2%",
        trend: "up",
      },
      {
        id: "d3",
        title: "Açık PR",
        value: "12",
        delta: "+3",
        trend: "down",
      },
    ],
  },
  {
    id: "test",
    title: "Test",
    navLabel: "Test",
    shortTitle: "Test",
    route: "/test",
    accent: "#AF52DE",
    accentRgb: "175, 82, 222",
    description:
      "Entegrasyon ve sistem doğrulaması; uçtan uca davranışın tek doğruluk kaynağı.",
    narrative:
      "Servisler birlikte konuştuğunda ve prodüksiyon benzeri ortamda sistemin tamamı ölçülür; burası regresyon ve keşif testlerinin merkezidir.",
    deepDive: {
      overviewTitle: "Test aşaması nedir?",
      overviewParagraphs: [
        "Test aşaması, yazılımın “parçalarının çalışması” ile “bütünün iş kurallarına ve beklentilere uyumu” arasındaki boşluğu doldurur. Geliştirmede doğrulanan birimler bir araya gelince yeni hatalar ortaya çıkabilir; arayüz sözleşmeleri, veri akışı, zamanlama ve ortam farkları bu aşamada görünür hale gelir.",
        "C.O.R.A’da test merkezi; entegrasyon (bileşenler arası uyum), sistem (uçtan uca davranış) ve izlenebilirlik için kontrol paneli düşüncesini bir arada taşır. Amaç, yalnızca “geçti/kaldı” değil; hangi risk alanının kapatıldığını ve kalite kapılarının kararını destekleyecek kanıt üretmektir.",
      ],
      sections: [
        {
          heading: "Entegrasyon Testi",
          paragraphs: [
            "Entegrasyon testi, bileşenlerin veya servislerin birbirleriyle veri ve kontrol akışında doğru çalışıp çalışmadığını doğrular. Modül içi mantık birim testlerinde kanıtlanmış olsa da, API sözleşmeleri, mesaj kuyrukları, veritabanı işlemleri ve harici sistem stub’ları birleştiğinde yeni senaryolar ortaya çıkar.",
            "Bu modül, özellikle mikroservis veya çok katmanlı mimarilerde “sınır” hatalarını erken yakalar: yanlış serileştirme, versiyon uyumsuzluğu, zaman aşımı ve yeniden deneme politikaları gibi. Test ortamının üretime yakınlığı ne kadar iyiyse, entegrasyon testinin ürettiği güven de o kadar yüksek olur.",
            "Özet: Entegrasyon Testi, parçaların bir “sistem” olarak konuşabildiğini kanıtlar; dağıtım öncesi entegrasyon sürprizlerini azaltır.",
          ],
        },
        {
          heading: "Sistem Testi",
          paragraphs: [
            "Sistem testi, ürünü müşteri veya iş perspektifinden uçtan uca ele alır; gereksinimler ve kabul ölçütleriyle uyum hedeflenir. Arayüzden başlayıp arka plandaki iş kurallarına, veri tutarlılığına ve raporlamaya kadar geniş bir yüzeyi kapsayabilir.",
            "Bu aşamada odak, tek bir fonksiyon değil “akışların tamamı”dır: kullanıcı senaryoları, iş kuralları kombinasyonları, yetkilendirme, hata yönetimi ve sınır koşulları. Ortam genellikle staging veya prodüksiyona benzeyen kontrollü bir hat üzerindedir; veri ve konfigürasyon gerçekçi tutulur.",
            "Sonuç olarak Sistem Testi, “ürün olarak çalışıyor mu?” sorusuna yanıt verir; yayın kararı ve kalite kapıları için birincil kanıt kaynaklarından biridir.",
          ],
        },
        {
          heading: "Test Kontrol Paneli",
          paragraphs: [
            "Test kontrol paneli, dağınık test sonuçlarını ve metrikleri tek görünür yüzeyde toplama fikridir. Koşu geçmişi, kapsam, başarısızlık trendleri, ortam sağlığı ve açık kusur durumu aynı yerde izlenir; böylece ekip “ne durumdayız?” sorusuna hızlı ortak bir resimle yanıt verir.",
            "Bu modül yalnızca görselleştirme değildir: eşikler (ör. bloklayıcı hata sayısı, regresyon oranı) tanımlandığında kalite kapısı otomasyonuna bağlanabilir. Paydaşlar için şeffaflık; mühendislik için ise veriye dayalı önceliklendirme sağlar.",
            "Kısacası Test Kontrol Paneli, test sürecinin sinir sistemidir: erken uyarı, karar destek ve sürekli iyileştirme döngüsünü besler.",
          ],
        },
      ],
    },
    testProtocols: [
      {
        id: "int",
        name: "Entegrasyon Testi",
        status: "Geçti",
        metric: "Çağrı zinciri: 128",
        detail: "Hata: 0",
      },
      {
        id: "sys",
        name: "Sistem Testi",
        status: "Çalışıyor",
        metric: "İlerleme %67",
        detail: "Suite B aktif",
      },
      {
        id: "dash",
        name: "Test Kontrol Paneli",
        status: "Geçti",
        metric: "Metrik panosu senkron",
        detail: "Son güncelleme: 12 dk",
      },
    ],
    outputs: ["Test özet raporu", "Defect triage", "Kalite kapı onayı"],
    dashboard: [
      {
        id: "d1",
        title: "Senaryo geçişi",
        value: "%96",
        delta: "+1%",
        trend: "up",
      },
      {
        id: "d2",
        title: "Bloklayıcı",
        value: "0",
        delta: "-1",
        trend: "up",
      },
      {
        id: "d3",
        title: "Ortam kullanımı",
        value: "%74",
        delta: "+8%",
        trend: "up",
      },
    ],
  },
  {
    id: "uygulama",
    title: "Uygulama",
    navLabel: "Uygulama",
    shortTitle: "Uygulama",
    route: "/uygulama",
    accent: "#FFCC00",
    accentRgb: "255, 204, 0",
    description:
      "Dağıtım, izleme ve kullanıcı kabulü; canlıya çıkışın kontrollü geçişi.",
    narrative:
      "Kabul ve performans testleri, üretim öncesi son güvenceyi sağlar; rollout sırasında sinyaller tek panelde birleşir.",
    deepDive: {
      overviewTitle: "Uygulama aşaması nedir?",
      overviewParagraphs: [
        "Uygulama (yaygın kullanımda dağıtım / operasyonel devreye alma) aşaması, yazılımın kontrollü biçimde canlı ortama veya kullanıcıya açık ortama taşındığı fazıdır. Burada teknik hazırlık (sürümleme, konfigürasyon, izleme) ile iş tarafı güvencesi (kabul, performans hedefleri) birlikte yürür.",
        "C.O.R.A modelinde uygulama, kontrolsüz ve doğrulanmamış bir şekilde canlıya almak değil; kabul ölçütlerinin karşılandığının kanıtlandığı, performansın hedeflerle karşılaştırıldığı ve geri dönüş planının hazır olduğu bir geçiş kapısıdır. Bu iki test modülü, yayın öncesi son somut güvenceyi temsil eder.",
      ],
      sections: [
        {
          heading: "Kabul Testi (Acceptance Test)",
          paragraphs: [
            "Kabul testi, sistemin iş veya kullanıcı perspektifinden tanımlanan kabul kriterlerini karşılayıp karşılamadığını doğrular. Genelde ürün sahibi, iş analisti veya son kullanıcı temsilcilerinin katıldığı senaryolarla yürütülür; amaç teknik doğruluktan öte “doğru ürünü teslim etmek”tir.",
            "İyi tanımlanmış kabul testi, geliştirme ile iş tarafı arasında anlaşmazlığı azaltır: her madde önceden yazılmış ölçülebilir koşullara bağlanır. Başarısızlık durumunda yayın ertelenir veya kapsam bilinçli şekilde daraltılır; böylece canlıya “bilinmeyen” taşınmaz.",
            "Özetle Kabul Testi modülü, “müşteri / iş biriminin onayı”nı yapılandırılmış ve tekrarlanabilir hale getirir; üretim öncesi son iş hukuku kontrolüdür.",
          ],
        },
        {
          heading: "Performans Testi",
          paragraphs: [
            "Performans testi, sistemin belirli yük ve eşzamanlılık koşullarında yanıt süresi, işlem hacmi, kaynak kullanımı ve kararlılık açısından nasıl davrandığını ölçer. Amaç yalnızca “hızlı mı?” sorusu değil; pik dönemlerde çökme, veri kaybı veya kuyruk tıkanması riskini görünür kılmaktır.",
            "Bu testler genellikle senaryo bazlıdır: tipik iş yükü, en kötü gün senaryosu, ani trafik artışı ve uzun süreli dayanıklılık (soak) gibi. Elde edilen metrikler (ör. p95 gecikme, hata oranı, throughput) hedeflerle karşılaştırılır ve kapasite planlamasına girer.",
            "Sonuç: Performans Testi, canlıya çıktıktan sonra yaşanacak sürprizleri azaltır; ölçeklenebilirlik ve güvenilirlik borcunu erken ortaya çıkarır.",
          ],
        },
      ],
    },
    testProtocols: [
      {
        id: "uat",
        name: "Kabul Testi (Acceptance Test)",
        status: "Geçti",
        metric: "İş akışı: 18/18",
        detail: "PO onayı",
      },
      {
        id: "perf",
        name: "Performans Testi",
        status: "Uyarı",
        metric: "p95 420 ms",
        detail: "Hedef: 380 ms",
      },
    ],
    outputs: ["Yayın notları", "Dağıtım kontrol listesi", "İzleme panosu"],
    dashboard: [
      {
        id: "d1",
        title: "Dağıtım sağlığı",
        value: "A+",
        delta: "stabil",
        trend: "flat",
      },
      {
        id: "d2",
        title: "Hata bütçesi",
        value: "%0.02",
        delta: "-0.01%",
        trend: "up",
      },
      {
        id: "d3",
        title: "Rollback hazırlığı",
        value: "Hazır",
        delta: "son doğrulama OK",
        trend: "flat",
      },
    ],
  },
  {
    id: "bakim",
    title: "Bakım ve Destek",
    navLabel: "Bakım",
    shortTitle: "Bakım ve Destek",
    route: "/bakim",
    accent: "#34C759",
    accentRgb: "52, 199, 89",
    description:
      "Sürekli iyileştirme, yenileme ve geri bildirimle döngünün kapanması.",
    narrative:
      "Gerileme testleri her sürümde güvenceyi tazelir; yenileme testleri teknik borcu ve modernizasyonı ölçülü şekilde yönetir.",
    deepDive: {
      overviewTitle: "Bakım ve Destek nedir?",
      overviewParagraphs: [
        "Bakım ve Destek, ürün canlıya çıktıktan sonraki uzun soluklu fazdır. Yeni özellikler, düzeltmeler, altyapı güncellemeleri ve düzenleyici değişiklikler bu süreçte üretilir; kullanıcı geri bildirimi ve operasyonel olaylar sürekli bir öğrenme kaynağı oluşturur.",
        "C.O.R.A’da bakım aşaması iki test modülüyle desteklenir: gerileme testleri, değişikliğin geçmişte çalışanı bozmadığını kanıtlar; yenileme testleri ise modernizasyon, versiyon yükseltme veya yaşam döngüsü uzatma çalışmalarının güvenle tamamlanmasını hedefler. Böylece sürekli test döngüsü “yayın sonrası”nda da kapanmaz, yaşayan bir ritim olur.",
      ],
      sections: [
        {
          heading: "Gerileme Testi (Regression Test)",
          paragraphs: [
            "Gerileme testi, kod veya konfigürasyonda yapılan değişiklikten sonra daha önce doğrulanmış davranışın hâlâ doğru çalıştığını kontrol eden testlerdir. Amaç basittir ama kritiktir: “yeni bir şey eklerken eskiyi kırmadık mı?”",
            "Pratikte bu set genellikle otomasyona dayanır ve ana iş akışlarını, kritik entegrasyonları ve sık kırma riski taşıyan alanları kapsar. Sürekli entegrasyon ve düzenli sürümlerle koşulduğunda, gerileme testleri güvenli refactoring ve hızlı teslimatın temelidir.",
            "Özet: Gerileme Testi modülü, ürün olgunlaştıkça biriken bilgiyi “koruyucu ağ”a dönüştürür; kaliteyi tek seferlik bir olay değil süreklilik halinde tutar.",
          ],
        },
        {
          heading: "Yenileme Testi",
          paragraphs: [
            "Yenileme testi, sistemin güncellenmesi, modernize edilmesi veya yaşam döngüsünün uzatılması sırasında işlevin ve uyumluluğun korunduğunu doğrulamaya odaklanır. Örnekler: framework yükseltmesi, kütüphane değişimi, altyapı taşınması, güvenlik yaması sonrası doğrulama veya teknik borç temizliği kapsamında yapılan dönüşümler.",
            "Bu modülün kapsamı sıklıkla risk odaklıdır: değişen bileşenin sınırları, bağımlılık grafiği ve geri dönüş (rollback) senaryoları birlikte düşünülür. Yenileme, yapılmazsa borç büyür; yapılırsa kontrollü test ve izleme olmadan üretim riski artar — bu yüzden C.O.R.A’da ayrı bir doğrulama katmanı olarak yer alır.",
            "Sonuç: Yenileme Testi, modernizasyon yatırımının güvenle sonuçlanmasını sağlar; bilinen iyi durumu yeni teknik zemine taşırken sürprizleri sınırlar.",
          ],
        },
      ],
    },
    testProtocols: [
      {
        id: "reg",
        name: "Gerileme Testi (Regression Test)",
        status: "Geçti",
        metric: "Tam otomatik",
        detail: "Gece koşusu",
      },
      {
        id: "renew",
        name: "Yenileme Testi",
        status: "Beklemede",
        metric: "Planlanan: R24",
        detail: "Bağımlılık analizi",
      },
    ],
    outputs: ["SLO raporu", "Destek sıra analitiği", "Teknik borç özet"],
    dashboard: [
      {
        id: "d1",
        title: "MTTR",
        value: "38 dk",
        delta: "-6 dk",
        trend: "up",
      },
      {
        id: "d2",
        title: "Müşteri etkisi",
        value: "Düşük",
        delta: "72 saat trend",
        trend: "flat",
      },
      {
        id: "d3",
        title: "Yenileme emri",
        value: "3",
        delta: "+1",
        trend: "down",
      },
    ],
  },
];

export function getStage(id: StageId): CoraStage {
  const stage = CORA_STAGES.find((s) => s.id === id);
  if (!stage) throw new Error(`Unknown stage: ${id}`);
  return stage;
}

export function getStageIndex(id: StageId): number {
  return CORA_STAGES.findIndex((s) => s.id === id);
}
