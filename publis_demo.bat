echo TASK: PUBLISH DEMO START
echo ========================

call setenv.bat

cd demo
call publis.bat
if ERRORLEVEL 1 exit /b 1
cd ..
echo.

echo TASK: PUBLISH DEMO SELESAI
echo ==========================
pause