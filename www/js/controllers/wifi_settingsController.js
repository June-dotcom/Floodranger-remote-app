// import { get_host } from './global_env.js';

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    initVars()
    .then(initTask)
    .catch(console.error);
    $("#preloader").hide();
    

}
function initVars() {
    return new Promise((resolve) => {
      // Some code
      initialize_host();
      console.log("First function executed");
      resolve();
    });
  }
  
  function initTask() {
    set_to_page_device_state(global_get_vars_url);
  }
  
function set_to_page_device_state(host_param) {
    const options = {
        method: 'get',
        responseType: 'json'
    };
    
    cordova.plugin.http.sendRequest(host_param, options, function (response) {
        
        $("#settings_wifissid").val(response.data.wifi_name);
        $("#settings_wifipass").val(response.data.wifi_pass);
        
    }, function (response) {
        
    });
    
}


$("#btn_submit_wifi").click(function () {
    let wifi_ssid_form = $("#settings_wifissid").val();
    let wifi_pass_form = $("#settings_wifipass").val();
    // Swal.fire(wifi_ssid_form + "\n" + wifi_pass_form);
    set_wifi_credentials(wifi_ssid_form, wifi_pass_form);
});

function set_wifi_credentials(ssid_tmp, password_tmp) {
    const opt_submit_wifi = {
        method: 'post',
        data: {
            wifissid: ssid_tmp,
            wifipass: password_tmp
        }
    };
    
    cordova.plugin.http.sendRequest(submit_wifi_url, opt_submit_wifi, function (response) {
        // prints 200        
        restart_device();
        Swal.fire(
            'Set wifi credentials success',
            'Device will restart accordingly',
            'success'
        );

    }, function (response) {
        // prints 403
        Swal.fire(
            'Set wifi credentials error',
            'Please try again',
            'error'
        );
    });
}