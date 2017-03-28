# bluetooth.js

### WebBluetooth class
This is just a basic Class to start playing with the new Web Bluetooth API, specifications can change at any time so keep in mind that all of this is mostly experimental! ;)

### Requirements
Check your [browser and platform implementation status](https://github.com/WebBluetoothCG/web-bluetooth/blob/gh-pages/implementation-status.md) first.

### Usage

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
  
	WebBluetooth.connect(options,services);
  
  
### Support or Contact
Francesco Marino - [francesco@360fun.net](mailto:francesco@360fun.net) - [www.360fun.net](http://www.360fun.net)

Based on code from [https://github.com/WebBluetoothCG/demos](https://github.com/WebBluetoothCG/demos)
