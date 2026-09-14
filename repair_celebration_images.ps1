$root = 'C:\Users\HMTL\Documents\cloud9-main'
$files = @(
    'hill-top-suite.html', 'premium-suite.html', '3-bedroom-luxury-villa.html',
    '4-bedroom-luxury-villa.html', '6-bedroom-luxury-villa.html',
    'aranya-honeymoon-suite.html', 'deluxe-cottage.html', 'deluxe-suite.html',
    'family-deluxe-cottage.html', 'hill-top-deluxe-cottage.html'
)
$replacements = [ordered]@{
    'Cloud 9 Compress Images/All Images/honeymoon.webp' = 'Honeymoon Suit.webp'
    'Cloud 9 Compress Images/All Images/birthday.webp' = 'Cloud 9 Compress Images/All Images/Born Fire 2.webp'
    'Cloud 9 Compress Images/All Images/anniversary.webp' = 'couple.jpeg'
    'Cloud 9 Compress Images/All Images/candlelight-dinner.webp' = 'Cloud 9 Compress Images/All Images/Restaurant/Candle light dinne r2.webp'
    'Cloud 9 Compress Images/All Images/babymoon.webp' = 'Honeymoon Suit.webp'
    'Cloud 9 Compress Images/All Images/family-celebration.webp' = 'Cloud 9 Compress Images/All Images/Family deluxe cott - outer pics.webp'
}
$utf8 = [System.Text.UTF8Encoding]::new($false)
foreach ($name in $files) {
    $path = Join-Path $root $name
    $text = [System.IO.File]::ReadAllText($path)
    $updated = $text
    foreach ($replacement in $replacements.GetEnumerator()) {
        $updated = $updated.Replace($replacement.Key, $replacement.Value)
    }
    [System.IO.File]::WriteAllText($path, $updated, $utf8)
    Write-Host "Updated: $name"
}
