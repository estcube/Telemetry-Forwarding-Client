#!/bin/bash

BASEDIR=$(dirname "$BASH_SOURCE")
DISTDIR="$BASEDIR/../dist"
mkdir "$DISTDIR"
cp -r "$BASEDIR/spec" "$DISTDIR/spec"
cp "$BASEDIR/configuration.ini.sample" "$DISTDIR/configuration.ini"
cp "$BASEDIR/../README.md" "$DISTDIR/"

cp "$BASEDIR/dist/main.exe" "$DISTDIR/"

cp -r "$BASEDIR/../frontend/app/dist/" "$DISTDIR/static"
