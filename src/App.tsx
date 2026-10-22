import { useState, type FormEvent } from 'react';
import {
  ArrowDownRight, ArrowUpRight, Bell, Bookmark, Building2, Check, ChevronDown,
  CircleHelp, Compass, Grid2X2, Heart, House, Layers3, MapPin, Moon,
  Share2, Sparkles, Sun, Wrench, X
} from 'lucide-react';

const navItems = [
  { label: 'Главная', icon: House },
  { label: 'Проекты', icon: Grid2X2 },
  { label: 'Услуги', icon: Layers3 },
  { label: 'О компании', icon: Compass },
  { label: 'Контакты', icon: CircleHelp },
];

function App() {
  const [dark, setDark] = useState(false);
  const [activeNav, setActiveNav] = useState('Главная');
  const [service, setService] = useState('Комплексные работы');
  const [objectType, setObjectType] = useState('Коммерческий');
  const [budget, setBudget] = useState('От 1 млн ₽');
  const [query, setQuery] = useState('');
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [sent, setSent] = useState(false);

  const jumpTo = (id: string, label?: string) => {
    if (label) setActiveNav(label);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className={dark ? 'app dark' : 'app'}>
      <div className="metal-grain" aria-hidden="true" />
      <section className="frame" id="top">
        <div className="frame-glow" aria-hidden="true" />
        <div className="workspace">
        <aside className="sidebar">
          <button className="brand-mark" aria-label="СКОЛ — наверх" onClick={() => jumpTo('top', 'Главная')}><Sparkles size={23} strokeWidth={1.5} /></button>
          <nav className="side-nav" aria-label="Основная навигация">
            {navItems.map(({ label, icon: Icon }) => (
              <button key={label} className={activeNav === label ? 'nav-icon active' : 'nav-icon'} title={label} aria-label={label} onClick={() => jumpTo(label === 'Контакты' ? 'contact' : label === 'Проекты' ? 'projects' : label === 'Услуги' ? 'services' : label === 'О компании' ? 'about' : 'top', label)}>
                <Icon size={18} strokeWidth={1.6} />
              </button>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="avatar" aria-label="Команда СКОЛ">С</div>
            <button className="nav-icon" aria-label="Уведомления"><Bell size={17} /></button>
            <button className="nav-icon" aria-label="Настройки темы" onClick={() => setDark(!dark)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          </div>
          <button className="sidebar-toggle" aria-label="Свернуть панель" onClick={() => document.querySelector('.sidebar')?.classList.toggle('compact')}><ArrowUpRight size={15} /></button>
        </aside>

        <div className="dashboard">
          <header className="topbar">
            <button className="top-pill top-pill-primary" onClick={() => jumpTo('services', 'Услуги')}><span className="pill-spark"><Sparkles size={13} /></span>Наши услуги <ArrowUpRight size={14} /></button>
            <div className="filters">
              <label className="filter-field"><span><MapPin size={11} /> Направление</span><select value={service} onChange={e => setService(e.target.value)}><option>Комплексные работы</option><option>Демонтаж</option><option>Подготовка помещений</option><option>Отделка</option></select><ChevronDown size={13} /></label>
              <label className="filter-field"><span><Building2 size={11} /> Тип объекта</span><select value={objectType} onChange={e => setObjectType(e.target.value)}><option>Коммерческий</option><option>Частный</option><option>Офис</option><option>Ритейл</option><option>Промышленный</option></select><ChevronDown size={13} /></label>
              <label className="filter-field"><span><Wrench size={11} /> Бюджет проекта</span><select value={budget} onChange={e => setBudget(e.target.value)}><option>От 1 млн ₽</option><option>До 300 тыс. ₽</option><option>300 тыс. — 1 млн ₽</option><option>От 3 млн ₽</option><option>Обсудим</option></select><ChevronDown size={13} /></label>
            </div>
            <button className="top-pill top-pill-outline" onClick={() => setShowContact(true)}>Обсудить объект <ArrowUpRight size={14} /></button>
          </header>

          <section className="hero" aria-label="СКОЛ — строительные работы">
            <div className="hero-art" aria-hidden="true">
              <div className="sky-orb orb-one" /><div className="sky-orb orb-two" />
              <div className="architecture">
                <div className="building-back"><div className="window-grid" /></div>
                <div className="building-front"><div className="glass-wall" /><div className="warm-light" /></div>
                <div className="architecture-rib rib-one" /><div className="architecture-rib rib-two" />
                <div className="ground-line" />
              </div>
              <div className="art-caption">АРХИТЕКТУРА · ПРОСТРАНСТВО · ТОЧНОСТЬ</div>
            </div>
            <div className="hero-shade" />
            <div className="hero-content">
              <div className="eyebrow"><span className="eyebrow-dot" /> МОСКВА И МОСКОВСКАЯ ОБЛАСТЬ <span className="eyebrow-line" /></div>
              <h1>Пространство<br /><em>с чистого листа.</em></h1>
              <p className="hero-description">Демонтаж, подготовка и комплексные работы.<br />Берём на себя сложное — доводим до готовности.</p>
              <div className="hero-actions">
                <button className="button-dark" onClick={() => jumpTo('services', 'Услуги')}>Изучить направления <ArrowUpRight size={17} /></button>
                <button className="button-ghost" onClick={() => jumpTo('projects', 'Проекты')}>Наш подход <ArrowDownRight size={16} /></button>
              </div>
            </div>
            <div className="hero-index"><span>01</span><i /> 04</div>
            <div className="hero-bottom-note"><span className="live-dot" /> ОТ ПОДГОТОВКИ ДО СДАЧИ ОБЪЕКТА</div>
          </section>

          <article className="stat-card glass-card">
            <div className="card-kicker"><span className="tiny-star"><Sparkles size={12} /></span> ПОДХОД СКОЛ</div>
            <h2>Сначала<br />ясность. Потом<br /><em>результат.</em></h2>
            <p>Понятный объём работ, согласованные этапы и одна точка ответственности.</p>
            <div className="stat-bottom"><div><strong>01<span>/</span>04</strong><small>ЭТАПА РАБОТЫ</small></div><button className="round-arrow" aria-label="Подробнее о подходе" onClick={() => jumpTo('about', 'О компании')}><ArrowUpRight size={20} /></button></div>
            <div className="stat-orbit" aria-hidden="true" />
          </article>

          <article className="featured-card glass-card">
            <div className="featured-top"><span className="featured-label"><span className="live-dot" /> ФОКУС КОМАНДЫ</span><button className="round-arrow small" aria-label="Обсудить проект" onClick={() => setShowContact(true)}><ArrowUpRight size={17} /></button></div>
            <div className="featured-title">Подготовка<br />пространства</div>
            <p>Освобождаем объект от лишнего и готовим надёжную основу для следующего этапа.</p>
            <div className="feature-tags"><span><Check size={12} /> План работ</span><span><Check size={12} /> Контроль этапов</span><span><Check size={12} /> Одна команда</span></div>
            <div className="feature-divider" />
            <div className="featured-actions">
              <button className={liked ? 'action-button selected' : 'action-button'} onClick={() => setLiked(!liked)} aria-label="Отметить нравится"><Heart size={15} fill={liked ? 'currentColor' : 'none'} /><span>{liked ? '13' : '12'}</span></button>
              <button className={saved ? 'action-button selected' : 'action-button'} onClick={() => setSaved(!saved)} aria-label="Сохранить"><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /><span>{saved ? '29' : '28'}</span></button>
              <button className="action-button share-button" onClick={() => navigator.clipboard?.writeText(window.location.href)} aria-label="Скопировать ссылку"><Share2 size={15} /><span>Поделиться</span></button>
            </div>
          </article>

          <div className="brand-orb" aria-label="СКОЛ"><span>С</span><i /></div>
          <div className="floating-label"><span className="floating-number">S.</span><span>СТРОИТЕЛЬНАЯ<br />КОМАНДА</span><ArrowUpRight size={15} /></div>
        </div>
        </div>

        <section className="lower-content" id="services">
          <div className="section-heading"><div><span className="section-kicker">ЧЕМ МЫ ПОЛЕЗНЫ</span><h2>Работы без<br /><em>лишних неизвестных.</em></h2></div><p>Выбираем решение под объект, а не подгоняем объект под шаблон.</p></div>
          <div className="service-grid">
            <button className="service-tile tile-large" onClick={() => { setService('Демонтаж'); setShowContact(true); }}><span className="tile-index">01 / ОСНОВА</span><div className="tile-icon"><Layers3 size={21} /></div><h3>Демонтаж<br />и разборка</h3><p>Аккуратно освобождаем пространство и учитываем особенности объекта.</p><span className="tile-link">Обсудить задачу <ArrowUpRight size={16} /></span><div className="tile-lines" /></button>
            <button className="service-tile" onClick={() => { setService('Подготовка помещений'); setShowContact(true); }}><span className="tile-index">02 / ПОДГОТОВКА</span><div className="tile-icon"><Wrench size={21} /></div><h3>Подготовка<br />помещений</h3><p>Подготавливаем площадку к следующему этапу работ.</p><span className="tile-link">Подробнее <ArrowUpRight size={16} /></span></button>
            <button className="service-tile tile-accent" onClick={() => { setService('Комплексные работы'); setShowContact(true); }}><span className="tile-index">03 / ПОД КЛЮЧ</span><div className="tile-icon"><Building2 size={21} /></div><h3>Комплексные<br />работы</h3><p>Координируем несколько направлений в рамках одного проекта.</p><span className="tile-link">Обсудить объект <ArrowUpRight size={16} /></span></button>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="project-visual">
            <div className="project-visual-top"><span>ПРИНЦИП РАБОТЫ</span><span>№ 001—004</span></div>
            <div className="blueprint"><div className="blueprint-room room-a" /><div className="blueprint-room room-b" /><div className="blueprint-room room-c" /><div className="blueprint-line" /><span className="blueprint-label">ПЛАН → РЕАЛИЗАЦИЯ</span></div>
            <div className="project-visual-bottom"><span>01 — 04</span><span>Чёткая последовательность вместо хаоса</span></div>
          </div>
          <div className="project-copy" id="about"><span className="section-kicker">КАК МЫ РАБОТАЕМ</span><h2>Не просто<br />выполнить.<br /><em>Организовать.</em></h2><p>Сложный объект требует не только рабочих рук. Нужны последовательность, коммуникация и контроль того, что происходит на площадке.</p><div className="process-list"><div><span>01</span><p><b>Разбираемся</b><small>Задача, ограничения, условия объекта</small></p><ArrowUpRight size={15} /></div><div><span>02</span><p><b>Планируем</b><small>Объём, этапы, организация работ</small></p><ArrowUpRight size={15} /></div><div><span>03</span><p><b>Выполняем</b><small>Координация и связь по ходу проекта</small></p><ArrowUpRight size={15} /></div></div></div>
        </section>

        <section className="contact-section" id="contact">
          <div><span className="section-kicker">ЕСТЬ ОБЪЕКТ?</span><h2>Давайте обсудим<br /><em>задачу по делу.</em></h2><p>Расскажите, что нужно сделать. Уточним вводные и предложим следующий шаг.</p></div>
          <form className="contact-form" onSubmit={submitBrief}>
            <label>Что нужно сделать?<input value={query} onChange={e => setQuery(e.target.value)} placeholder="Например, демонтаж офиса" required /></label>
            <div className="form-row"><label>Как к вам обращаться?<input placeholder="Ваше имя" required /></label><label>Телефон или Telegram<input placeholder="+7 / @username" required /></label></div>
            <button className="button-dark form-submit" type="submit">{sent ? 'Заявка подготовлена' : 'Обсудить объект'} {sent ? <Check size={17} /> : <ArrowUpRight size={17} />}</button>
            {sent && <span className="form-success">Демо-форма работает локально. Подключение отправки заявки нужно настроить перед публикацией.</span>}
          </form>
        </section>

        <footer className="footer"><button className="footer-brand" onClick={() => jumpTo('top', 'Главная')}>СКОЛ<span>®</span></button><span>ДЕМОНТАЖ · ПОДГОТОВКА · КОМПЛЕКСНЫЕ РАБОТЫ</span><button onClick={() => setShowContact(true)}>Связаться <ArrowUpRight size={14} /></button><span>© 2026</span></footer>
      </section>

      {showContact && <div className="modal-backdrop" onClick={() => setShowContact(false)}><div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowContact(false)} aria-label="Закрыть"><X size={19} /></button><span className="section-kicker">ОБСУДИМ ОБЪЕКТ</span><h2 id="modal-title">С чего начнём?</h2><p>Уже выбрано направление: <b>{service}</b>. Тип объекта — <b>{objectType.toLowerCase()}</b>, ориентир бюджета — <b>{budget.toLowerCase()}</b>.</p><button className="button-dark modal-action" onClick={() => { setShowContact(false); jumpTo('contact'); }}>Перейти к форме <ArrowUpRight size={17} /></button><small>Форма демонстрационная: отправка данных пока не подключена.</small></div></div>}
    </main>
  );
}

export default App;
