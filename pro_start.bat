@echo off
title ��������
color 03
mode con cols=115 lines=35
SET SourceFile=\node_modules
:START
ECHO.
Echo                  ==========================================================================
ECHO.                                        �٣�С˧�糤����˧
ECHO.
Echo                                         ��������������..
ECHO.
Echo                  ==========================================================================
echo.
echo ��ѯ������
echo.
if exist %cd%%SourceFile% (
    echo �����Ѵ��ڣ�������
) else (
    echo ���������ڣ���ʼ��������
    echo.
    npm i
    echo ����������ɣ�����������    
)
npm run build-pro