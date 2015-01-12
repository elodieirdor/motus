<?php
$file = __DIR__.'/src/all.txt';
$sixLettersFile = __DIR__.'/src/level-0.json';
$nineLettersFile = __DIR__.'/src/level-1.json';

$sixLetters = [];
$nineLetters = [];

$handle = @fopen($file, "r");
if ($handle) {
    while (($buffer = fgets($handle, 4096)) !== false) {
        $buffer = trim($buffer);
        // remove names
        if (!ctype_lower($buffer)) {
            continue;
        }
        $nbLetters = strlen($buffer);
        if ($nbLetters == 6) {
            $sixLetters[] = '"' . $buffer. '"';
        } elseif ($nbLetters == 9) {
            $nineLetters[] = '"' . $buffer. '"';
        }
    }
    if (!feof($handle)) {
        echo "Erreur: fgets() a échoué\n";
    }
    fclose($handle);
}

// generate six letters file
$content = implode(',', $sixLetters);
$content =  '{"words":[' . $content . ']}';
$fp = fopen($sixLettersFile, 'w');
fwrite($fp, $content);
fclose($fp);

// generate nine letters file
$content = implode(',', $nineLetters);
$content =  '{"words":[' . $content . ']}';
$fp = fopen($nineLettersFile, 'w');
fwrite($fp, $content);
fclose($fp);