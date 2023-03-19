@echo off
echo off

echo TASK: MINIM MULAI
echo =================

cd output
node ..\minim\target\minim blitz.js blitz.min.js
if ERRORLEVEL 1 goto error
cd ..


echo TASK: MINIM SELESAI
echo ===================
goto end

:error
echo ERROR
pause

:end
