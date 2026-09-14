$root = 'C:\Users\HMTL\Documents\cloud9-main'
$pages = @(
    'stay.html', 'hill-top-suite.html', 'premium-suite.html', '3-bedroom-luxury-villa.html',
    '4-bedroom-luxury-villa.html', '6-bedroom-luxury-villa.html',
    'aranya-honeymoon-suite.html', 'deluxe-cottage.html', 'deluxe-suite.html',
    'family-deluxe-cottage.html', 'hill-top-deluxe-cottage.html'
)
$missing = @()
foreach ($page in $pages) {
    $path = Join-Path $root $page
    $text = [System.IO.File]::ReadAllText($path)
    foreach ($match in [regex]::Matches($text, '<img\b[^>]*\bsrc=["'']([^"'']+)["'']', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
        $src = $match.Groups[1].Value
        if ($src -match '^(https?:|data:)') { continue }
        $resolved = Join-Path $root ($src -replace '/', '\')
        if (-not (Test-Path -LiteralPath $resolved -PathType Leaf)) {
            $missing += "$page`t$src"
        }
    }
}
if ($missing.Count -eq 0) {
    Write-Host 'All Stay page image paths resolve.'
} else {
    Write-Host 'Missing Stay page image paths:'
    $missing | Sort-Object -Unique | ForEach-Object { Write-Host $_ }
    exit 1
}
