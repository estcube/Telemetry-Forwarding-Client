# Notes

## Missing pieces / future features

* The telemetry configuration updater has no version check (check if something has changed) and
always tells the user that they need to restart, even if the download configuration is the exact
same as before.
* The ax_listener doesn't do FCS checking.
* The frontend doesn't display the satellite position, next pass times, etc. if there is no internet connection or n2yo is down.
* If there is no internet connection or the SIDS endpoint is unreachable, the packets received in that timeframe are never relayed.
** The AX.25 packets are stored in the database along with the timestamp of when they were received, this can be used in the future, to send all the packets for which the sending failed (probably have to merge the functionalities of `sids_relay` and `db_interface::insert_ax_frame`).
* With some work, the client could be made to listen to multiple TNCs at once, for different satellites, or listen to one TNC for multiple satellite configurations.
** The `tnc_pool` was made to support managing multiple tnc connections running on different (Python) threads.
** Currently, the `tnc_pool` has a function that builds the default TNCConnection. An interface needs to be added to allow adding and removing connections (which needs to be persisted into a configuration).
** Each connection will most likely need their own instances of listeners like `sids_relay` and `ax_listener`.
* RS232 support is provided in theory by the `kiss` library (we haven't been able to test it). Something similar to the `TCPKISSThread` will have to be made for that implementation.