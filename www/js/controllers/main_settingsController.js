// import { get_host } from './global_env.js';


document.addEventListener('deviceready', onDeviceReady, false);
var submit_sensor_sync_url;

function onDeviceReady() {
    $("#btn_sensor_sync_on").hide();
    $("#btn_sensor_sync_off").hide();

  
    initVars()
    .then(initTask)
    .catch(console.error);
    
    $("#preloader").hide();
    document.addEventListener("backbutton", onBackKeyDown, false);


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
    setInterval(function () {
      set_to_page_device_state(global_get_vars_url);
    }, 1200);
  }
  

function set_to_page_device_state(host_param) {
    const options = {
        method: 'get',
        responseType: 'json'
    };

    cordova.plugin.http.sendRequest(host_param, options, function (response) {
        if (response.data.conn_sensor_sync == true) {
            $("#btn_sensor_sync_on").hide();
            $("#btn_sensor_sync_off").show();
            $("#settings_sync_status").html("On");
        } else {
            $("#btn_sensor_sync_off").hide();
            $("#btn_sensor_sync_on").show();
            $("#settings_sync_status").html("Off");

        }
    }, function (response) {

    });

}



$("#btn_sensor_sync_on").click(function () {
    setSensorSyncActivity("start");
});


$("#btn_sensor_sync_off").click(function () {

    setSensorSyncActivity("stop");

});


function setSensorSyncActivity(set_mode) {


    cordova.plugin.http.get(submit_sensor_sync_url, {
        mode: set_mode
    }, {}, function (response) {
        console.log(response.status);

        Swal.fire('Set sensor sync', 'Changes committed successfully', 'success');
    }, function (response) {
        Swal.fire(
            'Set sensor sync',
            'Please try again',
            'error'
        );
        console.error(response.error);
    });



}