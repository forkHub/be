@echo off

echo TASK: DIST MULAI
echo ================

echo copy ke demo:
echo =============
cd demo
cd
call copy.bat
cd ..
echo.

echo copy ke pg:
echo ===========
cd playground
call copy.bat 
cd ..
echo.

echo copy ke template:
echo ================
copy output\blitz.min.js template_be_ts\web\js\
copy output\blitz.d.ts template_be_ts\dts\

pause

echo TASK: DIST SELESAI
echo ==================
