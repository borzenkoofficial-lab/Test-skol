import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowDownRight, ArrowUpRight, Bell, Building2, CalendarClock, Check,
  ChevronDown, CircleHelp, Clipboard, Compass, Download, FileText, Grid2X2,
  House, Layers3, MapPin, Moon, Ruler, ShieldCheck, Sun, Truck, Wrench, X
} from 'lucide-react';

const navItems = [
  { label: 'Главная', icon: House, target: 'top' },
  { label: 'Проекты', icon: Grid2X2, target: 'projects' },
  { label: 'Услуги', icon: Layers3, target: 'services' },
  { label: 'О компании', icon: Compass, target: 'about' },
  { label: 'Контакты', icon: CircleHelp, target: 'contact' },
];

const serviceOptions = [
  'Демонтаж',
  'Подготовка помещений',
  'Черновая отделка',
  'Чистовая отделка',
  'Фасадные работы',
  'Комплексные работы',
];

const detailedServices = [
  { number: '01', title: 'Демонтаж перегородок и отделки', text: 'Снятие старой отделки, разборка ненесущих перегородок, демонтаж встроенных элементов по согласованным границам.', tags: ['Перегородки', 'Отделка', 'Встроенные элементы'] },
  { number: '02', title: 'Демонтаж полов и стяжки', text: 'Разборка напольных покрытий и стяжки с учётом конструкции основания, логистики выноса и требований здания.', tags: ['Покрытия', 'Стяжка', 'Вынос'] },
  { number: '03', title: 'Подготовка помещений', text: 'Освобождение пространства от демонтируемых элементов, организация рабочего участка и подготовка к следующим работам.', tags: ['Подготовка', 'Организация', 'Передача этапа'] },
  { number: '04', title: 'Черновая отделка', text: 'Работы по подготовке оснований и поверхностей в соответствии с согласованным техническим заданием.', tags: ['Основания', 'Поверхности', 'ТЗ'] },
  { number: '05', title: 'Чистовая отделка', text: 'Финишные работы и покрытия по согласованному перечню, материалам и требованиям объекта.', tags: ['Финиш', 'Покрытия', 'Материалы'] },
  { number: '06', title: 'Комплексные работы', text: 'Объединение нескольких направлений в один согласованный объём с последовательностью этапов и координацией исполнителей.', tags: ['Один подрядчик', 'Этапы', 'Координация'] },
];

const faqs = [
  { question: 'Как рассчитывается стоимость демонтажа?', answer: 'Для предварительной оценки нужны адрес или район, тип и площадь помещения, перечень демонтируемых конструкций, этаж и условия доступа. Стоимость подтверждается после уточнения состава работ и особенностей площадки.' },
  { question: 'Можно ли заказать демонтаж вместе с отделкой?', answer: 'Да, можно обсудить отдельные работы или комплексный объём. Границы ответственности, последовательность этапов и состав результата согласуются до начала работ.' },
  { question: 'Вы работаете с коммерческими объектами?', answer: 'Сайт ориентирован на коммерческие и частные объекты в Москве и Московской области. Возможность выполнения, график и условия необходимо подтвердить по конкретному объекту.' },
  { question: 'Что нужно подготовить для расчёта?', answer: 'Достаточно начать с того, что известно: тип объекта, район, площадь и описание задачи. Фотографии, планы и ведомость объёмов помогут точнее определить объём работ.' },
  { question: 'Вывоз строительного мусора входит в стоимость?', answer: 'Это зависит от задачи, объёма отходов, условий погрузки и выбранной схемы вывоза. Укажите, нужен ли вывоз, чтобы включить его в обсуждение состава работ.' },
  { question: 'Можно ли прислать фотографии или смету?', answer: 'Да. Подготовьте их для передачи при согласовании заявки. Текущая форма на сайте собирает текстовый бриф и не загружает файлы на сервер.' },
];

function App() {
  const [dark, setDark] = useState(false);
  const [activeNav, setActiveNav] = useState('Главная');
  const [sidebarCompact, setSidebarCompact] = useState(false);
  const [service, setService] = useState('Комплексные работы');
  const [objectType, setObjectType] = useState('Коммерческий');
  const [budget, setBudget] = useState('Обсудим');
  const [area, setArea] = useState('');
  const [location, setLocation] = useState('');
  const [access, setAccess] = useState('Обычный доступ');
  const [waste, setWaste] = useState('Нужно обсудить');
  const [query, setQuery] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [showContact, setShowContact] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [briefReady, setBriefReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    if (!showContact && !showNotifications) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowContact(false);
        setShowNotifications(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showContact, showNotifications]);

  const briefText = useMemo(() => [
    'ЗАПРОС НА РАСЧЁТ РАБОТ — СКОЛ',
    '',
    `Контактное лицо: ${name.trim() || 'не указано'}`,
    `Телефон / мессенджер: ${phone.trim() || 'не указан'}`,
    `Направление: ${service}`,
    `Тип объекта: ${objectType}`,
    `Площадь: ${area.trim() ? `${area.trim()} м²` : 'не указана'}`,
    `Адрес / район: ${location.trim() || 'не указан'}`,
    `Доступ на площадку: ${access}`,
    `Вывоз отходов: ${waste}`,
    `Ориентир бюджета: ${budget}`,
    '',
    'Описание задачи:',
    query.trim() || 'не указано',
    '',
    'Дополнительные сведения:',
    details.trim() || 'не указаны',
  ].join('\n'), [name, phone, service, objectType, area, location, access, waste, budget, query, details]);

  const jumpTo = (id: string, label?: string) => {
    if (label) setActiveNav(label);
    setShowNotifications(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const startRequest = (nextService?: string) => {
    if (nextService) setService(nextService);
    setBriefReady(false);
    setCopyStatus('');
    setShowContact(true);
  };

  const submitBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBriefReady(true);
    setCopyStatus('');
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopyStatus('Бриф скопирован. Вставьте его в письмо или мессенджер.');
    } catch {
      setCopyStatus('Автоматическое копирование недоступно в этом браузере. Скачайте бриф в TXT.');
    }
  };

  const downloadBrief = () => {
    const file = new Blob([briefText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'skol-zapros-na-raschet.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setCopyStatus('Бриф скачан. Его можно приложить к письму или отправить в мессенджере.');
  };

  return (
    <main className={dark ? 'app dark' : 'app'}>
      <div className="metal-grain" aria-hidden="true" />
      <section className="frame" id="top">
        <div className="frame-glow" aria-hidden="true" />
        <div className={sidebarCompact ? 'workspace sidebar-is-compact' : 'workspace'}>
          <aside className={sidebarCompact ? 'sidebar compact' : 'sidebar'}>
            <button className="brand-mark" aria-label="СКОЛ — на главную" onClick={() => jumpTo('top', 'Главная')}><Wrench size={21} strokeWidth={1.5} /></button>
            <nav className="side-nav" aria-label="Основная навигация">
              {navItems.map(({ label, icon: Icon, target }) => (
                <button key={label} className={activeNav === label ? 'nav-icon active' : 'nav-icon'} title={label} aria-label={label} aria-current={activeNav === label ? 'page' : undefined} onClick={() => jumpTo(target, label)}>
                  <Icon size={18} strokeWidth={1.6} />
                </button>
              ))}
            </nav>
            <div className="sidebar-bottom">
              <div className="avatar" role="img" aria-label="Команда СКОЛ">С</div>
              <div className="notification-wrap">
                <button className={showNotifications ? 'nav-icon active' : 'nav-icon'} aria-label="Информация об уведомлениях" aria-expanded={showNotifications} onClick={() => setShowNotifications(value => !value)}><Bell size={17} /></button>
                {showNotifications && <div className="notice-popover" role="status"><b>Уведомления о заявках</b><span>Подключение к CRM или почте пока не настроено. Когда появится интеграция, новые запросы можно будет показывать здесь.</span></div>}
              </div>
              <button className="nav-icon" aria-label={dark ? 'Включить светлую тему' : 'Включить тёмную тему'} onClick={() => setDark(value => !value)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
            </div>
            <button className="sidebar-toggle" aria-label={sidebarCompact ? 'Развернуть панель' : 'Свернуть панель'} aria-expanded={!sidebarCompact} onClick={() => setSidebarCompact(value => !value)}><ArrowUpRight size={15} /></button>
          </aside>

          <div className="dashboard">
            <header className="topbar">
              <button className="top-pill top-pill-primary" onClick={() => jumpTo('services', 'Услуги')}><span className="pill-spark"><Wrench size={13} /></span>Услуги и работы <ArrowUpRight size={14} /></button>
              <div className="filters" aria-label="Параметры объекта">
                <label className="filter-field"><span><MapPin size={11} /> Направление</span><select value={service} onChange={event => { setService(event.target.value); setBriefReady(false); setCopyStatus(''); }}>{serviceOptions.map(option => <option key={option}>{option}</option>)}</select><ChevronDown size={13} /></label>
                <label className="filter-field"><span><Building2 size={11} /> Тип объекта</span><select value={objectType} onChange={event => { setObjectType(event.target.value); setBriefReady(false); setCopyStatus(''); }}>{['Коммерческий', 'Частный', 'Офис', 'Магазин', 'Промышленный'].map(option => <option key={option}>{option}</option>)}</select><ChevronDown size={13} /></label>
                <label className="filter-field"><span><Ruler size={11} /> Бюджет</span><select value={budget} onChange={event => { setBudget(event.target.value); setBriefReady(false); setCopyStatus(''); }}>{['Обсудим', 'До 300 тыс. ₽', '300 тыс. — 1 млн ₽', 'От 1 млн ₽', 'От 3 млн ₽'].map(option => <option key={option}>{option}</option>)}</select><ChevronDown size={13} /></label>
              </div>
              <button className="top-pill top-pill-outline" onClick={() => startRequest()}>Обсудить объект <ArrowUpRight size={14} /></button>
            </header>

            <section className="hero" aria-label="СКОЛ — демонтаж и строительные работы">
              <div className="hero-art" aria-hidden="true">
                <div className="site-ambient ambient-left" />
                <div className="site-ambient ambient-right" />
                <div className="site-ceiling"><i /><i /><i /><i /><i /><i /></div>
                <div className="site-hall">
                  <div className="site-backwall"><div className="site-backgrid" /></div>
                  <div className="site-opening"><i /><i /><i /></div>
                  <div className="site-column column-left" /><div className="site-column column-mid" /><div className="site-column column-right" />
                  <div className="site-scaffold"><i /><i /><i /><i /><b /><b /><b /></div>
                  <div className="site-partition" /><div className="site-floor" />
                  <div className="site-debris"><i /><i /><i /><i /><i /><i /></div>
                </div>
                <div className="site-drawing-label drawing-label-top">УЧАСТОК / А-01 <span>РАБОЧАЯ ЗОНА</span></div>
                <div className="site-drawing-label drawing-label-side">ПЛАН РАБОТ <i /></div>
                <div className="art-caption">ВИЗУАЛИЗАЦИЯ ПЛОЩАДКИ · НЕ ФОТО ОБЪЕКТА</div>
              </div>
              <div className="hero-shade" />
              <div className="hero-content">
                <div className="eyebrow"><span className="eyebrow-dot" /> ПОДРЯДНЫЕ РАБОТЫ · МОСКВА И МО <span className="eyebrow-line" /></div>
                <h1>Демонтаж.<br /><em>Дальше — по плану.</em></h1>
                <p className="hero-description">Демонтаж, подготовка помещений и отделка. Согласуем объём работ и последовательно ведём объект к следующему этапу.</p>
                <div className="hero-actions">
                  <button className="button-dark" onClick={() => jumpTo('estimate', 'Услуги')}>Подготовить расчёт <ArrowUpRight size={17} /></button>
                  <button className="button-ghost" onClick={() => jumpTo('services', 'Услуги')}>Все направления <ArrowDownRight size={16} /></button>
                </div>
              </div>
              <div className="hero-index"><span>ЛИСТ 01</span><i /> ОБЪЕКТ</div>
              <div className="hero-bottom-note"><span className="live-dot" /> ОТ ПОДГОТОВКИ ДО СДАЧИ ОБЪЕКТА</div>

              <article className="stat-card glass-card">
                <div className="card-kicker"><span className="tiny-star"><Wrench size={12} /></span> ОРГАНИЗАЦИЯ РАБОТ</div>
                <h2>Объём.<br />Смета.<br /><em>Результат.</em></h2>
                <p>Фиксируем состав работ, стоимость и последовательность до выхода на объект.</p>
                <div className="stat-bottom"><div><strong>01<span>/</span>03</strong><small>ЭТАПА ПРОЦЕССА</small></div><button className="round-arrow" aria-label="Подробнее о подходе" onClick={() => jumpTo('about', 'О компании')}><ArrowUpRight size={20} /></button></div>
                <div className="stat-orbit" aria-hidden="true" />
              </article>

              <article className="featured-card glass-card">
                <div className="featured-top"><span className="featured-label"><span className="live-dot" /> ФОКУС КОМАНДЫ</span><button className="round-arrow small" aria-label="Подготовить запрос" onClick={() => startRequest()}><ArrowUpRight size={17} /></button></div>
                <div className="featured-title">Объект под<br />контролем.</div>
                <p>Согласованный состав работ, понятная последовательность и одна точка связи по проекту.</p>
                <div className="feature-tags"><span><Check size={12} /> План работ</span><span><Check size={12} /> Контроль этапов</span><span><Check size={12} /> Одна команда</span></div>
                <div className="feature-divider" />
                <div className="featured-footer">
                  <button className="featured-link" onClick={() => jumpTo('services', 'Услуги')}>Направления <ArrowUpRight size={14} /></button>
                  <button className="featured-cta" onClick={() => startRequest()} aria-label="Обсудить объект">Обсудить <ArrowUpRight size={15} /></button>
                </div>
              </article>

              <div className="brand-orb" role="img" aria-label="СКОЛ"><span>С</span><i /></div>
              <div className="floating-label"><span className="floating-number">S.</span><span>СТРОИТЕЛЬНАЯ<br />КОМАНДА</span><ArrowUpRight size={15} /></div>
            </section>
          </div>
        </div>

        <div className="trust-strip" aria-label="Основные принципы работы">
          <div><span className="trust-number">01</span><span><b>Границы работ</b><small>Что делаем и что не входит</small></span></div>
          <div><span className="trust-number">02</span><span><b>Расчёт до старта</b><small>Исходные данные и условия</small></span></div>
          <div><span className="trust-number">03</span><span><b>Порядок на объекте</b><small>Последовательность этапов</small></span></div>
          <div><span className="trust-number">04</span><span><b>Связь по проекту</b><small>Договорённости и изменения</small></span></div>
        </div>

        <section className="lower-content" id="services">
          <div className="section-heading">
            <div><span className="section-kicker">НАПРАВЛЕНИЯ РАБОТ</span><h2>Виды работ<br /><em>на одном объекте.</em></h2></div>
            <p>Отдельные задачи или комплексный подряд. Состав работ согласуем после оценки состояния и условий площадки.</p>
          </div>
          <div className="service-grid">
            <button className="service-tile tile-large" onClick={() => startRequest('Демонтаж')}><span className="tile-index">01 / ОСНОВА</span><div className="tile-icon"><Layers3 size={21} /></div><h3>Демонтаж<br />и разборка</h3><p>Старая отделка, покрытия, стяжка и ненесущие перегородки по согласованным границам.</p><span className="tile-link">Обсудить задачу <ArrowUpRight size={16} /></span><div className="tile-lines" /></button>
            <button className="service-tile" onClick={() => startRequest('Подготовка помещений')}><span className="tile-index">02 / ПОДГОТОВКА</span><div className="tile-icon"><Wrench size={21} /></div><h3>Подготовка<br />помещений</h3><p>Освобождение рабочего участка и подготовка к следующему этапу.</p><span className="tile-link">Подготовить бриф <ArrowUpRight size={16} /></span></button>
            <button className="service-tile tile-accent" onClick={() => startRequest('Комплексные работы')}><span className="tile-index">03 / КОМПЛЕКС</span><div className="tile-icon"><Building2 size={21} /></div><h3>Комплексные<br />работы</h3><p>Несколько направлений в одном согласованном объёме с координацией этапов.</p><span className="tile-link">Обсудить объект <ArrowUpRight size={16} /></span></button>
          </div>
        </section>

        <section className="scope-section" id="scope">
          <div className="scope-heading">
            <span className="section-kicker">СОСТАВ РАБОТ</span>
            <h2>Разбираем задачу<br /><em>по существу.</em></h2>
            <p>Выберите интересующее направление — подготовим заявку с выбранной услугой и не придётся описывать её заново.</p>
          </div>
          <div className="scope-list">
            {detailedServices.map(item => (
              <article className="scope-row" key={item.number}>
                <span className="scope-number">{item.number}</span>
                <div className="scope-row-copy"><h3>{item.title}</h3><p>{item.text}</p><div className="scope-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
                <button className="scope-action" aria-label={`Запросить расчёт: ${item.title}`} onClick={() => startRequest(item.number === '01' || item.number === '02' ? 'Демонтаж' : item.number === '03' ? 'Подготовка помещений' : item.number === '04' ? 'Черновая отделка' : item.number === '05' ? 'Чистовая отделка' : 'Комплексные работы')}><ArrowUpRight size={18} /></button>
              </article>
            ))}
          </div>
        </section>

        <section className="estimate-section" id="estimate">
          <div className="estimate-intro">
            <span className="section-kicker">ПОДГОТОВКА К СМЕТЕ</span>
            <h2>Соберём вводные<br /><em>по объекту.</em></h2>
            <p>Это не автоматическая смета и не случайная цена за квадратный метр. Соберите исходные данные — они попадут в бриф для предметного расчёта.</p>
            <div className="estimate-notes">
              <div><Ruler size={17} /><span><b>Площадь и объём</b><small>Ориентир по масштабу работ</small></span></div>
              <div><Truck size={17} /><span><b>Доступ и вывоз</b><small>Факторы логистики и организации</small></span></div>
              <div><ShieldCheck size={17} /><span><b>Ограничения объекта</b><small>Условия, влияющие на последовательность</small></span></div>
            </div>
          </div>
          <form className="estimate-form" onSubmit={event => { event.preventDefault(); setBriefReady(false); setCopyStatus(''); jumpTo('contact', 'Контакты'); }}>
            <div className="estimate-form-head"><span>01 — ИСХОДНЫЕ ДАННЫЕ</span><FileText size={18} /></div>
            <label>Направление работ<select value={service} onChange={event => { setService(event.target.value); setBriefReady(false); setCopyStatus(''); }}>{serviceOptions.map(option => <option key={option}>{option}</option>)}</select></label>
            <div className="estimate-row">
              <label>Тип объекта<select value={objectType} onChange={event => { setObjectType(event.target.value); setBriefReady(false); setCopyStatus(''); }}>{['Коммерческий', 'Частный', 'Офис', 'Магазин', 'Промышленный'].map(option => <option key={option}>{option}</option>)}</select></label>
              <label>Площадь, м²<input inputMode="decimal" type="number" min="0" step="0.1" placeholder="Например, 250" value={area} onChange={event => { setArea(event.target.value); setBriefReady(false); setCopyStatus(''); }} /></label>
            </div>
            <label>Адрес или район<input placeholder="Москва, район / адрес объекта" value={location} onChange={event => { setLocation(event.target.value); setBriefReady(false); setCopyStatus(''); }} /></label>
            <div className="estimate-row">
              <label>Доступ на площадку<select value={access} onChange={event => { setAccess(event.target.value); setBriefReady(false); setCopyStatus(''); }}><option>Обычный доступ</option><option>Есть грузовой лифт</option><option>Без лифта / ручной вынос</option><option>Ограниченный доступ</option><option>Нужно обследование</option></select></label>
              <label>Вывоз отходов<select value={waste} onChange={event => { setWaste(event.target.value); setBriefReady(false); setCopyStatus(''); }}><option>Нужно обсудить</option><option>Нужен вывоз</option><option>Вывоз организован</option><option>Не требуется</option></select></label>
            </div>
            <label>Кратко о задаче<textarea value={query} onChange={event => setQuery(event.target.value)} placeholder="Что демонтировать или подготовить, этаж, сроки, особенности…" rows={3} /></label>
            <button className="button-dark estimate-submit" type="submit">Перенести данные в заявку <ArrowUpRight size={17} /></button>
            <p className="estimate-disclaimer">Расчёт стоимости выполняется после уточнения исходных данных. Эта форма только собирает вводные.</p>
          </form>
        </section>

        <section className="portfolio-section" id="projects">
          <div className="section-heading"><div><span className="section-kicker">ВЫБРАННЫЕ ТИПЫ ЗАДАЧ</span><h2>От демонтажа<br /><em>до подготовки.</em></h2></div><p>Иллюстрации временные. Они обозначают тип задачи, но не выдают себя за фотографии выполненных объектов.</p></div>
          <div className="portfolio-grid">
            <button className="portfolio-card" onClick={() => startRequest('Демонтаж')} aria-label="Подготовить заявку на демонтаж здания">
              <div className="portfolio-art portfolio-art-structure"><span className="portfolio-count">ТИП ЗАДАЧИ 01 / ДЕМОНТАЖ</span><div className="portfolio-scene structure-scene" aria-hidden="true"><i /><i /><i /><b /><b /><b /></div><span className="portfolio-placeholder">ИЛЛЮСТРАЦИЯ · НУЖНО ФОТО</span><span className="portfolio-art-arrow"><ArrowUpRight size={18} /></span></div>
              <div className="portfolio-meta"><div><span className="tile-index">КОММЕРЧЕСКИЙ ОБЪЕКТ</span><h3>Демонтаж здания</h3></div><span className="portfolio-size">500 м²*</span></div>
              <p>Освобождение пространства под следующий этап работ.</p><span className="portfolio-link">Обсудить похожую задачу <ArrowUpRight size={15} /></span>
            </button>
            <button className="portfolio-card" onClick={() => startRequest('Демонтаж')} aria-label="Подготовить заявку на демонтаж актового зала">
              <div className="portfolio-art portfolio-art-interior"><span className="portfolio-count">ТИП ЗАДАЧИ 02 / ПОМЕЩЕНИЕ</span><div className="portfolio-scene interior-scene" aria-hidden="true"><i /><i /><i /><b /></div><span className="portfolio-placeholder">ИЛЛЮСТРАЦИЯ · НУЖНО ФОТО</span><span className="portfolio-art-arrow"><ArrowUpRight size={18} /></span></div>
              <div className="portfolio-meta"><div><span className="tile-index">ОБЩЕСТВЕННОЕ ПРОСТРАНСТВО</span><h3>Демонтаж актового зала</h3></div></div>
              <p>Разборка элементов помещения и подготовка к следующему этапу.</p><span className="portfolio-link">Обсудить похожую задачу <ArrowUpRight size={15} /></span>
            </button>
            <button className="portfolio-card" onClick={() => startRequest('Фасадные работы')} aria-label="Подготовить заявку на фасадные работы">
              <div className="portfolio-art portfolio-art-facade"><span className="portfolio-count">ТИП ЗАДАЧИ 03 / ФАСАД</span><div className="portfolio-scene facade-scene" aria-hidden="true"><i /><i /><i /><i /><b /></div><span className="portfolio-placeholder">ИЛЛЮСТРАЦИЯ · НУЖНО ФОТО</span><span className="portfolio-art-arrow"><ArrowUpRight size={18} /></span></div>
              <div className="portfolio-meta"><div><span className="tile-index">ФАСАД И ОГРАЖДЕНИЯ</span><h3>Фасадные работы</h3></div></div>
              <p>Работы с фасадными элементами, окнами и ограждениями в согласованном объёме.</p><span className="portfolio-link">Обсудить похожую задачу <ArrowUpRight size={15} /></span>
            </button>
          </div>
          <p className="portfolio-footnote">* Площадь 500 м² относится к ранее обозначенному примеру демонтажа здания. Остальные детали кейсов требуют подтверждения и фотографий.</p>
        </section>

        <section className="projects-section" id="about">
          <div className="project-visual">
            <div className="project-visual-top"><span>ПОРЯДОК РАБОТ</span><span>01 — 04</span></div>
            <div className="blueprint"><div className="blueprint-room room-a" /><div className="blueprint-room room-b" /><div className="blueprint-room room-c" /><div className="blueprint-line" /><span className="blueprint-label">ОЦЕНКА → ПЛАН → РАБОТА</span></div>
            <div className="project-visual-bottom"><span>ПОСЛЕДОВАТЕЛЬНОСТЬ</span><span>От вводных к сдаче этапа</span></div>
          </div>
          <div className="project-copy"><span className="section-kicker">ПОРЯДОК НА ПЛОЩАДКЕ</span><h2>Работа по этапам.<br /><em>Без хаоса.</em></h2><p>Перед началом определяем границы демонтажа, условия доступа, последовательность работ и порядок взаимодействия на объекте.</p><div className="process-list"><div><span>01</span><p><b>Разбираемся</b><small>Задача, ограничения, условия объекта</small></p><ArrowUpRight size={15} /></div><div><span>02</span><p><b>Планируем</b><small>Объём, этапы, организация работ</small></p><ArrowUpRight size={15} /></div><div><span>03</span><p><b>Выполняем</b><small>Координация и связь по ходу проекта</small></p><ArrowUpRight size={15} /></div></div><button className="button-dark about-cta" onClick={() => jumpTo('estimate', 'Услуги')}>Подготовить исходные данные <ArrowUpRight size={16} /></button></div>
        </section>

        <section className="faq-section" id="faq">
          <div className="faq-intro"><span className="section-kicker">ВОПРОСЫ ПО ОБЪЕКТУ</span><h2>До начала работ<br /><em>лучше уточнить.</em></h2><p>Чем точнее исходные данные, тем предметнее можно обсудить объём, логистику и последовательность.</p><button className="faq-contact" onClick={() => startRequest()}>Задать вопрос по объекту <ArrowUpRight size={16} /></button></div>
          <div className="faq-list">{faqs.map((item, index) => <details className="faq-item" key={item.question}><summary><span>{String(index + 1).padStart(2, '0')}</span><b>{item.question}</b><ChevronDown size={17} /></summary><p>{item.answer}</p></details>)}</div>
        </section>

        <section className="contact-section" id="contact">
          <div><span className="section-kicker">ЗАПРОСИТЬ РАСЧЁТ</span><h2>Расскажите<br /><em>об объекте.</em></h2><p>Заполните известные данные. Мы подготовим из них компактный бриф, который можно скопировать или скачать и отправить удобным способом.</p>
            <div className="contact-facts"><div><MapPin size={15} /><span>Москва и Московская область</span></div><div><CalendarClock size={15} /><span>Сроки обсуждаются по объекту</span></div><div><ShieldCheck size={15} /><span>Состав работ согласуется до старта</span></div></div>
          </div>
          <form className="contact-form" onSubmit={submitBrief}>
            <div className="contact-form-head"><span>ДАННЫЕ ДЛЯ БРИФА</span><Clipboard size={17} /></div>
            <label>Что нужно сделать?<input value={query} onChange={event => { setQuery(event.target.value); setBriefReady(false); setCopyStatus(''); }} placeholder="Например, демонтаж офиса" required /></label>
            <div className="form-row"><label>Как к вам обращаться?<input value={name} onChange={event => { setName(event.target.value); setBriefReady(false); setCopyStatus(''); }} placeholder="Ваше имя" required /></label><label>Телефон или Telegram<input value={phone} onChange={event => { setPhone(event.target.value); setBriefReady(false); setCopyStatus(''); }} placeholder="+7 / @username" required /></label></div>
            <div className="form-row"><label>Адрес / район<input value={location} onChange={event => { setLocation(event.target.value); setBriefReady(false); setCopyStatus(''); }} placeholder="Город, район" /></label><label>Площадь, м²<input value={area} onChange={event => { setArea(event.target.value); setBriefReady(false); setCopyStatus(''); }} inputMode="decimal" type="number" min="0" step="0.1" placeholder="Если известна" /></label></div>
            <label>Дополнительные сведения<textarea value={details} onChange={event => { setDetails(event.target.value); setBriefReady(false); setCopyStatus(''); }} placeholder="Сроки, этаж, доступ, особенности конструкций…" rows={3} /></label>
            <div className="contact-summary"><span>В бриф войдут</span><b>{service}</b><b>{objectType}</b><b>{budget}</b></div>
            <button className="button-dark form-submit" type="submit">{briefReady ? 'Обновить бриф' : 'Подготовить бриф'} <ArrowUpRight size={17} /></button>
            {briefReady && <div className="brief-ready" role="status"><div className="brief-ready-title"><Check size={16} /> Бриф подготовлен на этом устройстве</div><p>Данные никуда не отправлены автоматически. Скопируйте текст или скачайте файл, затем передайте его по согласованному каналу связи.</p><div className="brief-actions"><button type="button" className="brief-secondary" onClick={() => void copyBrief()}><Clipboard size={15} /> Скопировать</button><button type="button" className="brief-secondary" onClick={downloadBrief}><Download size={15} /> Скачать TXT</button></div>{copyStatus && <span className="copy-status">{copyStatus}</span>}</div>}
          </form>
        </section>

        <footer className="footer"><button className="footer-brand" onClick={() => jumpTo('top', 'Главная')}>СКОЛ<span>®</span></button><span>ДЕМОНТАЖ · ПОДГОТОВКА · ОТДЕЛКА</span><button onClick={() => jumpTo('contact', 'Контакты')}>Связаться <ArrowUpRight size={14} /></button><button onClick={() => jumpTo('faq')}>Вопросы <ArrowUpRight size={14} /></button><span>© 2026</span></footer>
      </section>

      {showContact && <div className="modal-backdrop" onClick={() => setShowContact(false)}><div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={event => event.stopPropagation()}><button className="modal-close" onClick={() => setShowContact(false)} aria-label="Закрыть"><X size={19} /></button><span className="section-kicker">ОБСУДИМ ОБЪЕКТ</span><h2 id="modal-title">С чего начнём?</h2><p>Выбрано направление: <b>{service}</b>. Тип объекта — <b>{objectType.toLowerCase()}</b>, ориентир бюджета — <b>{budget.toLowerCase()}</b>.</p><p className="modal-note">Можно перейти к форме, дополнить сведения и подготовить бриф. Он не отправляется автоматически.</p><button className="button-dark modal-action" onClick={() => { setShowContact(false); jumpTo('contact', 'Контакты'); }}>Перейти к форме <ArrowUpRight size={17} /></button></div></div>}
    </main>
  );
}

export default App;
