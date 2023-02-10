var host = "192.168.1.13";
// var fetch_man_route = "/testjson/test.json";
var fetch_man_route = "/show_device_logs_json_global";
//show_device_logs_json_global
var submit_rcl_route = "/submit_recal";
var submit_sensor_sync_route = "/set_device_sensor_mode";
var submt_wifi_route = "/submit_wifi_settings";

var dev_restart_route = "/restartDeviceCommand";



// var global_get_vars_url = host + fetch_man_route;
// var submit_recal_url = host + submit_rcl_route;
// var submit_wifi_url = host + submt_wifi_route;
// var submit_sensor_sync_url = host + submit_sensor_sync_route;

// var device_restart_url = host + dev_restart_route;

var global_get_vars_url = host + fetch_man_route;
var submit_recal_url = host + submit_rcl_route;
var submit_wifi_url = host + submt_wifi_route;
var submit_sensor_sync_url = host + submit_sensor_sync_route;

var device_restart_url = host + dev_restart_route;

function initialize_host(){
    let global_host_store = window.localStorage;
    let host_get_value = global_host_store.getItem("host_global"); // Pass a key name to get its value.
    host = host_get_value;
    global_get_vars_url = host + fetch_man_route;
    submit_recal_url = host + submit_rcl_route;
    submit_wifi_url = host + submt_wifi_route;
    submit_sensor_sync_url = host + submit_sensor_sync_route;

    device_restart_url = host + dev_restart_route;

}

function restart_device(){
    
    const opt_conf_restart = {
        method: 'get'
    };
    cordova.plugin.http.sendRequest(device_restart_url, opt_conf_restart, function(response) {
        // prints 200
        console.log(response.status);
    }, function(response) {
        Swal.fire(
            'Restart device error',
            'Please restart your device manually',
            'error'
        );
    });
    
    
}

function onBackKeyDown() {
    navigator.app.exitApp();
}

