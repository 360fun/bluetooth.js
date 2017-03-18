/*
 * Copyright (c) 2016 Francesco Marino
 *
 * @author Francesco Marino <francesco@360fun.net>
 * @website www.360fun.net
 *
 * This is just a basic Class to start playing with the new Web Bluetooth API,
 * specifications can change at any time so keep in mind that all of this is
 * mostly experimental! ;)
 *
 * Check your browser and platform implementation status first
 * https://github.com/WebBluetoothCG/web-bluetooth/blob/gh-pages/implementation-status.md
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function() {
	'use strict';

	// UTF-8
	let encoder = new TextEncoder('utf-8');
  let decoder = new TextDecoder('utf-8');

	class WebBluetooth {

		constructor() {
      this.device           = null;
      this.server           = null;
      this._characteristics = new Map();
			this._debug           = true;
    }

		isConnected() {
			return this.device && this.device.gatt.connected;
		}

		connect(options,services) {
			return navigator.bluetooth.requestDevice(options)
      .then(device => {
        this.device = device;
				this._log('Connected to device named "' + device.name + '" with ID "' + device.id + '"');
        return device.gatt.connect();
			})
      .then(server => {
        this.server = server;
				return Promise.all(
					Object.keys(services).map( serviceId => {
						server.getPrimaryService(serviceId).then(service => {
							Object.keys(services[serviceId].characteristics).map( characteristicId => {
								this._cacheCharacteristic(service, characteristicId)
								.then( () => {
									this._log('Found characteristic "' + characteristicId + '"');
								})
								// .catch( () => {
								// 	if( this._debug ) {
								// 		console.debug('Characteristic "' + characteristicId + '" NOT found');
								// 	}
								// })
								.catch( e => { this._error('Characteristic "' + characteristicId + '" NOT found') } );
							});
						})
						.then( () => {
							this._log('Found service "' + serviceId + '"');
						})
						// .catch( () => {
						// 	if( this._debug ) {
						// 		console.debug('Service "' + serviceId + '"');
						// 	}
						// })
						.catch( e => { this._error('Service "' + serviceId + '"') } );

					})
				);
      });
    }

		disconnect() {

			// Uncaught (in promise) DOMException: GATT Server disconnected while performing a GATT operation.
			// must check if is doing something before disconnect

			return new Promise( (resolve, reject) =>  {
					if( this.isConnected() ) {
						resolve();
					} else {
						reject('Device not connected');
					}
				}
			).then( ()=> {
				this._log('Device disconnected')
				return this.device.gatt.disconnect();
			}).catch( e => { this._error(e) } );
		}

    readCharacteristicValue(characteristicUuid) {
			return new Promise( (resolve, reject) =>  {
					if( this.isConnected() ) {
						resolve();
					} else {
						reject('Device not connected');
					}
				}
			).then( ()=> {
	      let characteristic = this._characteristics.get(characteristicUuid);
	      return characteristic.readValue()
	      .then(value => {
	        // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
	        value = value.buffer ? value : new DataView(value);
	        // if (this._debug) {
	          // for (let i = 0, a = []; i < value.byteLength; i++) { a.push(value.getUint8(i)); }
	          this._log('READ', characteristic.uuid, value);
	        // }
	        return value;
	      });
			})
			.catch( e => { this._error(e) } );
    }

		writeCharacteristicValue(characteristicUuid, value) {
			return new Promise( (resolve, reject) =>  {
					if( this.isConnected() ) {
						resolve();
					} else {
						reject('Device not connected');
					}
				}
			).then( ()=> {
	      let characteristic = this._characteristics.get(characteristicUuid);
	      // if (this._debug) {
	        this._log('WRITE', characteristic.uuid, value);
	      // }
	      return characteristic.writeValue(value);
			}).catch( e => { this._error(e) } );
    }

		_error(msg) {
			if(this._debug) {
				console.debug(msg);
			} else {
				throw msg;
			}
		}

		_log(msg) {
			if(this._debug) {
				console.log(msg);
			}
		}

		_cacheCharacteristic(service, characteristicUuid) {
      return service.getCharacteristic(characteristicUuid)
      .then(characteristic => {
        this._characteristics.set(characteristicUuid, characteristic);
      });
    }

		_decodeString(data) {
      return decoder.decode(data);
    }
    _encodeString(data) {
      return encoder.encode(data);
    }
  }

  window.webBluetooth = new WebBluetooth();

})();
