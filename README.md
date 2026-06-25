# أداة جداول الاختبارات - كلية إدارة الأعمال (جامعة شاه) | Exam Schedule Tool - Business Administration College

[العربية](#العربية) | [English](#english)

---

## العربية

أداة ويب تفاعلية وسهلة الاستخدام لمساعدة طلاب كلية إدارة الأعمال في الجامعة السعودية الإلكترونية (SEU) على استعراض وتنظيم ومتابعة جداول اختباراتهم (منتصف الفصل الدراسي - أكتوبر 2025).

### 🌟 المميزات
- **ثنائية اللغة:** دعم كامل للغتين العربية والإنجليزية.
- **تصفية ذكية:** فلترة المقررات حسب المستوى الدراسي، التصنيف (مثال: MGT, FIN, ACC)، والتركيز الأكاديمي.
- **بحث متقدم وحي:** ابحث فوراً عن أي مقرر باسمه أو رمزه.
- **المزامنة المحلية:** حفظ الجدول المخصص الخاص بك في ذاكرة المتصفح المحلية (Local Storage) واسترجاعه في أي وقت.
- **تصدير سهل:** 
  - نسخ الجدول المختار كنص منسق لمشاركته بسهولة.
  - استخراج الجدول كملف PDF بتنسيقين مختلفين (A4 للطباعة أو التنزيل المباشر).
- **جدول كامل تفاعلي:** استعراض الجدول العام لجميع المقررات مقسمة حسب الأيام والجلسات مع فلترة سريعة.
- **نظام إبلاغ ذكي:** إرسال بلاغات عن الأخطاء أو المقررات الناقصة مباشرة إلى إدارة الأداة عبر تيليجرام.

### 🛠️ البنية التقنية والتثبيت
الأداة مبنية باستخدام التقنيات الأساسية البسيطة لضمان خفة الوزن والسرعة الفائقة:
- **الواجهة:** HTML5, CSS3 (تصميم متجاوب ومتناسق مع الأجهزة المحمولة والـ Dark Mode).
- **المنطق والتشغيل:** JavaScript (Vanilla JS).
- **الخلفية:** PHP لتهيئة اللغة الأساسية واستقبال بلاغات التعديل وإرسالها إلى Telegram Bot API.
- **التبادل البرمجي:** JSON لتخزين وتحديث بيانات المقررات والجلسات والإعدادات (`data/`).

#### طريقة التشغيل محلياً:
1. قم بوضع مجلد المشروع داخل خادم محلي مثل XAMPP أو WampServer (في مسار `htdocs`).
2. قم بإنشاء ملف `config.php` في الجذر بناءً على النموذج `config.example.php` وأضف توكن البوت وتيليجرام Chat ID الخاص بك لاستقبال الإبلاغات:
   ```php
   <?php
   define('TELEGRAM_BOT_TOKEN', 'TOKEN_HERE');
   define('TELEGRAM_CHAT_ID', 'CHAT_ID_HERE');
   ```
3. افتح المتصفح وتوجه إلى الرابط المحلي (مثال: `http://localhost/schedule-tool`).

---

## English

An interactive, user-friendly web tool designed to help Business Administration students at the Saudi Electronic University (SEU) organize, filter, and view their exam schedules (Midterm Exams - October 2025).

### 🌟 Features
- **Bilingual:** Fully supports Arabic and English out of the box.
- **Smart Filters:** Filter exams by level, category (e.g. MGT, FIN, ACC), and program concentration.
- **Instant Search:** Search for any subject by name or course code.
- **Browser Save/Load:** Save your personalized schedule to local storage and retrieve it anytime.
- **Easy Exporting:**
  - Copy selected schedule as plain text for quick sharing.
  - Export to PDF using two different modes (A4 print-ready layout or dynamic client-side pagination).
- **Interactive Full Schedule:** Browse the overall schedule divided by days and sessions with quick day filtering.
- **Report Issues:** Submit feedback or report incorrect exam times/dates directly to a Telegram bot.

### 🛠️ Architecture & Setup
The project is built on lightweight, performant native web technologies:
- **Frontend:** HTML5, CSS3 (responsive layout, mobile-friendly design with native dark mode style).
- **Client Logic:** Vanilla JavaScript.
- **Backend:** PHP for initial language routing and secure Telegram API reporting.
- **Data Store:** JSON files for settings, courses, catalog, and sessions (`data/`).

#### How to run locally:
1. Place the project files inside your local web server directory (e.g., XAMPP's `htdocs`).
2. Create a `config.php` file in the root folder based on `config.example.php` and fill in your Telegram bot details:
   ```php
   <?php
   define('TELEGRAM_BOT_TOKEN', 'TOKEN_HERE');
   define('TELEGRAM_CHAT_ID', 'CHAT_ID_HERE');
   ```
3. Open your browser and navigate to the local address (e.g. `http://localhost/schedule-tool`).

---

## 📄 License | الترخيص

هذا المشروع مرخص بموجب رخصة جي بي إل العامة (GPL-3.0) - راجع ملف [LICENSE](LICENSE) للتفاصيل.

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
