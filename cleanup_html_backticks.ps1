$root = 'C:\Users\HMTL\Documents\cloud9-main'
$files = Get-ChildItem -Path $root -Filter '*.html' -Recurse
foreach ($file in $files) {
    $text = [System.IO.File]::ReadAllText($file.FullName, [System.Text.UTF8Encoding]::new($false))
    $clean = $text.Replace('`n', '').Replace('`r', '')
    $latin1 = [System.Text.Encoding]::GetEncoding(1252)
    $utf8 = [System.Text.UTF8Encoding]::new($false, $false)
    for ($pass = 0; $pass -lt 3; $pass++) {
        if ($clean -notmatch '[\u00C3\u00C2\u00E2\u00EF]') { break }
        $decoded = $utf8.GetString($latin1.GetBytes($clean))
        if ($decoded -eq $clean) { break }
        $clean = $decoded
    }
    if ($clean -ne $text) {
        [System.IO.File]::WriteAllText($file.FullName, $clean, [System.Text.UTF8Encoding]::new($false))
        Write-Host "Cleaned $($file.FullName)"
    }
}
Write-Host 'Finished cleaning malformed backtick markers from all HTML files.'
