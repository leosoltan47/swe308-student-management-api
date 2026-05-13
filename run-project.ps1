param(
  [string]$MysqlExe = "",
  [string]$MysqlUser = "root",
  [string]$MysqlPassword = "",
  [switch]$SkipDatabaseSetup
)

$ErrorActionPreference = "Stop"

function Write-Step {
  param([string]$Message)
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Find-Mysql {
  if ($MysqlExe -and (Test-Path -LiteralPath $MysqlExe)) {
    return $MysqlExe
  }

  $command = Get-Command mysql -ErrorAction SilentlyContinue
  if ($command) {
    return $command.Source
  }

  $knownPaths = @(
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Workbench 8.0\mysql.exe",
    "C:\xampp\mysql\bin\mysql.exe"
  )

  foreach ($path in $knownPaths) {
    if (Test-Path -LiteralPath $path) {
      return $path
    }
  }

  throw "Could not find mysql.exe. Install MySQL or pass -MysqlExe `"C:\path\to\mysql.exe`"."
}

function Write-EnvFile {
  param([string]$Password)

  $envContent = @"
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=$MysqlUser
DB_PASSWORD=$Password
DB_NAME=swe308_demo
DB_CONNECTION_LIMIT=10
"@

  Set-Content -Path ".env" -Value $envContent -Encoding ASCII
}

Set-Location -Path $PSScriptRoot

Write-Step "SWE308 Student Management API runner"
Write-Host "Project folder: $PSScriptRoot"

Write-Step "Checking Node.js and npm"
node --version
npm --version

Write-Step "Installing npm packages"
# Installs npm packages from package.json, such as express, mysql2, dotenv, and supertest.
npm install

if (-not $SkipDatabaseSetup) {
  Write-Step "Preparing MySQL database"

  # Finds MySQL automatically by checking PATH, Program Files, and XAMPP paths.
  $mysql = Find-Mysql
  Write-Host "Using MySQL executable: $mysql"

  if (-not $MysqlPassword) {
    # Asks for your MySQL password without showing it on the screen.
    $securePassword = Read-Host "Enter MySQL password for user '$MysqlUser'" -AsSecureString
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
    try {
      $MysqlPassword = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    } finally {
      [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    }
  }

  Write-Step "Writing .env"
  # Writes .env with the MySQL username, password, database name, and port.
  Write-EnvFile -Password $MysqlPassword

  Write-Step "Importing sql/init.sql into MySQL"
  # Imports sql/init.sql, which creates the database, tables, foreign key, and sample data.
  Get-Content -Path "sql/init.sql" | & $mysql "-u$MysqlUser" "-p$MysqlPassword"
} else {
  Write-Step "Skipping database setup"
  if (-not (Test-Path -LiteralPath ".env")) {
    if (Test-Path -LiteralPath ".env.example") {
      Copy-Item -LiteralPath ".env.example" -Destination ".env"
    } else {
      Write-EnvFile -Password "your_mysql_password"
    }
  }
}

Write-Step "Running automated tests"
# Runs the automated API tests in tests/student-api.test.js.
npm test

Write-Step "Starting API"
Write-Host "Open this in your browser after the server starts:"
Write-Host "http://localhost:3000"
Write-Host "http://localhost:3000/api/students"
Write-Host ""
Write-Host "Press Ctrl+C in this terminal to stop the server." -ForegroundColor Yellow
# Starts the Express API by running the package.json start script: node app.js.
npm start
