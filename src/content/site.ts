// Wszystkie teksty i dane strony w jednym miejscu.
// DRAFT = true: strona pokazuje pasek „wersja robocza” i prosi wyszukiwarki, żeby jej nie indeksowały.
// Merytoryka (cel, misja, filary, obszary działania) — z materiałów fundacji z 14.10.2026.
// Liczby, wydatki i dane rejestrowe są nadal przykładowe — do podmiany po materiałach od klienta.
export const DRAFT = true

export const site = {
  name: 'Wild Roses',
  legalName: 'Fundacja Wild Roses',
  // zdanie „zaraz pod logo” — prośba fundacji
  tagline: 'Dążymy do stworzenia silnej społeczności niezależnych Kobiet wrażliwych na kwestie społeczne.',
  motto: 'Budujemy bezpieczeństwo psychiczne i finansowe na własnej sile.',
  // cel fundacji — słowami fundacji
  goal: 'Celem Fundacji jest tworzenie silnej społeczności niezależnych Kobiet wrażliwych na kwestie społeczne poprzez wspieranie ich rozwoju intelektualnego i osobowego.',
  mission: 'W naszej działalności chcemy pomagać zauważyć siebie, swoje potrzeby, talenty i swoje ambicje.',
  // dane fundacji — do uzupełnienia
  email: '',
  phone: '',
  address: '',
  krs: '',
  nip: '',
  regon: '',
  account: '',
}

// Zapis na newsletter: okno po 10 s od wejścia, strona „Kontakt” i stopka.
export const newsletter = {
  title: 'Bądź na bieżąco',
  text: 'Raz w miesiącu: nowe warsztaty, spotkania społeczności i to, co udało się zrobić. Bez spamu — wypisać się można jednym kliknięciem.',
  consent: 'Zgadzam się na otrzymywanie newslettera Fundacji Wild Roses na podany adres e-mail.',
  delay: 10_000,
}

// Zdania, które padają w domach z przemocą. W tle strony przebija je łodyga róży (components/Vines.tsx).
export const abuseLines = ['To twoja wina', 'Nikt ci nie uwierzy', 'Bez mnie jesteś nikim', 'Nikomu o tym nie mów', 'Przesadzasz', 'Nigdzie nie pójdziesz', 'To się więcej nie powtórzy']

export const nav = [
  { to: '/pomoc', label: 'Szukam wsparcia' },
  { to: '/o-fundacji', label: 'O fundacji' },
  { to: '/przejrzystosc', label: 'Przejrzystość' },
  { to: '/wspolpraca', label: 'Wesprzyj nas' },
  { to: '/kontakt', label: 'Kontakt' },
]

// Ogólnopolskie, publiczne numery pomocowe (stan na 10.2026 — sprawdzić przed publikacją).
export const hotlines = [
  { tel: '112', label: 'Numer alarmowy', note: 'Gdy zagrożone jest życie lub zdrowie. Całą dobę.' },
  { tel: '800 120 002', label: 'Niebieska Linia', note: 'Dla osób doświadczających przemocy domowej. Bezpłatnie, całą dobę.' },
  { tel: '116 123', label: 'Kryzysowy telefon zaufania', note: 'Wsparcie psychologiczne dla dorosłych. Bezpłatnie.' },
  { tel: '116 111', label: 'Telefon zaufania dla dzieci i młodzieży', note: 'Bezpłatnie, całą dobę.' },
]
export const mainHotline = hotlines[1]
export const telHref = (tel: string) => `tel:${tel.replace(/\s/g, '')}`

// Karta obok zdjęcia w hero — trzy krótkie zdania do Kobiety, która trafia na stronę.
export const heroMessages = [
  { title: 'Zauważ siebie', text: 'Swoje potrzeby, talenty i ambicje. Od tego zaczyna się każda zmiana.' },
  { title: 'Nie jesteś sama', text: 'Budujemy społeczność Kobiet, które wspierają się nawzajem — w kryzysie i w rozwoju.' },
  { title: 'Twoja siła, Twoje tempo', text: 'O każdym kroku decydujesz Ty. My dajemy wiedzę, wsparcie i ludzi obok.' },
]

// Cztery filary — hasła fundacji (kolejność jak w materiałach). Każdy filar = konkretne obszary z merytoryki.
export const pillars = [
  {
    id: 'edukacja',
    name: 'Edukacja',
    title: 'Wiedza, która daje niezależność',
    text: 'Poszerzamy wiedzę prawną, ekonomiczną i finansową. Uczymy rozpoznawać przemoc i reagować na nią — w pracy, w przestrzeni publicznej i w szkołach.',
  },
  {
    id: 'rozwoj',
    name: 'Rozwój',
    title: 'Od świadomości do samorealizacji',
    text: 'Wspieramy rozwój intelektualny i osobowy: świadomość siebie, transformację, markę osobistą, powrót na rynek pracy, widoczność i znaczenie społeczne.',
  },
  {
    id: 'wsparcie',
    name: 'Wsparcie',
    title: 'Nie zostajesz z tym sama',
    text: 'Wspieramy Kobiety doświadczające przemocy domowej i budujemy programy ich wsparcia. Tworzymy społeczność, na której można się oprzeć.',
  },
  {
    id: 'uwaznosc',
    name: 'Uważność',
    title: 'Zauważyć siebie',
    text: 'Zarządzanie stresem i emocjami, dobrostan psychiczny, równowaga i odporność psychiczna. Odwaga do zmian zaczyna się od uważności na siebie.',
  },
]

// Programy = filary w praktyce. `pillar` to etykieta filaru nad nazwą programu.
export const programs = [
  {
    id: 'przemoc-domowa',
    img: 'window',
    pillar: 'Wsparcie',
    name: 'Wsparcie Kobiet doświadczających przemocy domowej',
    text: 'Rozmowa bez oceniania, plan bezpieczeństwa, kontakt z prawniczką i psycholożką. Budujemy programy wsparcia, które prowadzą od kryzysu do samodzielności.',
    to: '/pomoc',
  },
  {
    id: 'przeciwdzialanie-przemocy',
    img: 'notebook',
    pillar: 'Edukacja',
    name: 'Przeciwdziałanie przemocy w pracy, szkole i przestrzeni publicznej',
    text: 'Warsztaty i szkolenia dla firm, szkół i instytucji: jak rozpoznać przemoc, mobbing i przemoc rówieśniczą — i jak mądrze reagować.',
    to: '/wspolpraca',
  },
  {
    id: 'rownowaga',
    img: 'friends',
    pillar: 'Uważność',
    name: 'Równowaga i odporność psychiczna',
    text: 'Zarządzanie stresem i emocjami, samodoskonalenie, dobrostan psychiczny i odwaga do zmian. Spotkania, po których łatwiej o spokój i decyzję.',
    to: '/o-fundacji#filary',
  },
  {
    id: 'niezaleznosc',
    img: 'desk',
    pillar: 'Edukacja · Rozwój',
    name: 'Niezależność finansowa i powrót na rynek pracy',
    text: 'Wiedza prawna, ekonomiczna i finansowa w praktyce. Pomagamy wrócić do pracy po przerwie — także mamom — i budować bezpieczeństwo finansowe na własnej sile.',
    to: '/o-fundacji#filary',
  },
  {
    id: 'marka-osobista',
    img: 'meeting',
    pillar: 'Rozwój',
    name: 'Marka osobista, samorealizacja i widoczność',
    text: 'Jak zbudować swoją markę osobistą, być widoczną i mieć wpływ — w pracy, we własnym biznesie i w życiu społecznym. Samostanowienie zamiast czekania na pozwolenie.',
    to: '/o-fundacji#filary',
  },
]

// Zakres wsparcia — lista z materiałów fundacji (strona „O fundacji”).
export const missionAreas = [
  'rozwój świadomości i niezależności',
  'budowanie marki osobistej',
  'wsparcie w transformacji personalnej',
  'wzmacnianie potrzeby samorealizacji i samostanowienia',
  'powrót na rynek pracy',
  'wiedza prawna, ekonomiczna i finansowa',
  'rozwój przez autonomię i tworzenie własnej siły',
  'widoczność i znaczenie — także społeczne',
]

// Do kogo się zwracamy — odpowiedź na pytanie „kim jesteśmy, do kogo mówimy”.
export const audiences = [
  { name: 'Kobiety doświadczające przemocy', text: 'Bezpieczeństwo, rozmowa i plan wyjścia — poufnie i bezpłatnie.' },
  { name: 'Kobiety w zmianie', text: 'Po przerwie, po kryzysie, przed decyzją. Rozwój, równowaga i odwaga do kolejnego kroku.' },
  { name: 'Kobiety budujące swoją niezależność', text: 'Wiedza finansowa i prawna, marka osobista, praca i własny biznes.' },
  { name: 'Szkoły, firmy i instytucje', text: 'Programy przeciwdziałania przemocy i warsztaty dla zespołów, uczniów i nauczycieli.' },
]

export const steps = [
  { name: 'Odzywasz się', text: 'Dzwonisz albo piszesz przez formularz. Możesz podać tylko imię lub pseudonim.' },
  { name: 'Rozmawiamy', text: 'W sposób i o porze, które wskażesz jako bezpieczne. Mówisz, czego potrzebujesz: wsparcia, wiedzy czy rozwoju.' },
  { name: 'Wybierasz swoją ścieżkę', text: 'Program, warsztat, mentoring albo pomoc specjalistki. W Twoim tempie i na Twoich warunkach.' },
]

// Dane przykładowe — do podmiany na prawdziwe sprawozdanie.
export const spending = [
  { label: 'Wsparcie Kobiet doświadczających przemocy', value: 48 },
  { label: 'Edukacja i przeciwdziałanie przemocy', value: 24 },
  { label: 'Rozwój, równowaga i powrót do pracy', value: 21 },
  { label: 'Administracja', value: 7 },
]

export const principles = [
  { name: 'Poufność', text: 'To, co nam powiesz, zostaje między nami. Dane osób, którym pomagamy, nigdy nie trafiają do darczyńców ani partnerów.' },
  { name: 'Jawne finanse', text: 'Publikujemy sprawozdania i pokazujemy, na co wydajemy każdą darowiznę.' },
  { name: 'Decyzja należy do Ciebie', text: 'Nie robimy nic za Twoimi plecami. Każdy krok ustalamy wspólnie.' },
  { name: 'Pomoc bez opłat', text: 'Osoby potrzebujące wsparcia nie płacą za naszą pomoc.' },
]

export const documents = [
  { name: 'Statut fundacji', status: 'w przygotowaniu' },
  { name: 'Sprawozdanie merytoryczne', status: 'po pierwszym roku działalności' },
  { name: 'Sprawozdanie finansowe', status: 'po pierwszym roku działalności' },
  { name: 'Polityka prywatności', status: 'w przygotowaniu' },
]

// § 2 statutu — 22 cele, pogrupowane w pięć obszarów (treść celów bez zmian).
export const statuteGoals = [
  {
    area: 'Ludzie i ich prawa',
    goals: [
      'monitorowanie przestrzegania praw człowieka oraz reprezentowanie interesów poszczególnych grup społecznych, w tym osób wykluczonych przed organami publicznymi lub w sporach z nimi',
      'monitorowanie przestrzegania praw pacjenta oraz reprezentowanie interesów poszczególnych pacjentów lub grup pacjentów przed organami publicznymi lub w sporach z nimi',
      'ułatwianie powrotu na rynek matkom oraz osobom doświadczającym wszelkich form przemocy lub wykluczenia',
      'troska o rozwój i godne traktowanie osób w wieku emerytalnym',
    ],
  },
  {
    area: 'Kobiety i społeczność',
    goals: [
      'działania na rzecz rozwoju przedsiębiorczości, w szczególności wśród kobiet oraz młodego pokolenia',
      'integracja środowisk kobiecych, w tym środowisk o charakterze biznesowym, akademickim i zawodowym',
      'wzmacnianie pozycji kobiet w biznesie',
      'integracja środowisk biznesowych, w szczególności małych i średnich przedsiębiorczyń i przedsiębiorców',
      'integracja środowisk zawodowych i akademickich',
    ],
  },
  {
    area: 'Państwo i prawo',
    goals: [
      'rozwój społeczeństwa obywatelskiego',
      'umacnianie w Polsce sprawiedliwości, samorządności oraz systemu demokratycznego',
      'wyznaczanie kierunków rozwoju i monitorowanie tworzonego prawa w Polsce i Unii Europejskiej',
      'dążenie do ochrony praw autorskich i innych wartości intelektualnych',
    ],
  },
  {
    area: 'Biznes i rynek',
    goals: [
      'dążenie do poszerzania i rozwoju rynku usług w Polsce',
      'tworzenie ekosystemów wsparcia rozwoju biznesu i ułatwianie dostępu do kapitału',
      'doradztwo strategiczne i operacyjne',
      'działania na rzecz rozwoju i wzmacniania konkurencyjności rynku',
      'przeciwdziałanie nieuczciwej konkurencji',
    ],
  },
  {
    area: 'Innowacje i technologia',
    goals: ['wspieranie i promocja innowacyjności', 'wspieranie transformacji cyfrowej', 'promocja innowacji i transferu technologii', 'rozwój sektora startupów'],
  },
]

export const faq = [
  { q: 'Czy pomoc jest płatna?', a: 'Nie. Osoby, które zgłaszają się po wsparcie, nie ponoszą żadnych kosztów.' },
  { q: 'Czy muszę podawać nazwisko?', a: 'Nie. Wystarczy imię albo pseudonim i bezpieczny sposób kontaktu.' },
  { q: 'Co się stanie po wysłaniu formularza?', a: 'Odezwiemy się w sposób i o porze, które wskażesz. Jeśli zaznaczysz, że nie możemy zostawić wiadomości — nie zostawimy jej.' },
  { q: 'Czy zgłosicie sprawę na policję bez mojej zgody?', a: 'O kolejnych krokach decydujesz Ty. Wyjątkiem jest sytuacja bezpośredniego zagrożenia życia, o czym zawsze uprzedzamy w rozmowie.' },
  { q: 'Nie jestem pewna, czy to, co mnie spotyka, to przemoc.', a: 'To częste. Przemoc to nie tylko bicie — to także kontrola, poniżanie, groźby, odcinanie od pieniędzy i bliskich. Napisz lub zadzwoń, porozmawiamy o tym spokojnie.' },
]

export const supportWays = [
  { id: 'darowizna', name: 'Darowizna', text: 'Jednorazowa lub stała. Każdą wpłatę rozliczamy publicznie w sprawozdaniu.' },
  { id: 'partnerstwo', name: 'Partnerstwo firmowe', text: 'Warsztaty przeciwdziałania przemocy w Twojej firmie, staże, miejsca pracy, usługi pro bono.' },
  { id: 'inwestycja', name: 'Inwestycja społeczna', text: 'Finansowanie konkretnego programu z jasnym celem, budżetem i raportem z efektów.' },
  { id: 'wolontariat', name: 'Wolontariat kompetencyjny', text: 'Prawniczki, psycholożki, doradczynie finansowe i zawodowe, mentorki biznesu — Twoja wiedza komuś realnie pomoże.' },
]
