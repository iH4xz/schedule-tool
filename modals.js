/* Modal handlers for full schedule and report form */
(function(){
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function updateModalTranslations(){
    const currentLang = getCurrentLanguage();
    
    // Update modal titles
    const fullScheduleTitle = document.getElementById('fullScheduleTitle');
    if(fullScheduleTitle) fullScheduleTitle.textContent = getTranslation('fullScheduleTitle', currentLang);
    
    const reportTitle = document.getElementById('reportTitle');
    if(reportTitle) reportTitle.textContent = getTranslation('reportTitle', currentLang);
    
    // Update form labels and placeholders
    const reportNameLabel = document.getElementById('reportNameLabel');
    if(reportNameLabel) reportNameLabel.textContent = getTranslation('nameLabel', currentLang);
    
    const reportName = document.getElementById('reportName');
    if(reportName) {
      reportName.placeholder = getTranslation('namePlaceholder', currentLang);
    }
    
    const reportSubjectLabel = document.getElementById('reportSubjectLabel');
    if(reportSubjectLabel) reportSubjectLabel.textContent = getTranslation('subjectLabel', currentLang);
    
    const reportSubject = document.getElementById('reportSubject');
    if(reportSubject) {
      reportSubject.placeholder = getTranslation('subjectPlaceholder', currentLang);
    }
    
    const reportTypeLabel = document.getElementById('reportTypeLabel');
    if(reportTypeLabel) reportTypeLabel.textContent = getTranslation('typeLabel', currentLang);
    
    const reportType = document.getElementById('reportType');
    if(reportType) {
      reportType.querySelector('option[value=""]').textContent = getTranslation('typePlaceholder', currentLang);
      reportType.querySelector('option[value="wrong_time"]').textContent = getTranslation('wrongTime', currentLang);
      reportType.querySelector('option[value="wrong_date"]').textContent = getTranslation('wrongDate', currentLang);
      reportType.querySelector('option[value="wrong_info"]').textContent = getTranslation('wrongInfo', currentLang);
      reportType.querySelector('option[value="missing"]').textContent = getTranslation('missing', currentLang);
      reportType.querySelector('option[value="other"]').textContent = getTranslation('other', currentLang);
    }
    
    const reportDetailsLabel = document.getElementById('reportDetailsLabel');
    if(reportDetailsLabel) reportDetailsLabel.textContent = getTranslation('detailsLabel', currentLang);
    
    const reportDetails = document.getElementById('reportDetails');
    if(reportDetails) {
      reportDetails.placeholder = getTranslation('detailsPlaceholder', currentLang);
    }
    
    const mathAnswer = document.getElementById('mathAnswer');
    if(mathAnswer) {
      mathAnswer.placeholder = getTranslation('mathAnswerPlaceholder', currentLang);
    }
    
    const submitBtn = document.getElementById('submitBtn');
    if(submitBtn) submitBtn.textContent = getTranslation('submitBtn', currentLang);
  }

  function init(){
    const fullScheduleBtn = document.getElementById('fullScheduleBtn');
    const reportBtn = document.getElementById('reportBtn');
    const fullScheduleModal = document.getElementById('fullScheduleModal');
    const reportModal = document.getElementById('reportModal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Update translations on init
    updateModalTranslations();

    // Full Schedule Modal
    if(fullScheduleBtn && fullScheduleModal){
      fullScheduleBtn.addEventListener('click', ()=>{
        showFullSchedule();
        fullScheduleModal.style.display = 'flex';
      });
    }

    // Report Modal
    if(reportBtn && reportModal){
      reportBtn.addEventListener('click', ()=>{
        generateMathChallenge();
        reportModal.style.display = 'flex';
      });
    }

    // Close modals
    closeButtons.forEach(btn => {
      btn.addEventListener('click', ()=>{
        fullScheduleModal.style.display = 'none';
        reportModal.style.display = 'none';
      });
    });

    // Close on outside click
    window.addEventListener('click', (e)=>{
      if(e.target === fullScheduleModal) fullScheduleModal.style.display = 'none';
      if(e.target === reportModal) reportModal.style.display = 'none';
    });

    // Report Form Submit
    const reportForm = document.getElementById('reportForm');
    if(reportForm){
      reportForm.addEventListener('submit', handleReportSubmit);
    }

    // Listen for language changes
    window.addEventListener('languageChanged', updateModalTranslations);
  }

  function getTranslation(key, lang = 'ar') {
    const translations = {
      ar: {
        fullScheduleTitle: 'الجدول الكامل - جميع المقررات',
        level: 'المستوى',
        session: 'الجلسة',
        loadError: 'خطأ في تحميل الجدول',
        reportTitle: 'إبلاغ عن تعديل أو خطأ',
        nameLabel: 'الاسم (اختياري):',
        namePlaceholder: 'اسمك',
        subjectLabel: 'المقرر:',
        subjectPlaceholder: 'اسم أو رمز المقرر',
        typeLabel: 'نوع الإبلاغ:',
        typePlaceholder: 'اختر نوع الإبلاغ',
        wrongTime: 'خطأ في الوقت',
        wrongDate: 'خطأ في التاريخ',
        wrongInfo: 'معلومات خاطئة',
        missing: 'مقرر ناقص',
        other: 'أخرى',
        detailsLabel: 'التفاصيل:',
        detailsPlaceholder: 'اشرح التعديل أو الخطأ بالتفصيل',
        submitBtn: 'إرسال البلاغ',
        mathQuestion: 'ما هو',
        mathAnswerPlaceholder: 'الإجابة',
        submitSuccess: '✅ تم إرسال البلاغ بنجاح. شكراً لك!',
        submitError: '❌ حدث خطأ:',
        submitErrorGeneric: '❌ حدث خطأ في الإرسال. الرجاء المحاولة مرة أخرى.',
        mathError: 'الإجابة على السؤال غير صحيحة. الرجاء المحاولة مرة أخرى.',
        sending: 'جاري الإرسال...'
      },
      en: {
        fullScheduleTitle: 'Full Schedule - All Courses',
        level: 'Level',
        session: 'Session',
        loadError: 'Error loading schedule',
        reportTitle: 'Report Issue or Error',
        nameLabel: 'Name (optional):',
        namePlaceholder: 'Your name',
        subjectLabel: 'Course:',
        subjectPlaceholder: 'Course name or code',
        typeLabel: 'Report Type:',
        typePlaceholder: 'Select report type',
        wrongTime: 'Wrong Time',
        wrongDate: 'Wrong Date',
        wrongInfo: 'Wrong Information',
        missing: 'Missing Course',
        other: 'Other',
        detailsLabel: 'Details:',
        detailsPlaceholder: 'Explain the issue or error in detail',
        submitBtn: 'Submit Report',
        mathQuestion: 'What is',
        mathAnswerPlaceholder: 'Answer',
        submitSuccess: '✅ Report submitted successfully. Thank you!',
        submitError: '❌ Error:',
        submitErrorGeneric: '❌ Submission error. Please try again.',
        mathError: 'Incorrect answer. Please try again.',
        sending: 'Sending...'
      }
    };
    
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }

  function getCurrentLanguage() {
    return localStorage.getItem('seuSchedule:language') || 'ar';
  }

  function showFullSchedule(){
    const currentLang = getCurrentLanguage();
    
    // Load schedule, catalog and sessions data
    const CB = Date.now();
    Promise.all([
      fetch(`./data/schedule.json?cb=${CB}`, { cache: 'no-store' }).then(res => res.json()),
      fetch(`./data/catalog.json?cb=${CB}`, { cache: 'no-store' }).then(res => res.json()),
      fetch(`./data/sessions.json?cb=${CB}`, { cache: 'no-store' }).then(res => res.json()).catch(()=>({
        S1:{name:'First Session',time:'4:00 PM – 5:00 PM'},
        S2:{name:'Second Session',time:'5:30 PM – 6:30 PM'},
        S3:{name:'Third Session',time:'7:00 PM – 8:00 PM'},
        S4:{name:'Fourth Session',time:'8:30 PM – 9:30 PM'}
      }))
    ])
    .then(([schedule, catalog, sessions]) => {
      const container = document.getElementById('fullScheduleList');
      if(!container) return;
      
      // Normalize schedule with catalog data
      const normalizedSchedule = schedule.map(item => {
        const originalCode = String(item.code || '');
        const catalogKey = originalCode.toUpperCase().replace(/\s+/g,'');
        const entry = catalog[catalogKey] || {};
        const subject = entry.name || '';
        const level = entry && entry.level != null ? String(entry.level) : '';
        const category = entry.category || inferCategoryFromCode(originalCode);
        const day = deriveDayFromDate(item.date);
        const sessionCode = item.session || '';
        const timeText = displayTime(sessionCode, sessions, currentLang);
        return {
          code: originalCode,
          date: item.date,
          day,
          session: sessionCode,
          time: timeText,
          subject,
          level,
          category
        };
      });
      
      // Group by date then by session (to avoid merging different dates with same weekday)
      const byDateAndSession = {};
      normalizedSchedule.forEach(item => {
        const dateKey = item.date;
        if(!byDateAndSession[dateKey]) byDateAndSession[dateKey] = {};
        const sessKey = item.session || '';
        if(!byDateAndSession[dateKey][sessKey]) byDateAndSession[dateKey][sessKey] = [];
        byDateAndSession[dateKey][sessKey].push(item);
      });

      // Sort dates ascending (D/M/YYYY safe sort by Y,M,D)
      const sortDates = (a,b) => {
        const pa = a.split('/').map(n=>Number(n)); // [D,M,Y]
        const pb = b.split('/').map(n=>Number(n));
        const da = pa[2]*10000 + pa[1]*100 + pa[0];
        const db = pb[2]*10000 + pb[1]*100 + pb[0];
        return da - db;
      };
      const datesOrdered = Object.keys(byDateAndSession).sort(sortDates);

      // Session order
      const sessionOrder = ['S1','S2','S3','S4'];

      let html = '<div class="full-schedule-grid">';
      datesOrdered.forEach(date => {
        const day = deriveDayFromDate(date);
        const dayNames = {
          'Thursday': currentLang === 'ar' ? 'الخميس' : 'Thursday',
          'Sunday': currentLang === 'ar' ? 'الأحد' : 'Sunday',
          'Monday': currentLang === 'ar' ? 'الاثنين' : 'Monday',
          'Tuesday': currentLang === 'ar' ? 'الثلاثاء' : 'Tuesday',
          'Wednesday': currentLang === 'ar' ? 'الأربعاء' : 'Wednesday',
          'Friday': currentLang === 'ar' ? 'الجمعة' : 'Friday',
          'Saturday': currentLang === 'ar' ? 'السبت' : 'Saturday'
        };
        const dayLabel = dayNames[day] || day || '';
        
        html += `<div class="day-section" data-day="${day}" data-date="${date}">`;
        html += `<h3>${dayLabel} - ${date}</h3>`;
        
        sessionOrder.forEach(sess => {
          const items = (byDateAndSession[date] && byDateAndSession[date][sess]) || [];
          if(items.length){
            html += `<div class="time-window">`;
            const header = displayTime(sess, sessions, currentLang);
            html += `<h4 class="time-header">${header}</h4>`;
            html += `<div class="time-subjects">`;
            items.forEach(item => {
              const level = item.level || (currentLang === 'ar' ? 'غير محدد' : 'Not specified');
              html += `
                <div class="mini-card">
                  <div class="mini-title">${item.subject}</div>
                  <div class="mini-info">${item.code}</div>
                  <div class="mini-meta">${getTranslation('level', currentLang)} ${level} | ${item.category}</div>
                </div>
              `;
            });
            html += `</div></div>`;
          }
        });
        
        html += `</div>`;
      });
      html += '</div>';
      container.innerHTML = html;

      // Build navigation buttons using dates
      const navHost = document.getElementById('scheduleNav') || document.querySelector('.schedule-nav');
      if (navHost){
        let navHtml = '';
        navHtml += `<button type="button" class="nav-btn" data-filter="all">${currentLang === 'ar' ? 'الكل' : 'All'}</button>`;
        datesOrdered.forEach(date => {
          const day = deriveDayFromDate(date);
          const dayNames = {
            'Thursday': currentLang === 'ar' ? 'الخميس' : 'Thursday',
            'Sunday': currentLang === 'ar' ? 'الأحد' : 'Sunday',
            'Monday': currentLang === 'ar' ? 'الاثنين' : 'Monday',
            'Tuesday': currentLang === 'ar' ? 'الثلاثاء' : 'Tuesday',
            'Wednesday': currentLang === 'ar' ? 'الأربعاء' : 'Wednesday',
            'Friday': currentLang === 'ar' ? 'الجمعة' : 'Friday',
            'Saturday': currentLang === 'ar' ? 'السبت' : 'Saturday'
          };
          const dayLabel = dayNames[day] || day || '';
          navHtml += `<button type="button" class="nav-btn" data-date="${date}">${dayLabel} - ${date}</button>`;
        });
        navHost.innerHTML = navHtml;
      }
      
      // Initialize navigation
      initScheduleNavigation();
    })
    .catch(err => {
      console.error('Error loading full schedule:', err);
      const currentLang = getCurrentLanguage();
      document.getElementById('fullScheduleList').innerHTML = `<p>${getTranslation('loadError', currentLang)}</p>`;
    });
  }

  function inferCategoryFromCode(code){
    if(!code) return '';
    const m = String(code).toUpperCase().match(/^[A-Z]+/);
    return m ? m[0] : '';
  }

  function deriveDayFromDate(dateStr){
    try{
      if(!dateStr) return '';
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

  function displayTime(sessionCode, sessions, lang){
    const sess = sessions && sessions[sessionCode];
    if(!sess) return '';
    const name = displaySessionName(sessionCode, lang);
    // Include session name for clarity in both LTR/RTL
    return `${sess.time} (${name})`;
  }

  function displaySessionName(sessionCode, lang){
    const arNames = { S1:'الجلسة الأولى', S2:'الجلسة الثانية', S3:'الجلسة الثالثة', S4:'الجلسة الرابعة' };
    const enNames = { S1:'First Session', S2:'Second Session', S3:'Third Session', S4:'Fourth Session' };
    return (lang === 'ar' ? arNames[sessionCode] : enNames[sessionCode]) || sessionCode;
  }
  
  function initScheduleNavigation(){
    const navHost = document.getElementById('scheduleNav') || document.querySelector('.schedule-nav');
    const updateHandlers = () => {
      const navButtons = navHost ? navHost.querySelectorAll('.nav-btn') : document.querySelectorAll('.nav-btn');
      const daySections = document.querySelectorAll('.day-section');
      
      navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update active button
          navButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          const filterAll = btn.getAttribute('data-filter') === 'all';
          const selectedDate = btn.getAttribute('data-date');
          const selectedDay = btn.getAttribute('data-day');
          
          // Show/hide sections (by date when provided, else by day)
          daySections.forEach(section => {
            const matches = filterAll ||
              (selectedDate && section.getAttribute('data-date') === selectedDate) ||
              (selectedDay && section.getAttribute('data-day') === selectedDay);
            section.classList.toggle('hidden', !matches);
          });
        });
      });
      
      // Set All as active by default
      const allBtn = navHost ? navHost.querySelector('.nav-btn[data-filter="all"]') : document.querySelector('.nav-btn[data-filter="all"]');
      if (allBtn) allBtn.classList.add('active');
    };
    updateHandlers();
  }

  let correctAnswer = 0;

  function generateMathChallenge(){
    const currentLang = getCurrentLanguage();
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 + num2;
    
    const mathQuestion = document.getElementById('mathQuestion');
    if(mathQuestion){
      mathQuestion.textContent = `${getTranslation('mathQuestion', currentLang)} ${num1} + ${num2}؟`;
    }
  }

  function handleReportSubmit(e){
    e.preventDefault();
    const currentLang = getCurrentLanguage();

    const mathAnswer = document.getElementById('mathAnswer').value;
    if(parseInt(mathAnswer) !== correctAnswer){
      alert(getTranslation('mathError', currentLang));
      generateMathChallenge();
      document.getElementById('mathAnswer').value = '';
      return;
    }

    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('.submit-btn');
    
    submitBtn.disabled = true;
    submitBtn.textContent = getTranslation('sending', currentLang);

    fetch('./report.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        alert(getTranslation('submitSuccess', currentLang));
        e.target.reset();
        document.getElementById('reportModal').style.display = 'none';
      } else {
        alert(getTranslation('submitError', currentLang) + ' ' + (data.error || getTranslation('submitErrorGeneric', currentLang)));
      }
    })
    .catch(err => {
      console.error('Error:', err);
      alert(getTranslation('submitErrorGeneric', currentLang));
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = getTranslation('submitBtn', currentLang);
      generateMathChallenge();
    });
  }
})();

