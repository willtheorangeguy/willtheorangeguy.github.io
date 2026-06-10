<#
.SYNOPSIS
    Adds a new short-link redirect under public/r/.

.PARAMETER Slug
    The URL slug (subfolder name), e.g. "gh" for /r/gh.

.PARAMETER Description
    Human-readable label shown in the index and README, e.g. "GitHub Profile".

.PARAMETER Destination
    The full destination URL, e.g. "https://github.com/willtheorangeguy".

.EXAMPLE
    .\add-redirect.ps1 -Slug gh -Description "GitHub Profile" -Destination "https://github.com/willtheorangeguy"
#>
param(
    [Parameter(Mandatory)][string]$Slug,
    [Parameter(Mandatory)][string]$Description,
    [Parameter(Mandatory)][string]$Destination
)

$ErrorActionPreference = 'Stop'
$rDir = Join-Path $PSScriptRoot "public\r"
$slugDir = Join-Path $rDir $Slug

# --- Guard: slug must not already exist ---
if (Test-Path $slugDir) {
    Write-Error "Slug '$Slug' already exists at $slugDir. Aborting."
    exit 1
}

$shortUrl = "https://williamvdg.me/r/$Slug"

# --- 1. Create the redirect page ---
New-Item -ItemType Directory -Path $slugDir | Out-Null

$redirectHtml = @"
<!doctype html>
<html lang="en-CA">
    <head>
        <meta charset="UTF-8" />
        <meta
            http-equiv="refresh"
            content="0; url=$Destination"
        />
        <script type="text/javascript">
            window.location.href = "$Destination";
        </script>
        <title>$Description Redirection</title>
    </head>
    <body>
        If you are not redirected automatically, follow this
        <a href="$Destination">link to $Description</a>.
        <script
            async
            defer
            src="https://scripts.simpleanalyticscdn.com/latest.js"
        ></script>
        <noscript
            ><img
                src="https://queue.simpleanalyticscdn.com/noscript.gif"
                alt=""
                referrerpolicy="no-referrer-when-downgrade"
        /></noscript>
    </body>
</html>
"@

Set-Content -Path (Join-Path $slugDir "index.html") -Value $redirectHtml -Encoding UTF8 -NoNewline
Write-Host "Created $slugDir\index.html"

# --- 2. Update public/r/index.html ---
$indexPath = Join-Path $rDir "index.html"
$indexContent = Get-Content $indexPath -Raw -Encoding UTF8

$newListItem = "        <li>$Description`: <a href=`"$shortUrl`">/$Slug</a></li>`n"
if ($indexContent -notmatch '</ul>') {
    Write-Error "Could not find </ul> in $indexPath. Aborting index.html update."
    exit 1
}
$indexContent = $indexContent -replace '</ul>', "$newListItem    </ul>"
Set-Content -Path $indexPath -Value $indexContent -Encoding UTF8 -NoNewline
Write-Host "Updated $indexPath"

# --- 3. Update public/r/README.md ---
$readmePath = Join-Path $rDir "README.md"
$readmeContent = Get-Content $readmePath -Raw -Encoding UTF8

$newRow = "| $Description | $shortUrl | $Destination |"
# Append after the last table row (trim trailing newline, add row, restore newline)
$readmeContent = $readmeContent.TrimEnd("`r", "`n") + "`n$newRow`n"
Set-Content -Path $readmePath -Value $readmeContent -Encoding UTF8 -NoNewline
Write-Host "Updated $readmePath"

Write-Host ""
Write-Host "Done! New redirect: $shortUrl -> $Destination"
