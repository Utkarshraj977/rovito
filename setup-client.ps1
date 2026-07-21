# =====================================
# Rovito Client Setup
# =====================================

$root = "client/src"

$folders = @(
"api",
"assets",
"assets/images",
"assets/icons",
"assets/fonts",

"components",
"components/common",
"components/forms",
"components/layout",
"components/maps",
"components/modals",
"components/tables",
"components/ui",

"constants",

"features",
"features/auth",
"features/auth/components",
"features/auth/hooks",

"features/booking",
"features/booking/components",
"features/booking/hooks",

"features/payment",
"features/payment/components",
"features/payment/hooks",

"features/vehicle",
"features/vehicle/components",

"features/notification",
"features/notification/components",

"features/profile",
"features/profile/components",

"hooks",

"layouts",

"pages",
"pages/auth",
"pages/customer",
"pages/admin",
"pages/shared",
"pages/errors",

"routes",

"services",

"store",

"styles",

"utils",

"validations"
)

foreach($folder in $folders)
{
    New-Item -ItemType Directory -Force -Path "$root/$folder" | Out-Null
}

$files = @(
"App.jsx",
"main.jsx",

"layouts/AdminLayout.jsx",
"layouts/CustomerLayout.jsx",

"styles/globals.css",
"styles/theme.js"
)

foreach($file in $files)
{
    New-Item -ItemType File -Force -Path "$root/$file" | Out-Null
}

Write-Host ""
Write-Host "======================================="
Write-Host "Client Structure Created Successfully"
Write-Host "======================================="