<?php
// Set content type and charset
header('Content-Type: text/html; charset=utf-8');

// Get language from URL parameter or default to Arabic
$lang = isset($_GET['lang']) && in_array($_GET['lang'], ['ar', 'en']) ? $_GET['lang'] : 'ar';

// Set HTML lang and dir attributes based on language
$htmlLang = $lang;
$htmlDir = $lang === 'ar' ? 'rtl' : 'ltr';

// Basic translations for initial page load
$translations = [
    'ar' => [
        'title' => 'أداة جداول الاختبارات',
        'subtitle' => 'جدول اختبارات منتصف الفصل - كلية إدارة الأعمال - أكتوبر 2025',
        'searchPlaceholder' => 'ابحث عن مقرر أو رمز',
        'levelAll' => 'كل المستويات',
        'categoryAll' => 'كل التصنيفات',
        'copyBtn' => 'نسخ الجدول كنص',
        'pdfBtn' => 'إستخراج PDF',
        'pdfClientBtn' => 'إستخراج PDF v2',
        'saveBtn' => 'حفظ في المتصفح',
        'loadBtn' => 'استرجاع من المتصفح',
        'showMineBtn' => 'عرض جدولي',
        'fullScheduleBtn' => '📅 الجدول الكامل',
        'reportBtn' => 'إبلاغ عن تعديل',
        'viewToggleLabel' => 'بطاقات / جدول',
        'program' => 'تخصص هذه المقررات ضمن برنامج إدارة الأعمال (Management). للمعلومات:',
        'programLink' => 'رابط البرنامج',
        'footerText' => 'Built by SHJRH SERVICES',
        'searchAriaLabel' => 'بحث حي',
        'levelFilterAriaLabel' => 'تصفية حسب المستوى',
        'categoryFilterAriaLabel' => 'تصفية حسب التصنيف',
        'fullScheduleTitle' => 'الجدول الكامل - جميع المقررات',
        'reportTitle' => 'إبلاغ عن تعديل أو خطأ',
        'nameLabel' => 'الاسم (اختياري):',
        'namePlaceholder' => 'اسمك',
        'subjectLabel' => 'المقرر:',
        'subjectPlaceholder' => 'اسم أو رمز المقرر',
        'typeLabel' => 'نوع الإبلاغ:',
        'typePlaceholder' => 'اختر نوع الإبلاغ',
        'wrongTime' => 'خطأ في الوقت',
        'wrongDate' => 'خطأ في التاريخ',
        'wrongInfo' => 'معلومات خاطئة',
        'missing' => 'مقرر ناقص',
        'other' => 'أخرى',
        'detailsLabel' => 'التفاصيل:',
        'detailsPlaceholder' => 'اشرح التعديل أو الخطأ بالتفصيل',
        'submitBtn' => 'إرسال البلاغ',
        'mathAnswerPlaceholder' => 'الإجابة'
    ],
    'en' => [
        'title' => 'Exam Schedule Tool',
        'subtitle' => 'Midterm Exam Schedule - Business Administration College - October 2025',
        'searchPlaceholder' => 'Search for course or code',
        'levelAll' => 'All Levels',
        'categoryAll' => 'All Categories',
        'copyBtn' => 'Copy as Text',
        'pdfBtn' => 'Export PDF',
        'pdfClientBtn' => 'Export PDF v2',
        'saveBtn' => 'Save to Browser',
        'loadBtn' => 'Load from Browser',
        'showMineBtn' => 'Show My Schedule',
        'fullScheduleBtn' => '📅 Full Schedule',
        'reportBtn' => 'Report Issue',
        'viewToggleLabel' => 'Cards / Table',
        'program' => 'These courses are part of the Business Administration (Management) program. For information:',
        'programLink' => 'Program Link',
        'footerText' => 'Built by SHJRH SERVICES',
        'searchAriaLabel' => 'Live search',
        'levelFilterAriaLabel' => 'Filter by level',
        'categoryFilterAriaLabel' => 'Filter by category',
        'fullScheduleTitle' => 'Full Schedule - All Courses',
        'reportTitle' => 'Report Issue or Error',
        'nameLabel' => 'Name (optional):',
        'namePlaceholder' => 'Your name',
        'subjectLabel' => 'Course:',
        'subjectPlaceholder' => 'Course name or code',
        'typeLabel' => 'Report Type:',
        'typePlaceholder' => 'Select report type',
        'wrongTime' => 'Wrong Time',
        'wrongDate' => 'Wrong Date',
        'wrongInfo' => 'Wrong Information',
        'missing' => 'Missing Course',
        'other' => 'Other',
        'detailsLabel' => 'Details:',
        'detailsPlaceholder' => 'Explain the issue or error in detail',
        'submitBtn' => 'Submit Report',
        'mathAnswerPlaceholder' => 'Answer'
    ]
];

$t = $translations[$lang];
?>
<!doctype html>
<html lang="<?php echo $htmlLang; ?>" dir="<?php echo $htmlDir; ?>">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo htmlspecialchars($t['title']); ?></title>
    <link rel="preconnect" href="https://cdn.shjrh.xyz" crossorigin>
    <link rel="stylesheet" href="https://cdn.shjrh.xyz/fonts-44/Almarai/almarai.css">
    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="./faviconsbyshjrhservices.sa/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./faviconsbyshjrhservices.sa/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./faviconsbyshjrhservices.sa/favicon-16x16.png">
    <link rel="manifest" href="./faviconsbyshjrhservices.sa/site.webmanifest">
    <link rel="icon" type="image/png" sizes="192x192" href="./faviconsbyshjrhservices.sa/android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="./faviconsbyshjrhservices.sa/android-chrome-512x512.png">
    <link rel="shortcut icon" href="./faviconsbyshjrhservices.sa/favicon.ico">
    <link rel="stylesheet" href="./style.css">
    <script src="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js"></script>
  </head>
  <body>
    <header class="container">
      <div class="header-top">
        <div class="header-left">
          <h1><?php echo htmlspecialchars($t['title']); ?></h1>
          <p id="subtitle" class="subtitle"><?php echo htmlspecialchars($t['subtitle']); ?></p>
        </div>
        <div class="header-right">
          <button id="reportBtn" class="report-link"><?php echo htmlspecialchars($t['reportBtn']); ?></button>
        </div>
      </div>
      <button id="headerToggle" class="header-toggle" aria-label="Toggle controls">
        <span class="toggle-text"><?php echo $lang === 'ar' ? 'إظهار/إخفاء الأدوات' : 'Show/Hide Controls'; ?></span>
        <span class="toggle-icon">▼</span>
      </button>
      <div class="controls" id="headerControls">
        <select id="langSelect" aria-label="<?php echo $lang === 'ar' ? 'اللغة' : 'Language'; ?>">
          <option value="ar" <?php echo $lang === 'ar' ? 'selected' : ''; ?>>العربية</option>
          <option value="en" <?php echo $lang === 'en' ? 'selected' : ''; ?>>English</option>
        </select>
        <div class="view-toggle">
          <label class="ios-toggle">
            <input id="viewToggle" type="checkbox" checked>
            <span class="slider"></span>
            <span class="label" id="viewToggleLabel"><?php echo htmlspecialchars($t['viewToggleLabel']); ?></span>
          </label>
        </div>
        <button id="showMineBtn"><?php echo htmlspecialchars($t['showMineBtn']); ?></button>
        <button id="fullScheduleBtn"><?php echo htmlspecialchars($t['fullScheduleBtn']); ?></button>
        <input id="search" type="search" placeholder="<?php echo htmlspecialchars($t['searchPlaceholder']); ?>" aria-label="<?php echo htmlspecialchars($t['searchAriaLabel']); ?>">
        <select id="levelFilter" aria-label="<?php echo htmlspecialchars($t['levelFilterAriaLabel']); ?>">
          <option value=""><?php echo htmlspecialchars($t['levelAll']); ?></option>
        </select>
        <select id="categoryFilter" aria-label="<?php echo htmlspecialchars($t['categoryFilterAriaLabel']); ?>">
          <option value=""><?php echo htmlspecialchars($t['categoryAll']); ?></option>
          <option value="MGT">MGT</option>
          <option value="FIN">FIN</option>
          <option value="STAT">STAT</option>
          <option value="ACC">ACC</option>
          <option value="MIS">MIS</option>
          <option value="ECON">ECON</option>
        </select>
        <select id="concentrationFilter" aria-label="<?php echo $lang === 'ar' ? 'التركيز ' : 'Concentration'; ?>">
          <option value=""></option>
        </select>
        <button id="copyBtn"><?php echo htmlspecialchars($t['copyBtn']); ?></button>
        <button id="pdfBtn"><?php echo htmlspecialchars($t['pdfBtn']); ?></button>
        <button id="pdfClientBtn"><?php echo htmlspecialchars($t['pdfClientBtn']); ?></button>
        <button id="saveBtn"><?php echo htmlspecialchars($t['saveBtn']); ?></button>
        <button id="loadBtn"><?php echo htmlspecialchars($t['loadBtn']); ?></button>
      </div>
    </header>

    <main class="container">
      <p class="program"><?php echo htmlspecialchars($t['program']); ?> <a href="https://seu.edu.sa/afsc/en/bachelor-programs/business-administration/" target="_blank" rel="noopener"><?php echo htmlspecialchars($t['programLink']); ?></a>.</p>
      <section id="list"></section>
      <section id="table" style="display: none;"></section>
    </main>

    <footer class="container">
      <a href="https://shjrh.sa" target="_blank" rel="noopener"><?php echo htmlspecialchars($t['footerText']); ?></a>
      <span class="separator">|</span>
      <button id="reportBtn" class="report-link"><?php echo htmlspecialchars($t['reportBtn']); ?></button>
    </footer>

    <!-- Full Schedule Popup -->
    <div id="fullScheduleModal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2 id="fullScheduleTitle"><?php echo htmlspecialchars($t['fullScheduleTitle']); ?></h2>
        <div class="schedule-nav" id="scheduleNav">
          <button class="nav-btn" data-day="all"><?php echo $lang === 'ar' ? 'الكل' : 'All'; ?></button>
          <button class="nav-btn" data-day="Thursday"><?php echo $lang === 'ar' ? 'الخميس' : 'Thursday'; ?></button>
          <button class="nav-btn" data-day="Sunday"><?php echo $lang === 'ar' ? 'الأحد' : 'Sunday'; ?></button>
          <button class="nav-btn" data-day="Monday"><?php echo $lang === 'ar' ? 'الاثنين' : 'Monday'; ?></button>
          <button class="nav-btn" data-day="Tuesday"><?php echo $lang === 'ar' ? 'الثلاثاء' : 'Tuesday'; ?></button>
          <button class="nav-btn" data-day="Wednesday"><?php echo $lang === 'ar' ? 'الأربعاء' : 'Wednesday'; ?></button>
        </div>
        <div id="fullScheduleList"></div>
      </div>
    </div>
    
    <!-- Report Form Popup -->
    <div id="reportModal" class="modal">
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2 id="reportTitle"><?php echo htmlspecialchars($t['reportTitle']); ?></h2>
        <form id="reportForm">
          <div class="form-group">
            <label for="reportName" id="reportNameLabel"><?php echo htmlspecialchars($t['nameLabel']); ?></label>
            <input type="text" id="reportName" name="name" placeholder="<?php echo htmlspecialchars($t['namePlaceholder']); ?>">
          </div>
          <div class="form-group">
            <label for="reportSubject" id="reportSubjectLabel"><?php echo htmlspecialchars($t['subjectLabel']); ?></label>
            <input type="text" id="reportSubject" name="subject" required placeholder="<?php echo htmlspecialchars($t['subjectPlaceholder']); ?>">
          </div>
          <div class="form-group">
            <label for="reportType" id="reportTypeLabel"><?php echo htmlspecialchars($t['typeLabel']); ?></label>
            <select id="reportType" name="type" required>
              <option value=""><?php echo htmlspecialchars($t['typePlaceholder']); ?></option>
              <option value="wrong_time"><?php echo htmlspecialchars($t['wrongTime']); ?></option>
              <option value="wrong_date"><?php echo htmlspecialchars($t['wrongDate']); ?></option>
              <option value="wrong_info"><?php echo htmlspecialchars($t['wrongInfo']); ?></option>
              <option value="missing"><?php echo htmlspecialchars($t['missing']); ?></option>
              <option value="other"><?php echo htmlspecialchars($t['other']); ?></option>
            </select>
          </div>
          <div class="form-group">
            <label for="reportDetails" id="reportDetailsLabel"><?php echo htmlspecialchars($t['detailsLabel']); ?></label>
            <textarea id="reportDetails" name="details" required rows="4" placeholder="<?php echo htmlspecialchars($t['detailsPlaceholder']); ?>"></textarea>
          </div>
          <div class="form-group math-challenge">
            <label id="mathQuestion"></label>
            <input type="number" id="mathAnswer" name="math" required placeholder="<?php echo htmlspecialchars($t['mathAnswerPlaceholder']); ?>">
          </div>
          <button type="submit" class="submit-btn" id="submitBtn"><?php echo htmlspecialchars($t['submitBtn']); ?></button>
        </form>
      </div>
    </div>
    <!-- BY SHJRH SERVICES -->
    <script>
      window.PAGE_SETTINGS = null;
      window.INITIAL_LANG = '<?php echo $lang; ?>';
    </script>
    <script src="./app.js"></script>
    <script src="./modals.js"></script>
  </body>
  <!-- FOR MORE INFO CONTACT ME OVER Telegram: @iH4xz -->
</html>
