# أداة جداول الاختبارات | Exam Schedule Tool

[العربية](#العربية) | [English](#english)

---

## العربية

أداة ويب تفاعلية وسهلة الاستخدام لمساعدة الطلاب على استعراض وتنظيم ومتابعة جداول اختباراتهم بتصميم متجاوب وبسيط.

### 🌟 المميزات
- **ثنائية اللغة:** دعم كامل للغتين العربية والإنجليزية.
- **تصفية ذكية:** فلترة المقررات حسب المستوى الدراسي، التصنيف الدراسي، والتركيز الأكاديمي.
- **بحث حي:** ابحث فوراً عن أي مقرر باسمه أو رمزه.
- **المزامنة المحلية:** حفظ الجدول المخصص الخاص بك في ذاكرة المتصفح المحلية (Local Storage) واسترجاعه في أي وقت.
- **تصدير سهل:** 
  - نسخ الجدول المختار كنص منسق لمشاركته بسهولة.
  - استخراج الجدول كملف PDF بتنسيقات متعددة.
- **جدول كامل تفاعلي:** استعراض الجدول العام لجميع المقررات مقسمة حسب الأيام والجلسات.
- **نظام إبلاغ ذكي:** إرسال بلاغات عن الأخطاء مباشرة إلى تلجرام (عبر Bot API).

---

### 🛠️ التشغيل والتهيئة المحلية

1. قم بوضع مجلد المشروع داخل خادمك المحلي (مثال: مجلد `htdocs` في XAMPP).
2. قم بإنشاء ملف إعدادات تلجرام باسم `config.php` في المجلد الرئيسي للمشروع بناءً على نموذج `config.example.php`:
   ```php
   <?php
   define('TELEGRAM_BOT_TOKEN', 'أدخل_توكن_البوت_هنا');
   define('TELEGRAM_CHAT_ID', 'أدخل_معرف_المحادثة_هنا');
   ```
3. توجه للمتصفح وافتح الرابط المحلي للمشروع (مثال: `http://localhost/schedule-tool`).

---

### 🌐 شرح طريقة الرفع والنشر المباشر (Live Deployment)

لرفع الأداة وتشغيلها على خادم ويب حقيقي (مثل الاستضافات المشتركة أو لوحات التحكم cPanel أو السيرفرات الخاصة VPS)، اتبع الخطوات التالية:

#### 1. رفع الملفات
* قم بضغط ملفات المشروع (تأكد من عدم تضمين مجلد `.git` وملفات الإعدادات المحلية `config.php`).
* ارفع الملف المضغوط وفك الضغط عنه في المجلد العام للاستضافة (غالباً ما يكون باسم `public_html`).
* **تأكد** من وجود ملف `.htaccess` المرفق في المجلد الرئيسي؛ حيث يقوم بحماية الملفات الحساسة ومنع الوصول العام لمجلد `data/` ومجلد `tools/` وتفعيل تسريع التصفح.

#### 2. ضبط إعدادات تيليجرام على الخادم المباشر
* أنشئ ملف `config.php` مباشرة في المجلد الرئيسي للاستضافة.
* ضع فيه أكواد الاتصال ببوت التيليجرام الخاص بك (الموجودة أعلاه). لن يتمكن أي شخص من قراءة هذا الملف لأن ملف `.htaccess` يمنع الوصول لملفات الـ PHP الحساسة والملفات الإعدادية، كما أن ملف `.gitignore` يمنع رفعه للعموم.

#### 3. إعداد وتحديث البيانات
قم بتحديث ملفات البيانات داخل مجلد `data/` لتناسب المقررات والجداول الخاصة بك:
* **`data/schedule.json`** (مثال):
  ```json
  [
    { "code": "CS101", "date": "09/10/2025", "session": "S1" }
  ]
  ```
* **`data/catalog.json`** (مثال):
  ```json
  {
    "CS101": { "name": "مقدمة في علوم الحاسب", "level": 1, "category": "CS", "concentration": "SOFTWARE_ENG" }
  }
  ```
* **`data/settings.json`**: لتعديل العناوين، الفوتر، والتصنيفات الافتراضية.

---
---

## English

An interactive, user-friendly web tool designed to help students organize, filter, and view their exam schedules.

### 🌟 Features
- **Bilingual:** Fully supports Arabic and English out of the box.
- **Smart Filters:** Filter exams by level, category, and academic concentration.
- **Instant Search:** Search for any subject by name or course code.
- **Browser Save/Load:** Save your personalized schedule to local storage.
- **Easy Exporting:**
  - Copy selected schedule as plain text.
  - Export to PDF using multiple formatting styles.
- **Interactive Full Schedule:** Browse the overall schedule divided by days and sessions.
- **Report Issues:** Submit feedback or report incorrect exam times directly to a Telegram bot.

---

### 🛠️ Local Running & Setup

1. Place the project files inside your local web server directory (e.g., XAMPP's `htdocs`).
2. Create a `config.php` file in the root folder based on `config.example.php` and fill in your Telegram bot details:
   ```php
   <?php
   define('TELEGRAM_BOT_TOKEN', 'YOUR_BOT_TOKEN_HERE');
   define('TELEGRAM_CHAT_ID', 'YOUR_CHAT_ID_HERE');
   ```
3. Open your browser and navigate to the local address (e.g. `http://localhost/schedule-tool`).

---

### 🌐 Live Server Deployment Guide

To deploy the tool live on a production web server (such as Shared Hosting, cPanel, or a VPS), follow these steps:

#### 1. Uploading Files
* Compress the project folder (excluding the `.git` folder and your local `config.php`).
* Upload and extract the ZIP archive into your web server's public directory (usually `public_html`).
* **Ensure** that the `.htaccess` file is uploaded to the root directory. It secures sensitive directories (like `data/` and `tools/`) and configures URL rewriting, compression, and caching rules.

#### 2. Setting Up Live Telegram Configuration
* Create a new file named `config.php` directly in the root directory on your live server.
* Add your Telegram Bot Token and Chat ID (as shown in the configuration step). This file is completely secure because the `.htaccess` rules prevent direct public access to sensitive files, and it is excluded from Git tracking.

#### 3. Updating Schedule Data
Modify the JSON files inside the `data/` directory to customize the schedule contents:
* **`data/schedule.json`** (Example):
  ```json
  [
    { "code": "CS101", "date": "09/10/2025", "session": "S1" }
  ]
  ```
* **`data/catalog.json`** (Example):
  ```json
  {
    "CS101": { "name": "Introduction to Computer Science", "level": 1, "category": "CS", "concentration": "SOFTWARE_ENG" }
  }
  ```
* **`data/settings.json`**: To customize titles, footer texts, links, and filter categories.

---

## 📄 License | الترخيص

هذا المشروع مرخص بموجب رخصة جي بي إل العامة (GPL-3.0) - راجع ملف [LICENSE](LICENSE) للتفاصيل.

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
