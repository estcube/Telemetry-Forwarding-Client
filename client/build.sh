#!/bin/bash

BASEDIR=$(dirname "$BASH_SOURCE")
DISTDIR="$BASEDIR/../dist"

rm -rf "$DISTDIR"
mkdir "$DISTDIR"

cp -r "$BASEDIR/src" "$DISTDIR/src"
rm -r "$DISTDIR"/src/_*
cp -r "$BASEDIR/spec" "$DISTDIR/spec"
cp "$BASEDIR/configuration.ini.sample" "$DISTDIR/configuration.ini"
cp "$BASEDIR/../README.md" "$DISTDIR/"

# mkdir "$BASEDIR/dist/static"
cp -r "$BASEDIR/../frontend/app/dist/" "$DISTDIR/static"
