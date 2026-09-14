$root = 'C:\Users\HMTL\Documents\cloud9-main'
$files = @(
    'hill-top-suite.html', 'premium-suite.html', '3-bedroom-luxury-villa.html',
    '4-bedroom-luxury-villa.html', '6-bedroom-luxury-villa.html',
    'aranya-honeymoon-suite.html', 'deluxe-cottage.html', 'deluxe-suite.html',
    'family-deluxe-cottage.html', 'hill-top-deluxe-cottage.html'
)
$old = 'src="couple.jpeg" alt="Anniversary Celebration at Cloud 9 Hills Resort"'
$new = 'src="Cloud 9 Compress Images/All Images/Restaurant/Candle light dinne r2.webp" alt="Anniversary Celebration at Cloud 9 Hills Resort"'
$utf8 = [System.Text.UTF8Encoding]::new($false)
foreach ($name in $files) {
    $path = Join-Path $root $name
    $text = [System.IO.File]::ReadAllText($path)
    if (-not $text.Contains($old)) { throw "Anniversary image not found: $name" }
    $updated = $text.Replace($old, $new)
    [System.IO.File]::WriteAllText($path, $updated, $utf8)
    Write-Host "Updated: $name"
}
