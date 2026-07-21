# =====================================
# Rovito Server Setup
# =====================================

$root = "server/src"

$folders = @(
"config",
"constants",
"enums",

"integrations",
"integrations/google",
"integrations/stripe",
"integrations/email",

"middlewares",

"modules",
"modules/auth",
"modules/users",
"modules/bookings",
"modules/vehicles",
"modules/payments",
"modules/notifications",
"modules/dashboard",

"routes",

"utils",

"validations",

"jobs",

"webhooks"
)

foreach($folder in $folders)
{
    New-Item -ItemType Directory -Force -Path "$root/$folder" | Out-Null
}

Write-Host ""
Write-Host "======================================="
Write-Host "Server Structure Created Successfully"
Write-Host "======================================="
