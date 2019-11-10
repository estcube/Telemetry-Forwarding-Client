#!/bin/bash

BASEDIR=$(dirname "$BASH_SOURCE")

rm -rf "$BASEDIR/dist"
mkdir "$BASEDIR/dist"

cp -r "$BASEDIR/src" "$BASEDIR/dist/src"
cp "$BASEDIR/configuration.ini.sample" "$BASEDIR/dist/configuration.ini"
cp "$BASEDIR/README.md" "$BASEDIR/dist/"

# mkdir "$BASEDIR/dist/static"
cp -r "$BASEDIR/../frontend/app/dist/" "$BASEDIR/dist/static"
