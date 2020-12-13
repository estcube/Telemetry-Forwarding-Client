#!/bin/bash

BASEDIR=$(dirname "$BASH_SOURCE")
DISTDIR="$BASEDIR/../dist"
mkdir "$DISTDIR"
mkdir "$DISTDIR/src"

cp "$BASEDIR/configuration.ini.sample" "$DISTDIR/configuration.ini"
cp "$BASEDIR/../README.md" "$DISTDIR/README.txt"
cp "$BASEDIR/versions.pckl" "$DISTDIR/"

cp "$BASEDIR/dist/main.exe" "$DISTDIR/src"

cp -r "$BASEDIR/kaitai" "$DISTDIR/kaitai"

cp -r "$BASEDIR/../frontend/app/dist/" "$DISTDIR/static"
