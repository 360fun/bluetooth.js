# bluetooth.js

### WebBluetooth class
This is just a basic Class to start playing with the new Web Bluetooth API, specifications can change at any time so keep in mind that all of this is mostly experimental! ;)

### Requirements
Check your [browser and platform implementation status](https://github.com/WebBluetoothCG/web-bluetooth/blob/gh-pages/implementation-status.md) first.

### Usage

Services and Characteristics JSON structure.

	let services = {
	    '00000000-0000-0000-0000-000000000000' : { // service ID
	    	name : 'Service 1',
	    	characteristics : {
	    		'00000000-0000-0000-0000-000000000000' : { // characteristic ID
	    			name : "Characteristic 1"
	    		},
	    		"00000000-0000-0000-0000-000000000000" : {
	    			name : "Characteristic 2"
	    		},
          ...
	    	}
		},
    ...
	}
	
	 
	let options = {
		filters: [{
			namePrefix: ['DeviceName']
		}],
		optionalServices: Object.keys(services) // array automatically generated from the services keys
	};

With this simple command the Web Bluetooth API is called and the device discovery popup will appear.
	
	WebBluetooth.connect( options, services )
	.then( ()=>{
		// device is connected
	} );
	
Disconnects the device.

	WebBluetooth.disconnect()
	.then( ()=>{
		// device is disconnected
	} );
  
Read a value from a characteristic.

	WebBluetooth.readCharacteristicValue( characteristicUuid )
	.then( value => {
		// the value has been read
		console.log( value );
	} );
	
Write a value into a characteristic.

	WebBluetooth.writeCharacteristicValue( characteristicUuid )
	.then( () => {
		// the value has been written
	} );
  
### Support or Contact
Francesco Marino - [francesco@360fun.net](mailto:francesco@360fun.net) - [www.360fun.net](http://www.360fun.net)

Based on code from [https://github.com/WebBluetoothCG/demos](https://github.com/WebBluetoothCG/demos)
