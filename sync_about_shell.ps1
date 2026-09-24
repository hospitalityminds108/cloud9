$root = 'C:\Users\HMTL\Documents\cloud9-main'
$indexPath = Join-Path $root 'index.html'
$aboutPath = Join-Path $root 'about.html'
$index = [System.IO.File]::ReadAllText($indexPath)
$about = [System.IO.File]::ReadAllText($aboutPath)
$headerMatch = [regex]::Match($index, '(?s)    <!-- ===== HEADER ===== -->.*?    </nav>\r?\n\r?\n    <!-- ===== MAIN CONTENT ===== -->')
if (-not $headerMatch.Success) { throw 'Homepage header shell not found.' }
$header = $headerMatch.Value -replace '\r?\n\r?\n    <!-- ===== MAIN CONTENT ===== -->$', ''
$aboutHeaderMatch = [regex]::Match($about, '(?s)<header class="site-header".*?</nav>\r?\n\r?\n<main')
if (-not $aboutHeaderMatch.Success) { throw 'About header shell not found.' }
$about = $about.Remove($aboutHeaderMatch.Index, $aboutHeaderMatch.Length).Insert($aboutHeaderMatch.Index, ($header.TrimStart() + "`r`n`r`n<main"))
$footerMatch = [regex]::Match($index, '(?s)    <!-- ===== FOOTER ===== -->.*?    </div>\r?\n\r?\n    <script src="main.js" defer></script>')
if (-not $footerMatch.Success) { throw 'Homepage footer shell not found.' }
$footer = $footerMatch.Value
$aboutFooterMatch = [regex]::Match($about, '(?s)<footer class="site-footer".*?</footer>.*?(?=<script|</body>)')
if (-not $aboutFooterMatch.Success) { throw 'About footer shell not found.' }
$about = $about.Remove($aboutFooterMatch.Index, $aboutFooterMatch.Length).Insert($aboutFooterMatch.Index, $footer.Trim())
[System.IO.File]::WriteAllText($aboutPath, $about, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Synchronized About header and footer with index.html.'
