<?php
$file = __DIR__ . '/messages.txt';
$id = $_POST['id'] ?? '';

if (!$id || !file_exists($file)) exit;

$lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$newLines = array_filter($lines, fn($line) => !str_starts_with($line, $id . '|'));

file_put_contents($file, implode(PHP_EOL, $newLines) . PHP_EOL);
?>