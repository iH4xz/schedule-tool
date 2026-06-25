/* global PAGE_SETTINGS */
(function(){
  const state = {
    schedule: [],
    filtered: [],
    selectedKeys: new Set(),
    catalog: {},
    sessions: {},
    searchTimeout: null,
    currentLang: 'ar'
  };

  const els = {
    title: document.querySelector('h1'),
    subtitle: document.getElementById('subtitle'),
    search: document.getElementById('search'),
    langSelect: document.getElementById('langSelect'),
    viewToggle: document.getElementById('viewToggle'),
    table: document.getElementById('table'),
    levelFilter: document.getElementById('levelFilter'),
    categoryFilter: document.getElementById('categoryFilter'),
    concentrationFilter: document.getElementById('concentrationFilter'),
    list: document.getElementById('list'),
    copyBtn: document.getElementById('copyBtn'),
    pdfBtn: document.getElementById('pdfBtn'),
    pdfClientBtn: document.getElementById('pdfClientBtn'),
    saveBtn: document.getElementById('saveBtn'),
    loadBtn: document.getElementById('loadBtn'),
    showMineBtn: document.getElementById('showMineBtn'),
    footerLink: document.querySelector('footer a'),
    headerToggle: document.getElementById('headerToggle'),
    headerControls: document.getElementById('headerControls'),
    header: document.querySelector('header')
  };
  

  // Language translations
  const translations = {
    ar: {
      title: 'أداة جداول الاختبارات',
      subtitle: 'جدول اختبارات منتصف الفصل - كلية إدارة الأعمال - أكتوبر 2025',
      searchPlaceholder: 'ابحث عن مقرر أو رمز',
      levelAll: 'كل المستويات',
      categoryAll: 'كل التصنيفات',
      copyBtn: 'نسخ الجدول كنص',
      pdfBtn: 'إستخراج كـ PDF',
      pdfClientBtn: 'تنزيل PDF (عميل)',
      saveBtn: 'حفظ في المتصفح',
      loadBtn: 'استرجاع من المتصفح',
      showMineBtn: 'عرض جدولي',
      showAllBtn: 'عرض الكل',
      fullScheduleBtn: '📅 الجدول الكامل',
      reportBtn: 'إبلاغ عن تعديل',
      viewToggleLabel: 'بطاقات / جدول',
      program: 'تخصص هذه المقررات ضمن برنامج إدارة الأعمال (Management). للمعلومات:',
      programLink: 'رابط البرنامج',
      footerText: 'Built by SHJRH SERVICES',
      searchAriaLabel: 'بحث حي',
      levelFilterAriaLabel: 'تصفية حسب المستوى',
      categoryFilterAriaLabel: 'تصفية حسب التصنيف',
      days: {
        'Thursday': 'الخميس',
        'Sunday': 'الأحد', 
        'Monday': 'الاثنين',
        'Tuesday': 'الثلاثاء',
        'Wednesday': 'الأربعاء'
      },
      labels: {
        code: 'رمز',
        day: 'اليوم',
        date: 'التاريخ',
        time: 'الوقت',
        level: 'المستوى',
        category: 'التصنيف',
        concentration: 'مادة تركيز',
        chapters: 'عدد الفصول',
        chapter: 'الفصل',
        notes: 'ملاحظات',
        completed: 'تم الإنجاز',
        select: 'اختيار/إلغاء',
        course: 'المقرر',
        chapterNum: 'رقم الفصل'
      },
      messages: {
        noSubjects: 'لم يتم اختيار مقررات',
        copySuccess: 'تم النسخ بنجاح ✓',
        saveSuccess: 'تم الحفظ',
        loadSuccess: 'تم الاسترجاع',
        loadError: 'حدث خطأ في الاسترجاع',
        showingMine: 'عرض الجدول المحفوظ',
        showingAll: 'عرض جميع المقررات',
        noStored: 'لا توجد عناصر محفوظة',
        loadStoredError: 'تعذر تحميل الجدول المحفوظ',
        chapters: 'الفصول'
      },
      concentrations: {
        BUS_ADMIN: 'تركيز (إدارة الأعمال) - برنامج إدارة الأعمال',
        ACCOUNTING: 'تركيز (محاسبة) - برنامج إدارة الأعمال',
        E_COMMERCE: 'تركيز (تجارة إلكترونية) - برنامج إدارة الأعمال',
        FINANCE: 'تركيز (مالية) - برنامج إدارة الأعمال',
        BUS_ADMIN_OTHER: 'تركيز (إدارة الأعمال) - لبرامج أخرى'
      },
      concentrationAll: 'كل التركيزات'
    },
    en: {
      title: 'Exam Schedule Tool',
      subtitle: 'Midterm Exam Schedule - Business Administration College - October 2025',
      searchPlaceholder: 'Search for course or code',
      levelAll: 'All Levels',
      categoryAll: 'All Categories',
      copyBtn: 'Copy as Text',
      pdfBtn: 'Export as PDF',
      pdfClientBtn: 'Download PDF (Client)',
      saveBtn: 'Save to Browser',
      loadBtn: 'Load from Browser',
      showMineBtn: 'Show My Schedule',
      showAllBtn: 'Show All',
      fullScheduleBtn: '📅 Full Schedule',
      reportBtn: 'Report Issue',
      viewToggleLabel: 'Cards / Table',
      program: 'These courses are part of the Business Administration (Management) program. For information:',
      programLink: 'Program Link',
      footerText: 'Built by SHJRH SERVICES',
      searchAriaLabel: 'Live search',
      levelFilterAriaLabel: 'Filter by level',
      categoryFilterAriaLabel: 'Filter by category',
      days: {
        'Thursday': 'Thursday',
        'Sunday': 'Sunday',
        'Monday': 'Monday', 
        'Tuesday': 'Tuesday',
        'Wednesday': 'Wednesday'
      },
      labels: {
        code: 'Code',
        day: 'Day',
        date: 'Date',
        time: 'Time',
        level: 'Level',
        category: 'Category',
        concentration: 'Concentration',
        chapters: 'Chapters Count',
        chapter: 'Chapter',
        notes: 'Notes',
        completed: 'Completed',
        select: 'Select/Deselect',
        course: 'Course',
        chapterNum: 'Chapter #'
      },
      messages: {
        noSubjects: 'No subjects selected',
        copySuccess: 'Copied successfully ✓',
        saveSuccess: 'Saved',
        loadSuccess: 'Loaded',
        loadError: 'Load error occurred',
        showingMine: 'Showing saved schedule',
        showingAll: 'Showing all courses',
        noStored: 'No stored items',
        loadStoredError: 'Failed to load saved schedule',
        chapters: 'Chapters'
      },
      concentrations: {
        BUS_ADMIN: 'Concentration (Business Administration) - Business Administration Program',
        ACCOUNTING: 'Concentration (Accounting) - Business Administration Program',
        E_COMMERCE: 'Concentration (E-Commerce) - Business Administration Program',
        FINANCE: 'Concentration (Finance) - Business Administration Program',
        BUS_ADMIN_OTHER: 'Concentration (Business Administration) - for other programs'
      },
      concentrationAll: 'All Concentrations'
    }
  };

  function getTranslation(key, lang = state.currentLang) {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }

  function applySettings(){
    const ui = PAGE_SETTINGS.ui;
    const t = translations[state.currentLang];
    
    els.title.textContent = t.title;
    if (els.subtitle) els.subtitle.textContent = t.subtitle;
    els.search.placeholder = t.searchPlaceholder;

    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) pageTitle.textContent = t.title;
    document.title = t.title;

    // Update button texts
    if (els.copyBtn) els.copyBtn.textContent = t.copyBtn;
    if (els.pdfBtn) els.pdfBtn.textContent = t.pdfBtn;
    if (els.pdfClientBtn) els.pdfClientBtn.textContent = t.pdfClientBtn;
    if (els.saveBtn) els.saveBtn.textContent = t.saveBtn;
    if (els.loadBtn) els.loadBtn.textContent = t.loadBtn;
    if (els.showMineBtn) els.showMineBtn.textContent = t.showMineBtn;
    if (els.fullScheduleBtn) els.fullScheduleBtn.textContent = t.fullScheduleBtn;
    if (els.reportBtn) els.reportBtn.textContent = t.reportBtn;
    
    // Update view toggle label
    const viewToggleLabel = document.getElementById('viewToggleLabel');
    if (viewToggleLabel) viewToggleLabel.textContent = t.viewToggleLabel;
    
    // Update aria-labels
    if (els.search) els.search.setAttribute('aria-label', t.searchAriaLabel);
    if (els.levelFilter) els.levelFilter.setAttribute('aria-label', t.levelFilterAriaLabel);
    if (els.categoryFilter) els.categoryFilter.setAttribute('aria-label', t.categoryFilterAriaLabel);
    if (els.concentrationFilter) els.concentrationFilter.setAttribute('aria-label', t.labels.concentration);

    // Update program text
    const programEl = document.querySelector('.program');
    if (programEl) {
      programEl.innerHTML = `${t.program} <a href="https://seu.edu.sa/afsc/en/bachelor-programs/business-administration/" target="_blank" rel="noopener">${t.programLink}</a>.`;
    }

    // footer
    const f = PAGE_SETTINGS.footer;
    els.footerLink.textContent = t.footerText;
    els.footerLink.href = f.href;

    // categories
    const catSel = els.categoryFilter;
    const existing = new Set(Array.from(catSel.options).map(o=>o.value));
    PAGE_SETTINGS.menu.categories.forEach(cat => {
      if(!existing.has(cat)){
        const o = document.createElement('option');
        o.value = cat; o.textContent = cat; catSel.appendChild(o);
      }
    });

    // concentrations - populate based on current schedule data (after loadData this will be called again)
    if (els.concentrationFilter) {
      const concSel = els.concentrationFilter;
      const currentValue = concSel.value;
      concSel.innerHTML = '';
      const optAll = document.createElement('option');
      optAll.value = '';
      optAll.textContent = t.concentrationAll;
      concSel.appendChild(optAll);
      const keys = Array.from(new Set((state.schedule||[]).map(x=>x.concentration).filter(Boolean))).sort();
      keys.forEach(k => {
        const o = document.createElement('option');
        o.value = k;
        o.textContent = translations[state.currentLang].concentrations?.[k] || k;
        concSel.appendChild(o);
      });
      // try restore previous selection if still present
      if (currentValue && Array.from(concSel.options).some(o=>o.value===currentValue)) concSel.value = currentValue;
    }
  }

  function initializeLanguage(){
    // Check for initial language from PHP
    const initialLang = window.INITIAL_LANG;
    if(initialLang && (initialLang === 'ar' || initialLang === 'en')){
      state.currentLang = initialLang;
      localStorage.setItem('seuSchedule:language', initialLang);
    } else {
      // Check for saved language preference
      const savedLang = localStorage.getItem('seuSchedule:language');
      if(savedLang && (savedLang === 'ar' || savedLang === 'en')){
        state.currentLang = savedLang;
      } else {
        // Detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if(browserLang.startsWith('ar')){
          state.currentLang = 'ar';
        } else {
          state.currentLang = 'en';
        }
        // Save detected language
        localStorage.setItem('seuSchedule:language', state.currentLang);
      }
    }
    
    // Set language select value
    if(els.langSelect){
      els.langSelect.value = state.currentLang;
    }
  }

  function changeLanguage(newLang){
    state.currentLang = newLang;
    localStorage.setItem('seuSchedule:language', newLang);
    
    // Redirect to PHP version with new language
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set('lang', newLang);
    window.location.href = currentUrl.toString();
  }

  async function loadData(){
    // Initialize language first
    initializeLanguage();
    
    // settings
    const CB = Date.now();
    try {
      const sRes = await fetch(`./data/settings.json?cb=${CB}`, { cache: 'no-store' });
      window.PAGE_SETTINGS = await sRes.json();
    } catch {
      window.PAGE_SETTINGS = {
        ui: {
          title: 'أداة جداول الاختبارات',
          searchPlaceholder: 'ابحث عن مقرر أو رمز',
          levelAll: 'كل المستويات',
          categoryAll: 'كل التصنيفات',
          copyBtn: 'نسخ الجدول كنص',
          pdfBtn: 'تنزيل PDF A4 (أبيض وأسود)',
          saveBtn: 'حفظ في المتصفح',
          loadBtn: 'استرجاع من المتصفح'
        },
        footer: {
          text: 'Built by SHJRH SERVICES',
          href: 'https://shjrh.sa'
        },
        menu: {
          categories: ['MGT','FIN','STAT','ACC','MIS','ECON','ECOM','IT','LAW','COMM']
        }
      };
    }
    applySettings();

    // catalog
    try {
      const cRes = await fetch(`./data/catalog.json?cb=${CB}`, { cache: 'no-store' });
      state.catalog = await cRes.json();
    } catch {
      state.catalog = {};
    }

    // sessions map
    try {
      const sessRes = await fetch(`./data/sessions.json?cb=${CB}`, { cache: 'no-store' });
      state.sessions = await sessRes.json();
    } catch {
      state.sessions = {
        S1: { name: 'First Session', time: '4:00 PM – 5:00 PM' },
        S2: { name: 'Second Session', time: '5:30 PM – 6:30 PM' },
        S3: { name: 'Third Session', time: '7:00 PM – 8:00 PM' },
        S4: { name: 'Fourth Session', time: '8:30 PM – 9:30 PM' }
      };
    }

    const res = await fetch(`./data/schedule.json?cb=${CB}`, { cache: 'no-store' });
    const schedule = await res.json();
    state.schedule = normalizeWithCatalog(addSessionCodes(schedule));
    populateLevels(state.schedule);
    // Populate concentrations after schedule is ready
    applySettings();
    filterRender();
  }

  function addSessionCodes(items){
    // map known times to session codes
    const timeToSession = {};
    for(const [code, meta] of Object.entries(state.sessions || {})){
      if(meta && meta.time){ timeToSession[String(meta.time).trim()] = code; }
    }
    return items.map(it => {
      const t = String(it.time || '').trim();
      const session = timeToSession[t] || it.session || '';
      // derive day from date if missing
      const day = it.day || deriveDayFromDate(it.date);
      return { ...it, session, day };
    });
  }

  function deriveDayFromDate(dateStr){
    try{
      if(!dateStr) return '';
      // Strict D/M/YYYY or DD/MM/YYYY parsing in UTC to avoid TZ drift
      const parts = String(dateStr).split('/').map(s=>s.trim());
      if(parts.length !== 3) return '';
      const [d, m, y] = parts;
      const dayNum = Number(d), monthNum = Number(m), yearNum = Number(y);
      if(!dayNum || !monthNum || !yearNum) return '';
      const dt = new Date(Date.UTC(yearNum, monthNum - 1, dayNum));
      if(isNaN(dt)) return '';
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      return days[dt.getUTCDay()] || '';
    }catch{}
    return '';
  }

  function normalizeWithCatalog(items){
    return items.map(it => {
      const originalCode = String(it.code || '');
      const catalogKey = originalCode.toUpperCase().replace(/\s+/g,'');
      const entry = state.catalog[catalogKey] || {};
      const subject = entry.name || it.subject || '';
      const level = (entry.level != null ? String(entry.level) : String(it.level || ''));
      const category = entry.category || inferCategoryFromCode(originalCode);
      const day = it.day || deriveDayFromDate(it.date);
      const concentration = entry.concentration || deriveConcentrationFromCode(catalogKey);
      return {
        // keep minimal schedule fields and enrich from catalog
        code: originalCode,
        date: it.date,
        session: it.session || it.sessionCode || '',
        day,
        subject,
        level,
        category,
        concentration
      };
    });
  }

  // Map course codes to concentration keys
  const concentrationMap = {
    // Business Administration - BA program
    MGT325: 'BUS_ADMIN', MGT424: 'BUS_ADMIN', MGT425: 'BUS_ADMIN',
    // Accounting - BA program
    ACCT201: 'ACCOUNTING', ACCT422: 'ACCOUNTING', ACCT402: 'ACCOUNTING',
    // E-Commerce - BA program
    ECOM301: 'E_COMMERCE', IT404: 'E_COMMERCE', ECOM421: 'E_COMMERCE',
    // Finance - BA program
    FIN201: 'FINANCE', FIN401: 'FINANCE', FIN402: 'FINANCE',
    // Business Administration - for other programs
    MGT312: 'BUS_ADMIN_OTHER', MGT402: 'BUS_ADMIN_OTHER', MGT323: 'BUS_ADMIN_OTHER'
  };

  function deriveConcentrationFromCode(code){
    const key = String(code||'').toUpperCase().replace(/\s+/g,'');
    return concentrationMap[key] || '';
  }

  function inferCategoryFromCode(code){
    if(!code) return '';
    const m = String(code).toUpperCase().match(/^[A-Z]+/);
    return m ? m[0] : '';
  }

  function populateLevels(items){
    const levels = Array.from(new Set(items.map(x => String(x.level || '').trim()).filter(Boolean))).sort((a,b)=>Number(a)-Number(b));
    const sel = els.levelFilter;
    // reset to first option
    sel.innerHTML = '';
    const optAll = document.createElement('option');
    optAll.value = ''; optAll.textContent = getTranslation('levelAll'); sel.appendChild(optAll);
    levels.forEach(l => {
      const o = document.createElement('option'); 
      o.value = l; 
      o.textContent = `${getTranslation('labels.level')} ${l}`; 
      sel.appendChild(o);
    });
  }

  function filterRender(){
    const q = (els.search.value || '').toLowerCase().trim();
    const level = els.levelFilter.value;
    const cat = els.categoryFilter.value;
    const conc = els.concentrationFilter ? els.concentrationFilter.value : '';
    state.filtered = state.schedule.filter(item => {
      if(level && String(item.level) !== String(level)) return false;
      if(cat && String(item.category || '').toUpperCase() !== cat) return false;
      if(conc && String(item.concentration||'') !== conc) return false;
      if(q){
        const sessionName = displaySession(item.session);
        const concLabel = item.concentration ? (translations[state.currentLang].concentrations?.[item.concentration] || item.concentration) : '';
        const hay = `${item.code||''} ${item.subject||''} ${item.date||''} ${item.day||''} ${displayTime(item)||''} ${item.session||''} ${sessionName} ${concLabel}`.toLowerCase();
        if(!hay.includes(q)) return false;
      }
      return true;
    });
    render();
  }

  function render(){
    const frag = document.createDocumentFragment();
    state.filtered.forEach(item => {
      const key = `${item.code}|${item.date}|${item.session||item.time||''}`;
      const card = document.createElement('article');
      card.className = 'card';
      const dayAr = translateDay(item.day);
      const saved = getSavedNotes(key);
      const chaptersRows = buildChaptersRows(saved.chaptersCount || 0, key, saved);
      card.innerHTML = `
        <div class="title">${item.subject || ''}</div>
        <div class="meta"><strong class="label">${getTranslation('labels.code')}</strong>: ${item.code || ''}</div>
        <div class="meta"><strong class="label">${getTranslation('labels.day')}</strong>: ${dayAr || item.day || ''} • <strong class="label">${getTranslation('labels.date')}</strong>: ${item.date || ''} • <strong class="label">${getTranslation('labels.time')}</strong>: ${displayTime(item)}</div>
        <div class="meta"><strong class="label">${getTranslation('labels.level')}</strong>: ${item.level || ''} • <strong class="label">${getTranslation('labels.category')}</strong>: ${item.category || ''}</div>
        ${item.concentration ? `<div class="meta"><strong class="label">${getTranslation('labels.concentration')}</strong>: ${translations[state.currentLang].concentrations?.[item.concentration] || item.concentration}</div>` : ''}
        <div class="chapters-control">
          <label>${getTranslation('labels.chapters')}:</label>
          <input type="number" min="0" max="50" value="${saved.chaptersCount || 0}" data-key="${key}" class="chapters-count-input">
        </div>
        ${(saved.chaptersCount && saved.chaptersCount > 0) ? `
        <div class="notes">
          <table>
            <thead><tr><th>${getTranslation('labels.chapterNum')}</th><th>${getTranslation('labels.notes')}</th><th>${getTranslation('labels.completed')}</th></tr></thead>
            <tbody>${chaptersRows}</tbody>
          </table>
        </div>
        ` : ''}
        <div class="actions">
          <button class="select-toggle ${state.selectedKeys.has(key)?'selected':''}" data-key="${key}">${getTranslation('labels.select')}</button>
        </div>
      `;
      frag.appendChild(card);
    });
    els.list.innerHTML = '';
    els.list.appendChild(frag);

    renderTable();

    // attach autosave handlers after a small delay to ensure DOM is ready
    setTimeout(() => {
      els.list.querySelectorAll('.chapters-count-input').forEach(inp => {
        inp.addEventListener('change', (e)=>{
          const k = e.target.getAttribute('data-key');
          const saved = getSavedNotes(k);
          const count = Math.max(0, Math.min(50, Number(e.target.value||0)));
          saved.chaptersCount = count;
          setSavedNotes(k, saved);
          render();
        });
      });
      els.list.querySelectorAll('.chapter-num-input, textarea[data-note-key], input[type="checkbox"][data-note-key]').forEach(el => {
        const evt = el.classList.contains('chapter-num-input') || el.tagName === 'TEXTAREA' ? 'input' : 'change';
        el.addEventListener(evt, (e)=>{
          const k = e.target.getAttribute('data-note-key');
          const idx = Number(e.target.getAttribute('data-note-idx'));
          const saved = getSavedNotes(k);
          if(!saved.rows) saved.rows = [];
          if(!saved.rows[idx]) saved.rows[idx] = { chapter:'', note:'', done:false };
          if(e.target.classList.contains('chapter-num-input')) {
            saved.rows[idx].chapter = e.target.value;
          } else if(e.target.type === 'checkbox') {
            saved.rows[idx].done = e.target.checked;
          } else {
            saved.rows[idx].note = e.target.value;
          }
          setSavedNotes(k, saved);
        });
      });
    }, 100);
  }

  function translateDay(day){
    return getTranslation(`days.${day}`) || day;
  }

  function buildChaptersRows(n, key, saved){
    const count = Math.max(0, Math.min(50, n||0));
    if(count === 0) return '';
    const rows = [];
    for(let i=0;i<count;i++){
      const row = (saved.rows && saved.rows[i]) || { chapter:'', note:'', done:false };
      const chapterNum = row.chapter || (i+1);
      rows.push(`<tr>
        <td>
          <input type="text" class="chapter-num-input" data-note-key="${key}" data-note-idx="${i}" value="${chapterNum}" placeholder="${i+1}" style="width: 60px;">
          <span class="chapter-num-print">${getTranslation('labels.chapter')} ${chapterNum}</span>
        </td>
        <td>
          <textarea rows="1" data-note-key="${key}" data-note-idx="${i}">${row.note || ''}</textarea>
          <span class="note-text-print">${row.note || ''}</span>
        </td>
        <td style="text-align:center">
          <input type="checkbox" ${row.done?'checked':''} data-note-key="${key}" data-note-idx="${i}">
          <span class="checkbox-print">${row.done ? '☑' : '☐'}</span>
        </td>
      </tr>`);
    }
    return rows.join('');
  }

  function getSavedNotes(key){
    try{
      const raw = localStorage.getItem('seuSchedule:notes');
      const map = raw ? JSON.parse(raw) : {};
      return map[key] || {};
    }catch{ return {}; }
  }
  function setSavedNotes(key, value){
    try{
      const raw = localStorage.getItem('seuSchedule:notes');
      const map = raw ? JSON.parse(raw) : {};
      map[key] = value;
      localStorage.setItem('seuSchedule:notes', JSON.stringify(map));
    }catch{}
  }

  function renderTable(){
    if(!els.table) return;
    const items = state.filtered;
    const rows = items.map(i => {
      const key = `${i.code}|${i.date}|${i.session||i.time||''}`;
      const isSelected = state.selectedKeys.has(key);
      const saved = getSavedNotes(key);
      const chaptersRows = buildChaptersRows(saved.chaptersCount || 0, key, saved);
      return `
      <tr class="table-row ${isSelected?'selected':''}">
        <td><input type="checkbox" class="table-select" data-key="${key}" ${isSelected?'checked':''}></td>
        <td>${i.subject||''}</td>
        <td>${i.code||''}</td>
        <td>${translateDay(i.day)||i.day||''}</td>
        <td>${i.date||''}</td>
        <td>${displayTime(i)}</td>
        <td>${i.level||''}</td>
        <td>${i.category||''}</td>
        <td>${i.concentration ? (translations[state.currentLang].concentrations?.[i.concentration] || i.concentration) : ''}</td>
        <td>
          <input type="number" min="0" max="50" value="${saved.chaptersCount || 0}" data-key="${key}" class="chapters-count-input-table" style="width: 60px;">
        </td>
      </tr>
      ${chaptersRows ? `<tr class="chapters-row"><td colspan="10"><div class="notes-table-view"><table><thead><tr><th>${getTranslation('labels.chapterNum')}</th><th>${getTranslation('labels.notes')}</th><th>${getTranslation('labels.completed')}</th></tr></thead><tbody>${chaptersRows}</tbody></table></div></td></tr>` : ''}
    `;
    }).join('');
    els.table.innerHTML = `
      <table>
        <thead>
          <tr><th>${getTranslation('labels.select')}</th><th>${getTranslation('labels.course')}</th><th>${getTranslation('labels.code')}</th><th>${getTranslation('labels.day')}</th><th>${getTranslation('labels.date')}</th><th>${getTranslation('labels.time')}</th><th>${getTranslation('labels.level')}</th><th>${getTranslation('labels.category')}</th><th>${getTranslation('labels.concentration')}</th><th>${getTranslation('messages.chapters')}</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    
    // Attach handlers for table
    setTimeout(() => {
      els.table.querySelectorAll('.table-select').forEach(chk => {
        chk.addEventListener('change', (e)=>{
          const k = e.target.getAttribute('data-key');
          if(e.target.checked) state.selectedKeys.add(k); else state.selectedKeys.delete(k);
          e.target.closest('tr').classList.toggle('selected', e.target.checked);
        });
      });
      els.table.querySelectorAll('.chapters-count-input-table').forEach(inp => {
        inp.addEventListener('change', (e)=>{
          const k = e.target.getAttribute('data-key');
          const saved = getSavedNotes(k);
          const count = Math.max(0, Math.min(50, Number(e.target.value||0)));
          saved.chaptersCount = count;
          setSavedNotes(k, saved);
          renderTable();
        });
      });
      els.table.querySelectorAll('.chapter-num-input, textarea[data-note-key], input[type="checkbox"][data-note-key]').forEach(el => {
        const evt = el.classList.contains('chapter-num-input') || el.tagName === 'TEXTAREA' ? 'input' : 'change';
        el.addEventListener(evt, (e)=>{
          const k = e.target.getAttribute('data-note-key');
          const idx = Number(e.target.getAttribute('data-note-idx'));
          const saved = getSavedNotes(k);
          if(!saved.rows) saved.rows = [];
          if(!saved.rows[idx]) saved.rows[idx] = { chapter:'', note:'', done:false };
          if(e.target.classList.contains('chapter-num-input')) {
            saved.rows[idx].chapter = e.target.value;
          } else if(e.target.type === 'checkbox') {
            saved.rows[idx].done = e.target.checked;
          } else {
            saved.rows[idx].note = e.target.value;
          }
          setSavedNotes(k, saved);
        });
      });
    }, 100);
  }

  function selectedItems(){
    const keys = state.selectedKeys;
    return state.schedule.filter(item => keys.has(`${item.code}|${item.date}|${item.session||item.time||''}`));
  }

  function toPlainText(items){
    if(!items.length) return '';
    return items.map(i => {
      const key = `${i.code}|${i.date}|${i.session||i.time||''}`;
      const saved = getSavedNotes(key);
      let lines = [
        `${getTranslation('labels.course')}: ${i.subject}`,
        `${getTranslation('labels.code')}: ${i.code}`,
        `${getTranslation('labels.day')}: ${translateDay(i.day) || i.day}`,
        `${getTranslation('labels.date')}: ${i.date}`,
        `${getTranslation('labels.time')}: ${displayTime(i)}`,
        `${getTranslation('labels.level')}: ${i.level}`,
        `${getTranslation('labels.category')}: ${i.category}`
      ];
      if (i.concentration) {
        const concLabel = translations[state.currentLang].concentrations?.[i.concentration] || i.concentration;
        lines.push(`${getTranslation('labels.concentration')}: ${concLabel}`);
      }
      
      // Add chapters info if available
      if(saved.chaptersCount && saved.chaptersCount > 0 && saved.rows) {
        lines.push(`\n${getTranslation('messages.chapters')}:`);
        for(let j=0; j<saved.chaptersCount; j++){
          const row = saved.rows[j] || { chapter:'', note:'', done:false };
          const chapterNum = row.chapter || (j+1);
          const status = row.done ? '✓' : '☐';
          const noteText = row.note ? ` - ${row.note}` : '';
          lines.push(`  ${status} ${getTranslation('labels.chapter')} ${chapterNum}${noteText}`);
        }
      }
      
      return lines.join('\n');
    }).join('\n\n');
  }

  function displaySession(sessionCode){
    if(!sessionCode) return '';
    const sess = state.sessions && state.sessions[sessionCode];
    return sess ? sess.name : '';
  }

  function displayTime(item){
    // Prefer session mapping if available
    if(item && item.session && state.sessions[item.session] && state.sessions[item.session].time){
      return `${state.sessions[item.session].time} (${displaySession(item.session)})`;
    }
    return item?.time || '';
  }

  function copyAsText(){
    const txt = toPlainText(selectedItems());
    if(!txt){ toast(getTranslation('messages.noSubjects')); return; }
    navigator.clipboard.writeText(txt);
    toast(getTranslation('messages.copySuccess'));
  }

  function saveLocal(){
    const payload = Array.from(state.selectedKeys);
    localStorage.setItem('seuSchedule:selected', JSON.stringify(payload));
    toast(getTranslation('messages.saveSuccess'));
  }

  function loadLocal(){
    try{
      const raw = localStorage.getItem('seuSchedule:selected');
      const arr = raw ? JSON.parse(raw) : [];
      state.selectedKeys = new Set(arr);
      render();
      toast(getTranslation('messages.loadSuccess'));
    }catch{
      toast(getTranslation('messages.loadError'));
    }
  }

  function toast(message){
    let host = document.getElementById('toast-host');
    if(!host){
      host = document.createElement('div');
      host.id = 'toast-host';
      host.style.position = 'fixed';
      host.style.insetInline = '0';
      host.style.bottom = '20px';
      host.style.display = 'grid';
      host.style.placeItems = 'center';
      host.style.zIndex = '9999';
      document.body.appendChild(host);
    }
    const el = document.createElement('div');
    el.textContent = message;
    el.style.background = '#151922';
    el.style.color = '#e6e9ef';
    el.style.border = '1px solid #2a2f3a';
    el.style.padding = '10px 14px';
    el.style.borderRadius = '10px';
    el.style.boxShadow = '0 6px 30px rgba(0,0,0,.35)';
    el.style.fontFamily = "Almarai, system-ui";
    host.appendChild(el);
    setTimeout(()=>{
      el.style.transition = 'opacity .25s ease';
      el.style.opacity = '0';
      setTimeout(()=>{ el.remove(); }, 250);
    }, 1500);
  }

  function printPDF(){
    // Check if we're on mobile/tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile devices, use a different approach
      const items = selectedItems();
      const content = items.length ? items : state.filtered;
      
      if (content.length === 0) {
        toast(getTranslation('messages.noSubjects'));
        return;
      }
      
      // Create a simple text version for mobile
      const textContent = toPlainText(content);
      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      // Try to download the file
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schedule.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast(getTranslation('messages.copySuccess'));
      return;
    }
    
    // Desktop PDF printing
    const items = selectedItems();
    if(items.length){
      const original = state.filtered;
      state.filtered = items;
      render();
      // Force card view for printing
      els.list.style.display = 'grid';
      els.table.style.display = 'none';
      document.documentElement.classList.add('pdf-export-mode');
      window.print();
      document.documentElement.classList.remove('pdf-export-mode');
      state.filtered = original;
      render();
      // Restore view state
      const showCards = els.viewToggle ? els.viewToggle.checked : true;
      if(showCards) {
        els.list.style.display = 'grid';
        els.table.style.display = 'none';
      } else {
        els.list.style.display = 'none';
        els.table.style.display = 'block';
      }
    } else {
      // Force card view for printing
      els.list.style.display = 'grid';
      els.table.style.display = 'none';
      document.documentElement.classList.add('pdf-export-mode');
      window.print();
      document.documentElement.classList.remove('pdf-export-mode');
      // Restore view state after print
      const showCards = els.viewToggle ? els.viewToggle.checked : true;
      if(showCards) {
        els.list.style.display = 'grid';
        els.table.style.display = 'none';
      } else {
        els.list.style.display = 'none';
        els.table.style.display = 'block';
      }
    }
  }

  // Client-side PDF generator using html2pdf.js for both mobile and desktop
  async function generateClientPDF(){
    try{
      const items = selectedItems();
      const useSelected = items.length > 0;
      const originalFiltered = state.filtered.slice();
      if(useSelected){
        state.filtered = items;
      }
      render();

      // Choose visible source container in DOM (exclude header/footer)
      const showCards = els.viewToggle ? els.viewToggle.checked : true;
      const source = showCards ? els.list : els.table;
      if (!source || !source.children || source.children.length === 0){
        toast(state.currentLang==='ar' ? 'لا يوجد محتوى للتصدير' : 'No content to export');
        if(useSelected){ state.filtered = originalFiltered; render(); }
        return;
      }

      const filename = 'schedule.pdf';
      const baseOpts = {
        filename,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      if (!useSelected){
        // Compress current view into a single A4 page
        document.documentElement.classList.add('pdf-export-mode');
        const canvas = await html2canvas(source, { scale: window.devicePixelRatio > 1 ? 2 : 1.5, useCORS: true, backgroundColor: '#ffffff' });
        document.documentElement.classList.remove('pdf-export-mode');
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const JsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : window.jsPDF;
        const pdf = new JsPDF('p', 'mm', 'a4');
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        const margin = 5;
        const maxW = pageW - margin*2;
        const maxH = pageH - margin*2;
        const imgW = canvas.width; // px
        const imgH = canvas.height; // px
        const scale = Math.min(maxW / (imgW/2), maxH / (imgH/2));
        const drawW = Math.max(10, Math.floor((imgW/2) * scale));
        const drawH = Math.max(10, Math.floor((imgH/2) * scale));
        pdf.addImage(imgData, 'JPEG', margin, margin, drawW, drawH);
        pdf.save(filename);
      } else {
        // Let html2pdf paginate selected items
        document.documentElement.classList.add('pdf-export-mode');
        const opts = { ...baseOpts, margin: [12,12,12,12], pagebreak: { mode: ['css','legacy'], before: '.card:not(:first-child)' } };
        await html2pdf().set(opts).from(source).save();
        document.documentElement.classList.remove('pdf-export-mode');
      }

      if(useSelected){
        state.filtered = originalFiltered;
        render();
      }
    }catch(err){
      console.error('PDF generation failed', err);
      toast(state.currentLang==='ar' ? 'فشل إنشاء ملف PDF' : 'Failed to generate PDF');
    }
  }

  // Debounced search for smooth performance
  function debouncedSearch(){
    if(state.searchTimeout) clearTimeout(state.searchTimeout);
    state.searchTimeout = setTimeout(() => {
      filterRender();
    }, 300);
  }

  // events
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.select-toggle');
    if(btn){
      const key = btn.getAttribute('data-key');
      if(state.selectedKeys.has(key)) state.selectedKeys.delete(key); else state.selectedKeys.add(key);
      btn.classList.toggle('selected');
      return;
    }
  });
  els.search.addEventListener('input', debouncedSearch);
  els.levelFilter.addEventListener('change', filterRender);
  els.categoryFilter.addEventListener('change', filterRender);
  if (els.concentrationFilter) els.concentrationFilter.addEventListener('change', filterRender);
  els.copyBtn.addEventListener('click', copyAsText);
  // Show v1 button only on desktop; always show v2
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (els.pdfBtn){
    if (isMobile){ els.pdfBtn.style.display = 'none'; }
    els.pdfBtn.addEventListener('click', printPDF);
  }
  if (els.pdfClientBtn) els.pdfClientBtn.addEventListener('click', generateClientPDF);
  els.saveBtn.addEventListener('click', saveLocal);
  els.loadBtn.addEventListener('click', loadLocal);
  if (els.viewToggle){
    // Initialize view state
    const updateView = () => {
      const showCards = els.viewToggle.checked;
      if(showCards) {
        els.list.style.display = 'grid';
        els.table.style.display = 'none';
      } else {
        els.list.style.display = 'none';
        els.table.style.display = 'block';
        renderTable();
      }
    };
    
    els.viewToggle.addEventListener('change', updateView);
    // Set initial state
    updateView();
  }
  if (els.langSelect){ 
    els.langSelect.addEventListener('change', (e)=>{ 
      changeLanguage(e.target.value);
    }); 
  }
  
  // Initialize header toggle after DOM is ready
  function initHeaderToggle() {
    const headerToggle = document.getElementById('headerToggle');
    const header = document.querySelector('header');
    
    if (headerToggle && header) {
      headerToggle.addEventListener('click', (e) => {
        e.preventDefault();
        
        const controls = document.getElementById('headerControls');
        const isCollapsed = header.classList.contains('collapsed');
        
        if (isCollapsed) {
          // Show controls
          header.classList.remove('collapsed');
          if (controls) controls.style.display = 'grid';
        } else {
          // Hide controls
          header.classList.add('collapsed');
          if (controls) controls.style.display = 'none';
        }
        
        // Update toggle icon and text
        const toggleIcon = headerToggle.querySelector('.toggle-icon');
        const toggleText = headerToggle.querySelector('.toggle-text');
        
        if (toggleIcon) {
          toggleIcon.textContent = header.classList.contains('collapsed') ? '▶' : '▼';
        }
        
        if (toggleText) {
          const collapsed = header.classList.contains('collapsed');
          if (state.currentLang === 'ar') {
            toggleText.textContent = collapsed ? 'إظهار الأدوات' : 'إخفاء الأدوات';
          } else {
            toggleText.textContent = collapsed ? 'Show Controls' : 'Hide Controls';
          }
        }
      });
      
      // Auto-collapse on mobile after a delay
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          header.classList.add('collapsed');
          const toggleIcon = headerToggle.querySelector('.toggle-icon');
          const toggleText = headerToggle.querySelector('.toggle-text');
          
          if (toggleIcon) {
            toggleIcon.textContent = '▶';
          }
          
          if (toggleText) {
            if (state.currentLang === 'ar') {
              toggleText.textContent = 'إظهار الأدوات';
            } else {
              toggleText.textContent = 'Show Controls';
            }
          }
        }, 2000);
      }
    }
  }
  if (els.showMineBtn) {
    let showingMine = false;
    els.showMineBtn.addEventListener('click', ()=>{
      try{
        if(showingMine){
          // Show all
          state.filtered = state.schedule.filter(item => {
            const level = els.levelFilter.value;
            const cat = els.categoryFilter.value;
            if(level && String(item.level) !== String(level)) return false;
            if(cat && String(item.category || '').toUpperCase() !== cat) return false;
            return true;
          });
          render();
          els.showMineBtn.textContent = getTranslation('showMineBtn');
          showingMine = false;
          toast(getTranslation('messages.showingAll'));
        } else {
          // Show mine
          if(state.selectedKeys.size === 0){
            const raw = localStorage.getItem('seuSchedule:selected');
            const arr = raw ? JSON.parse(raw) : [];
            state.selectedKeys = new Set(arr);
          }
          const items = selectedItems();
          if(items.length === 0){ toast(getTranslation('messages.noStored')); return; }
          state.filtered = items;
          render();
          els.showMineBtn.textContent = getTranslation('showAllBtn');
          showingMine = true;
          toast(getTranslation('messages.showingMine'));
        }
      }catch{ toast(getTranslation('messages.loadStoredError')); }
    });
  }

  loadData().then(()=>{
    // Auto-load stored subjects on page load
    try{
      const raw = localStorage.getItem('seuSchedule:selected');
      if(raw){
        const arr = JSON.parse(raw);
        if(arr && arr.length > 0){
          state.selectedKeys = new Set(arr);
          render();
        }
      }
    }catch{}
    
    // Initialize header toggle after everything is loaded
    initHeaderToggle();
  }).catch(()=>{
    // fallback if json missing
    els.list.innerHTML = '<div class="meta">لم يتم العثور على بيانات الجدول. الرجاء توليد الملف data/schedule.json</div>';
    
    // Still initialize header toggle even if data fails
    initHeaderToggle();
  });
})();