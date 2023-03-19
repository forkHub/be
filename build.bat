@echo off

echo TASK: BUILD MULAI
echo =================

cd lib
call build.bat
if ERRORLEVEL 1 exit /b 1
cd ..

call minim.bat
if ERRORLEVEL 1 exit /b 1

echo TASK: BUILD SELESAI
echo ===================
pause
