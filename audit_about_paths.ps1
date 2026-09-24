$root = 'C:\Users\HMTL\Documents\cloud9-main'
$file = Join-Path $root 'about.html'
$text = [System.IO.File]::ReadAllText($file)
$missing = @()
foreach ($match in [regex]::Matches($text, '<(?:img|source|video)\b[^>]*\b(?:src|poster)=["'']([^"'']+)["'']', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    $src = $match.Groups[1].Value
    if ($src -match '^(https?:|data:)') { continue }
    $resolved = Join-Path $root ($src -replace '/', '\')
    if (-not (Test-Path -LiteralPath $resolved -PathType Leaf)) { $missing += $src }
}
if ($missing.Count -eq 0) { Write-Host 'All About page local media paths resolve.' } else { $missing | Sort-Object -Unique | ForEach-Object { Write-Host $_ }; exit 1 }
