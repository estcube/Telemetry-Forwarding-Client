# Notes

## Missing pieces

* The telemetry configuration updater has no version check (check if something has changed) and
always tells the user that they need to restart, even if the download configuration is the exact
same as before.
* The ax_listener doesn't do FCS checking.
