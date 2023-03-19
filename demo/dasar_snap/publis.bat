@echo off

set file_js=dasar_snap.js
set folder=dasar_snap

echo publish %folder%:
echo =================

cd .\web\js
node %BACA_JS% %file_js% %file_js%
if ERRORLEVEL 1 goto error

cd ..
cd ..

echo.
echo copy demo
echo =========
xcopy web %STAGING%\demo\%folder% /s /i /y
if ERRORLEVEL 1 goto error

echo.
echo copy data
echo =========
copy .\web\js\%file_js% %STAGING%\pg\data\%file_js% /y
if ERRORLEVEL 1 goto error

goto end

:error
echo ERROR
pause

:end
