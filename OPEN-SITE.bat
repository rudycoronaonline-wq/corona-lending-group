@echo off
cd /d "c:\Nello Website\corona-lending-group"

echo ============================================
echo  Corona Lending Group - OPEN FRESH BUILD
echo ============================================
echo.

echo Step 1: Building the site...
call npm run build
if errorlevel 1 (
  echo Build failed. Fix errors above.
  pause
  exit /b 1
)

echo.
echo Step 2: Starting server on port 4321...
start "Corona Lending - Server" cmd /k "cd /d c:\Nello Website\corona-lending-group && npm run preview"

echo Waiting for server to start...
timeout /t 5 /nobreak >nul

echo.
echo Step 3: Opening browser...
echo.
echo >>> OPEN THIS URL (copy if needed): http://localhost:4321
echo >>> Use Ctrl+Shift+R to hard refresh, OR open in Incognito (Ctrl+Shift+N)
echo.
start http://localhost:4321

echo.
echo If you see a GREEN bar saying "You're viewing the latest update" - you're on the new version.
echo If you don't see it, try: Ctrl+Shift+N (new Incognito window), then go to http://localhost:4321
echo.
pause
