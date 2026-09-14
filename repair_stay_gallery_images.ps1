$root = 'C:\Users\HMTL\Documents\cloud9-main'
$replacements = @{
    '3-bedroom-luxury-villa.html' = [ordered]@{
        'Cloud 9 Compress Images/All Images/Duplex Master bedroom.webp' = 'Cloud 9 Compress Images/All Images/DUPLEX/Duplex Master bedroom.webp'
        'Cloud 9 Compress Images/All Images/Duplex Bedroom 1.webp' = 'Cloud 9 Compress Images/All Images/DUPLEX/Duplex Bedroom 1.webp'
        'Cloud 9 Compress Images/All Images/Duplex Bedroom 2.webp' = 'Cloud 9 Compress Images/All Images/DUPLEX/Duplex Bedroom 2.webp'
        'Cloud 9 Compress Images/All Images/Duplex washroom.webp' = 'Cloud 9 Compress Images/All Images/DUPLEX/Duplex washroom.webp'
    }
    '4-bedroom-luxury-villa.html' = [ordered]@{
        'Cloud 9 Compress Images/All Images/Duplex Living room.webp' = 'Cloud 9 Compress Images/All Images/4 BHK/04 Bhk living room.webp'
        'Cloud 9 Compress Images/All Images/Duplex Bedroom 1.webp' = 'Cloud 9 Compress Images/All Images/4 BHK/04 Bhk Bedroom 1.webp'
        'Cloud 9 Compress Images/All Images/Duplex Bedroom 2.webp' = 'Cloud 9 Compress Images/All Images/4 BHK/04 Bhk Bedroom 2.webp'
    }
}
$utf8 = [System.Text.UTF8Encoding]::new($false)
foreach ($name in $replacements.Keys) {
    $path = Join-Path $root $name
    $text = [System.IO.File]::ReadAllText($path)
    foreach ($replacement in $replacements[$name].GetEnumerator()) {
        $text = $text.Replace($replacement.Key, $replacement.Value)
    }
    [System.IO.File]::WriteAllText($path, $text, $utf8)
    Write-Host "Updated: $name"
}
