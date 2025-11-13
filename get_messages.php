<?php
header('Content-Type: application/json');
$file = __DIR__ . '/messages.txt';

if (!file_exists($file)) {
    echo json_encode([]);
    exit;
}

$lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$messages = [];

foreach ($lines as $line) {
    [$id, $user, $msg, $time] = explode('|', $line, 4);
    $messages[] = [
        'id' => $id,
        'username' => htmlspecialchars($user),
        'message'  => htmlspecialchars($msg),
        'time'     => $time
    ];
}

echo json_encode($messages);
?>