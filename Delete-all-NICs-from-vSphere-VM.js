//action inputs:
//  vm  -  VC:VirtualMachine


var nicsToDelete = [];
var changeVersion = vm.config.changeVersion;
var devices = vm.config.hardware.device;

for (var i in devices) {
	if (isNic(devices[i])) {
		//NIC exists. Let's fix that
		System.log("Nic: "+devices[i].deviceInfo.label+" will be deleted");
		var nicToDelete = devices[i];
		var devChangeSpec = new VcVirtualDeviceConfigSpec();
		devChangeSpec.device = nicToDelete;
		devChangeSpec.operation = VcVirtualDeviceConfigSpecOperation.remove;
		nicsToDelete.push(devChangeSpec);
	}
}

if (nicsToDelete.length > 0) {
	var configSpec = new VcVirtualMachineConfigSpec();		
	configSpec.changeVersion = changeVersion;
	configSpec.deviceChange = nicsToDelete;
	var task = vm.reconfigVM_Task(configSpec);
	var result = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,true,2);
}


function isNic(device) {
	if (devices[i] instanceof VcVirtualVmxnet3
		|| devices[i] instanceof VcVirtualE1000
		|| devices[i] instanceof VcVirtualE1000e
		|| devices[i] instanceof VcVirtualPCNet32
		|| devices[i] instanceof VcVirtualVmxnet
		|| devices[i] instanceof VcVirtualVmxnet2 ) {
		return true;
	} else {
		return false;
	}
}