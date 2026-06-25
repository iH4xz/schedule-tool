<?php
header('Content-Type: application/json');

// Load Telegram configuration from config.php
if (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
}

if (!defined('TELEGRAM_BOT_TOKEN') || !defined('TELEGRAM_CHAT_ID') || empty(TELEGRAM_BOT_TOKEN) || empty(TELEGRAM_CHAT_ID)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'إعدادات تلجرام غير مكتملة. الرجاء التحقق من وجود config.php']);
    exit;
}

// Basic security checks
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Rate limiting (simple implementation)
session_start();
$now = time();
$lastSubmit = $_SESSION['last_report_submit'] ?? 0;
if ($now - $lastSubmit < 60) { // 1 minute between submissions
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'الرجاء الانتظار قبل إرسال بلاغ آخر']);
    exit;
}

// Validate and sanitize inputs
$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : 'غير محدد';
$subject = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])) : '';
$type = isset($_POST['type']) ? trim($_POST['type']) : '';
$details = isset($_POST['details']) ? trim(strip_tags($_POST['details'])) : '';

// Validation
if (empty($subject) || empty($type) || empty($details)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'الرجاء ملء جميع الحقول المطلوبة']);
    exit;
}

// Map type to Arabic
$typeMap = [
    'wrong_time' => 'خطأ في الوقت',
    'wrong_date' => 'خطأ في التاريخ',
    'wrong_info' => 'معلومات خاطئة',
    'missing' => 'مقرر ناقص',
    'other' => 'أخرى'
];
$typeArabic = $typeMap[$type] ?? $type;

// Prepare message for Telegram using HTML formatting
$message = "<b>🔔 إبلاغ جديد من أداة الجداول</b>\n\n";
$message .= "<b>👤 الاسم:</b> " . htmlspecialchars($name, ENT_QUOTES | ENT_HTML5, 'UTF-8') . "\n";
$message .= "<b>📚 المقرر:</b> " . htmlspecialchars($subject, ENT_QUOTES | ENT_HTML5, 'UTF-8') . "\n";
$message .= "<b>📋 نوع الإبلاغ:</b> " . htmlspecialchars($typeArabic, ENT_QUOTES | ENT_HTML5, 'UTF-8') . "\n";
$message .= "<b>📝 التفاصيل:</b>\n" . htmlspecialchars($details, ENT_QUOTES | ENT_HTML5, 'UTF-8') . "\n\n";
$message .= "<b>⏰ الوقت:</b> " . date('Y-m-d H:i:s') . "\n";
$message .= "<b>🌐 IP:</b> " . htmlspecialchars($_SERVER['REMOTE_ADDR'] ?? 'Unknown', ENT_QUOTES | ENT_HTML5, 'UTF-8');

// Send to Telegram
$telegramUrl = "https://api.telegram.org/bot" . TELEGRAM_BOT_TOKEN . "/sendMessage";
$postData = [
    'chat_id' => TELEGRAM_CHAT_ID,
    'text' => $message,
    'parse_mode' => 'HTML'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $telegramUrl);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $_SESSION['last_report_submit'] = $now;
    echo json_encode(['success' => true, 'message' => 'تم إرسال البلاغ بنجاح']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'فشل إرسال البلاغ. الرجاء المحاولة لاحقاً']);
}

