# UrbanFix Presentation Generator - Setup Guide

## Quick Start Command

### Windows Command Prompt / PowerShell:

```bash
generate_presentation.bat
```

Or if you're in a terminal at the project directory:

```bash
.\generate_presentation.bat
```

---

## What This Command Does

✅ Generates a **15-slide professional presentation** about UrbanFix project  
✅ Creates **3 output formats**:

- **HTML** - View in any web browser (interactive slides)
- **PDF** - Shareable document format
- **PowerPoint (.pptx)** - Edit in Microsoft PowerPoint

✅ Automatically installs required tools  
✅ Checks for Node.js installation  
✅ Installs Marp CLI (presentation converter)

---

## Prerequisites

### 1. Node.js (Required)

- Download from: https://nodejs.org/
- Install the LTS version
- Verify installation: Open Command Prompt and run `node --version`

### 2. Project File

- Ensure `PROJECT_PRESENTATION.md` exists in your project directory

---

## Step-by-Step Instructions

### Method 1: Easiest Way (One-Click)

1. **Open File Explorer**
   - Navigate to: `C:\Users\dell\OneDrive\Desktop\local-skilled\`

2. **Double-Click the File**
   - Find `generate_presentation.bat`
   - Double-click it
   - A command window will open automatically

3. **Wait for Completion**
   - The script will check Node.js
   - Install Marp CLI (first time only)
   - Generate all three presentation formats
   - Shows success message with file locations

### Method 2: Using Command Prompt

1. **Open Command Prompt**
   - Press `Win + R`
   - Type `cmd`
   - Press Enter

2. **Navigate to Project**

   ```bash
   cd C:\Users\dell\OneDrive\Desktop\local-skilled
   ```

3. **Run the Command**

   ```bash
   generate_presentation.bat
   ```

4. **Wait for Output**
   - Watch for success messages
   - Files will be created in the same directory

### Method 3: Using PowerShell

1. **Open PowerShell**
   - Right-click on desktop
   - Select "Open PowerShell window here"
   - Or press `Win + X` then `A`

2. **Navigate to Project**

   ```powershell
   cd C:\Users\dell\OneDrive\Desktop\local-skilled
   ```

3. **Run the Command**
   ```powershell
   .\generate_presentation.bat
   ```

---

## Output Files

After running the command, you'll get three files in your project directory:

### 📄 PROJECT_PRESENTATION.html

- **Open with:** Any web browser (Chrome, Firefox, Edge, etc.)
- **Features:**
  - Interactive slides
  - Click arrows or use arrow keys to navigate
  - Press `S` for speaker notes
  - Press `P` for presenter view
- **Best for:** Presenting on a computer, sharing with others

### 📕 PROJECT_PRESENTATION.pdf

- **Open with:** PDF reader (Acrobat Reader, browser, etc.)
- **Features:**
  - Static slides
  - Print-friendly
  - Share via email
- **Best for:** Printing, archiving, sharing as document

### 📊 PROJECT_PRESENTATION.pptx

- **Open with:** Microsoft PowerPoint, Google Slides, LibreOffice
- **Features:**
  - Edit slides
  - Add animations
  - Customize colors
  - Add speaker notes
- **Best for:** Further customization, professional presentation

---

## 15 Slides Overview

| #   | Title                       | Content                     |
| --- | --------------------------- | --------------------------- |
| 1   | Title Slide                 | Project name, student info  |
| 2   | Overview                    | What is included            |
| 3   | Project Overview            | Introduction & purpose      |
| 4   | Problem Statement           | Issues being solved         |
| 5   | Solution & Objectives       | How we solve it             |
| 6   | User Types                  | Customers, Workers, Admins  |
| 7   | Service Categories          | 6 service types             |
| 8   | Key Features - Part 1       | Authentication & Search     |
| 9   | Key Features - Part 2       | Booking & Profiles          |
| 10  | Dashboard Features          | Customer, Worker, Admin     |
| 11  | Technology Stack - Frontend | React, CSS, Animation tools |
| 12  | Technology Stack - Backend  | Node.js, Express, DB        |
| 13  | System Architecture         | Three-tier structure        |
| 14  | API Routes & Security       | Security measures           |
| 15  | Status & Impact             | Conclusion                  |

---

## Troubleshooting

### ❌ Issue: "Node.js is not installed"

**Solution:**

1. Download Node.js from https://nodejs.org/
2. Run the installer
3. Restart your computer
4. Run the batch file again

### ❌ Issue: "Marp CLI installation fails"

**Solution (Manual Installation):**

1. Open Command Prompt
2. Run: `npm install -g @marp-team/marp-cli`
3. Wait for installation to complete
4. Run `generate_presentation.bat` again

### ❌ Issue: "Command not recognized"

**Solution:**

1. Make sure you're in the correct directory
2. Check that `generate_presentation.bat` file exists
3. Try using the full path or double-click the file

### ❌ Issue: "Permission denied" error

**Solution:**

1. Right-click Command Prompt
2. Select "Run as Administrator"
3. Run the command again

---

## Viewing the Presentation

### 1. HTML Presentation (Recommended for Viewing)

```
1. Double-click PROJECT_PRESENTATION.html
2. It opens in your default browser
3. Use arrow keys or click to navigate
4. Press 'F' for fullscreen
```

### 2. PDF Presentation

```
1. Double-click PROJECT_PRESENTATION.pdf
2. Opens in your PDF reader
3. Use navigation tools to view slides
```

### 3. PowerPoint Presentation

```
1. Double-click PROJECT_PRESENTATION.pptx
2. Opens in PowerPoint
3. Edit as needed
4. Use Slideshow mode for presenting
```

---

## Complete Command for All Users

**Copy and paste this command:**

For **Windows CMD/PowerShell**:

```batch
cd C:\Users\dell\OneDrive\Desktop\local-skilled && generate_presentation.bat
```

---

## Advanced Usage

### Generate Only HTML:

```bash
marp PROJECT_PRESENTATION.md -o PROJECT_PRESENTATION.html
```

### Generate Only PDF:

```bash
marp PROJECT_PRESENTATION.md -o PROJECT_PRESENTATION.pdf --pdf
```

### Generate Only PowerPoint:

```bash
marp PROJECT_PRESENTATION.md -o PROJECT_PRESENTATION.pptx
```

### Watch for changes (auto-regenerate):

```bash
marp --watch PROJECT_PRESENTATION.md -o PROJECT_PRESENTATION.html
```

---

## After Generation

✅ Share the HTML file for interactive viewing  
✅ Share the PDF for easy distribution  
✅ Use PowerPoint for editing and presenting  
✅ All files are in your project root directory  
✅ Keep `PROJECT_PRESENTATION.md` for future updates

---

## Update Presentation

If you want to update the presentation later:

1. Edit `PROJECT_PRESENTATION.md`
2. Run `generate_presentation.bat` again
3. All files will be regenerated with your changes

---

**That's it! Your 15-slide professional presentation is ready to share! 🎉**
