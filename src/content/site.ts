// Wszystkie teksty i dane strony w jednym miejscu.
// DRAFT = true: strona pokazuje pasek „wersja robocza” i prosi wyszukiwarki, żeby jej nie indeksowały.
// Teksty, liczby i dane fundacji są na razie przykładowe — do podmiany po materiałach od klienta.
export const DRAFT = true

export const site = {
  name: 'Wild Roses',
  legalName: 'Fundacja Wild Roses',
  tagline: 'Pomagamy wyjść z przemocy i wrócić do samodzielnego życia.',
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
  text: 'Raz w miesiącu piszemy, co udało się zrobić i jak można pomóc. Bez spamu — wypisać się można jednym kliknięciem.',
  consent: 'Zgadzam się na otrzymywanie newslettera Fundacji Wild Roses na podany adres e-mail.',
  delay: 10_000,
}

// Zdania, które padają w domach z przemocą. W tle strony przebija je łodyga róży (components/Vines.tsx).
export const abuseLines = ['To twoja wina', 'Nikt ci nie uwierzy', 'Bez mnie jesteś nikim', 'Nikomu o tym nie mów', 'Przesadzasz', 'Nigdzie nie pójdziesz', 'To się więcej nie powtórzy']

export const nav = [
  { to: '/pomoc', label: 'Szukam pomocy' },
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

export const heroMessages = [
  { title: 'Nie musisz przechodzić przez to w pojedynkę', text: 'Powiesz nam tyle, ile chcesz. O każdym kolejnym kroku decydujesz Ty.' },
  { title: 'Pomoc jest bezpłatna i poufna', text: 'Nie pytamy o nazwisko. Nikomu nie przekazujemy tego, co nam powiesz.' },
  { title: 'Zaczynamy od rozmowy', text: 'Bez oceniania i bez pośpiechu. Potem razem układamy plan.' },
]

export const programs = [
  {
    id: 'bezpieczenstwo',
    img: 'window',
    name: 'Bezpieczeństwo i pierwsza pomoc',
    kind: 'Dla osób doświadczających przemocy',
    text: 'Rozmowa z osobą, która wysłucha i nie ocenia. Wspólnie układamy plan bezpieczeństwa, a w razie potrzeby łączymy z prawnikiem i psychologiem.',
  },
  {
    id: 'praca',
    img: 'desk',
    name: 'Powrót do pracy',
    kind: 'Dla mam i osób po kryzysie',
    text: 'Doradztwo zawodowe, pomoc w napisaniu CV, kursy i pierwsze kroki do zatrudnienia. Własne pieniądze to często pierwszy krok do niezależności.',
  },
  {
    id: 'przedsiebiorczosc',
    img: 'meeting',
    name: 'Przedsiębiorczość kobiet',
    kind: 'Dla kobiet i młodych osób',
    text: 'Mentoring, sieć kontaktów i wsparcie w dostępie do kapitału. Pomagamy zamienić pomysł we własną firmę.',
  },
  {
    id: 'prawa',
    img: 'notebook',
    name: 'Prawa i rzecznictwo',
    kind: 'Dla osób wykluczonych i pacjentów',
    text: 'Pilnujemy przestrzegania praw człowieka i praw pacjenta. Reprezentujemy osoby i grupy przed urzędami i w sporach z nimi.',
  },
  {
    id: 'seniorzy',
    img: 'senior',
    name: 'Godna dojrzałość',
    kind: 'Dla osób w wieku emerytalnym',
    text: 'Dbamy o rozwój i godne traktowanie seniorów: informacja, wsparcie w urzędach i miejsca, w których można być razem.',
  },
]

export const steps = [
  { name: 'Odzywasz się', text: 'Dzwonisz albo piszesz przez formularz. Możesz podać tylko imię lub pseudonim.' },
  { name: 'Rozmawiamy', text: 'Kontaktujemy się w sposób i o porze, które wskażesz jako bezpieczne.' },
  { name: 'Układamy plan', text: 'Ustalamy, czego potrzebujesz teraz: bezpieczeństwa, prawnika, psychologa, pracy.' },
]

// Dane przykładowe — do podmiany na prawdziwe sprawozdanie.
export const spending = [
  { label: 'Pomoc bezpośrednia', value: 62 },
  { label: 'Programy powrotu do pracy', value: 21 },
  { label: 'Rzecznictwo i pomoc prawna', value: 10 },
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
  { q: 'Nie jestem pewna/pewien, czy to, co mnie spotyka, to przemoc.', a: 'To częste. Przemoc to nie tylko bicie — to także kontrola, poniżanie, groźby, odcinanie od pieniędzy i bliskich. Napisz lub zadzwoń, porozmawiamy o tym spokojnie.' },
]

export const supportWays = [
  { id: 'darowizna', name: 'Darowizna', text: 'Jednorazowa lub stała. Każdą wpłatę rozliczamy publicznie w sprawozdaniu.' },
  { id: 'partnerstwo', name: 'Partnerstwo firmowe', text: 'Staże, miejsca pracy, szkolenia, usługi pro bono. Razem budujemy drogę powrotu do samodzielności.' },
  { id: 'inwestycja', name: 'Inwestycja społeczna', text: 'Finansowanie konkretnego programu z jasnym celem, budżetem i raportem z efektów.' },
  { id: 'wolontariat', name: 'Wolontariat kompetencyjny', text: 'Prawniczki, psycholodzy, doradczynie zawodowe, mentorki biznesu — Twoja wiedza komuś realnie pomoże.' },
]
