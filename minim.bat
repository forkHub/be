@echo off
echo off

echo TASK: MINIM MULAI
echo =================

cd output
node ..\minim\target\minim blitz.js blitz.min.js
cd ..

pause

echo TASK: MINIM SELESAI
echo ===================