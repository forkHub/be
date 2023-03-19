@echo off

echo dasar_hor:
echo ==========
cd dasar_hor
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo dasar_multiple:
echo ===============
cd dasar_multiple
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 

echo dasar_snap:
echo ===========
cd dasar_snap
cd
call publis.bat
if ERRORLEVEL 1 goto error
cd ..
echo. 


goto end

:error
echo ERROR
pause
exit /b 1

:end