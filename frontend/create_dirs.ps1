# Script para crear la estructura de directorios del proyecto

$directories = @(
    "src\components\layout",
    "src\components\ui",
    "src\components\home",
    "src\components\projects",
    "src\components\contact",
    "src\pages",
    "src\hooks",
    "src\context",
    "src\i18n",
    "src\services",
    "src\assets\images",
    "src\assets\fonts"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
        Write-Host "Creado directorio: $dir"
    } else {
        Write-Host "El directorio ya existe: $dir"
    }
}