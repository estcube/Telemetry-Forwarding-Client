#!/bin/bash

BASEDIR=$(dirname "$BASH_SOURCE")
TESTDIR="$BASEDIR/src/__test__"

rm -r "$TESTDIR"
mkdir "$TESTDIR"

cleanup() {
  echo "Sending SIGTERM to all python processes ${MAIN}, and ${SRV}."
  kill -15 $MAIN
  kill -15 $SRV
}

catch_exit() {
  cleanup
  exit -1
}

cat >"$TESTDIR/conf.ini" <<EOL
[Mission Control]
relay-enabled=False

[TNC interface]
tnc-protocol-type=KISS
tnc-connection-type=TCP/IP
tnc-ip=localhost
tnc-port=8100
max-connection-attempts=10
connection-retry-time=5
satellite-src = ESTCUB

[Client]
database=__test__/systest.db
automatic-updating=False
frontend-port=6666
static-files-path=../static
telemetry-configuration=spec/telemetry.json
EOL

trap catch_exit SIGINT SIGHUP SIGTERM

python3 test/kissWriter.py -t 5 &
SRV=$!
python3 src/main.py -v -c "$TESTDIR/conf.ini" &
MAIN=$!

sleep 7s
cleanup

python3 "$BASEDIR/src/_system_tests.py"

