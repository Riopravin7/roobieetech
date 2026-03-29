$files = @('embedded-systems.html','workshop.html','digital-marketing.html','final-year-projects.html','internship.html','website-design.html','courses.html')

$themeWrapper = @'
                <div id="themeToggleWrapper" style="display:flex;align-items:center;">
                    <button class="theme-toggle" id="themeToggle" title="Toggle theme" onclick="var l=document.body.classList.toggle('light-mode');localStorage.setItem('theme',l?'light':'dark');">
                        <svg id="themeIcon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </button>
                </div>
                <div class="nav-auth" id="navAuth">
'@

foreach ($file in $files) {
    $path = "d:\trial web\$file"
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    $content = $content -replace '<div class="nav-auth" id="navAuth">', $themeWrapper.Trim()
    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Host "Updated: $file"
}
Write-Host 'Done!'
