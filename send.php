<?php
header('Content-Type: application/json');
$file = __DIR__ . '/messages.txt';

$username = $_POST['username'] ?? 'Anonymous';
$message  = $_POST['message']  ?? '';
$time     = date('H:i');

if (!$message) {
    echo json_encode(['status'=>'error']);
    exit;
}

$line = time() . '|' . $username . '|' . $message . '|' . $time . PHP_EOL;
file_put_contents($file, $line, FILE_APPEND | LOCK_EX);

echo json_encode(['status'=>'ok', 'id' => time()]);
?>