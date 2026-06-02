@echo off
REM ================================================
REM UrbanFix Project - 15 Slide Presentation Generator
REM ================================================
REM This command generates a professional presentation from PROJECT_PRESENTATION.md
REM
REM Requirements:
REM 1. Node.js installed (download from https://nodejs.org/)
REM 2. Marp CLI installed globally
REM 3. Your project presentation file
REM
REM ================================================

cls
echo.
echo ============================================
echo  UrbanFix Project Presentation Generator
echo ============================================
echo.

REM Check if Node.js is installed
echo Checking for Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo ✓ Node.js is installed

REM Check if Marp CLI is installed globally
echo.
echo Checking for Marp CLI...
marp --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo Marp CLI not found. Installing globally...
    echo This will take a minute...
    echo.
    call npm install -g @marp-team/marp-cli
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install Marp CLI
        echo Please run this command manually: npm install -g @marp-team/marp-cli
        echo.
        pause
        exit /b 1
    )
)
echo ✓ Marp CLI is ready

REM Generate presentation in multiple formats
echo.
echo ============================================
echo  Generating Presentation...
echo ============================================
echo.

REM Get the directory where the batch file is located
set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"

REM Generate HTML presentation (for viewing in browser)
echo [1/3] Generating HTML presentation...
call marp PROJECT_PRESENTATION.md -o PROJECT_PRESENTATION.html
if errorlevel 1 (
    echo ERROR: Failed to generate HTML presentation
    pause
    exit /b 1
)
echo ✓ HTML presentation created: PROJECT_PRESENTATION.html

REM Generate PDF presentation
echo [2/3] Generating PDF presentation...
call marp PROJECT_PRESENTATION.md -o PROJECT_PRESENTATION.pdf --pdf
if errorlevel 1 (
    echo ERROR: Failed to generate PDF presentation
    pause
    exit /b 1
)
echo ✓ PDF presentation created: PROJECT_PRESENTATION.pdf

REM Generate PPTX presentation (PowerPoint format)
echo [3/3] Generating PowerPoint presentation...
call marp PROJECT_PRESENTATION.md -o PROJECT_PRESENTATION.pptx
if errorlevel 1 (
    echo ERROR: Failed to generate PowerPoint presentation
    pause
    exit /b 1
)
echo ✓ PowerPoint presentation created: PROJECT_PRESENTATION.pptx

REM Success message
echo.
echo ============================================
echo  ✓ SUCCESS! Presentation Generated
echo ============================================
echo.
echo Generated files:
echo  • PROJECT_PRESENTATION.html  (View in browser)
echo  • PROJECT_PRESENTATION.pdf   (PDF version)
echo  • PROJECT_PRESENTATION.pptx  (PowerPoint)
echo.
echo Location: %SCRIPT_DIR%
echo.
echo To view presentations:
echo  - HTML: Open in any web browser
echo  - PDF: Open with PDF reader
echo  - PPTX: Open with Microsoft PowerPoint or LibreOffice
echo.
pause
