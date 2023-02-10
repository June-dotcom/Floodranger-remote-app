// import { get_host } from './global_env.js';

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  document.addEventListener("backbutton", onBackKeyDown, false);



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
  setInterval(function () {
    set_to_page_device_state(global_get_vars_url);
  }, 1200);
}



function set_to_page_device_state(host_param) {
  const options = {
    method: 'get',
    responseType: 'json'
  };
  // document.getElementById("home_ip_address").innerHTML = host;

  cordova.plugin.http.sendRequest(host_param, options, function (response) {
    // prints 200
    // console.log(response.data);
    // home cutoff
    document.getElementById("home_device_name").innerHTML = response.data.device_name;

    if (response.data.conn_wifi_status == true) {
      document.getElementById("home_wifi_conn_val").innerHTML = "Connected to " + response.data.wifi_name;
    } else {
      document.getElementById("home_wifi_conn_val").innerHTML = "Disconnected to " + response.data.wifi_name;
    }

    if (response.data.conn_cloud == true) {
      document.getElementById("home_cloud_sync_val").innerHTML = "Connected";
    } else {
      document.getElementById("home_cloud_sync_val").innerHTML = "Disconnected";
    }

    if (response.data.conn_sensor_sync == true) {
      document.getElementById("home_sensor_sync_val").innerHTML = "Enabled";
    } else {
      document.getElementById("home_sensor_sync_val").innerHTML = "Disabled";
    }


    if (response.data.fld_alert_status == "FLDLVLA") {
      document.getElementById("home_floodlalertlvl_val").innerHTML = "Yellow alert level";
    } else if (response.data.fld_alert_status == "FLDLVLB") {
      document.getElementById("home_floodlalertlvl_val").innerHTML = "Orange alert level";
    } else if (response.data.fld_alert_status == "FLDLVLC") {
      document.getElementById("home_floodlalertlvl_val").innerHTML = "Red alert level";
    } else if (response.data.fld_alert_status == "FLDNRML") {
      document.getElementById("home_floodlalertlvl_val").innerHTML = "Normal water level";
    }

    document.getElementById("home_water_level_cm").innerHTML = response.data.ultr_water_lvl + " cm";
    document.getElementById("home_dist_to_water_cm").innerHTML = response.data.dist_to_object + " cm";

    document.getElementById("home_conn_status").innerHTML = "App syncing to " + host;


  }, function (response) {
    // prints 403
    if(host == null){
      document.getElementById("home_conn_status").innerHTML = "Select device in settings panel";
    }else{
      document.getElementById("home_conn_status").innerHTML = "App syncing disconnected to " + host;

    }

    //   console.log(response.status);


    //prints Permission denied
    console.log(response.status);
  });

}