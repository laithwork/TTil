@echo off
cd /d "%~dp0"
echo TTIL Store - keep this window open while using the website.
echo Open http://localhost:4173 for the shop
echo Open http://localhost:4173/admin for the dashboard
node server.js --production
pause
