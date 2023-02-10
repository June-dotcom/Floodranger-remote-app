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

    cordova.plugin.http.sendRequest(host_param, options, function (response) {

        document.getElementById("inf_device_name").innerHTML = response.data.device_name;
        document.getElementById("inf_device_api_key").innerHTML = response.data.device_api_key;
        document.getElementById("inf_sensor_id").innerHTML = response.data.sensor_id;

        document.getElementById("inf_water_level").innerHTML = response.data.ultr_water_lvl + " cm";
        document.getElementById("inf_dist_sensor").innerHTML = response.data.dist_to_object + " cm";

        if (response.data.conn_cloud == true) {
            document.getElementById("inf_cloud_conn").innerHTML = "Connected";
        } else {
            document.getElementById("inf_cloud_conn").innerHTML = "Disconnected";
        }

        if (response.data.conn_sensor_sync == true) {
            document.getElementById("inf_sensor_sync").innerHTML = "Enabled";
        } else {
            document.getElementById("inf_sensor_sync").innerHTML = "Disabled";
        }


        document.getElementById("inf_wifi_ssid").innerHTML = response.data.wifi_name;
        document.getElementById("inf_wifi_pass").innerHTML = response.data.wifi_pass;
        document.getElementById("inf_wifi_signal").innerHTML = response.data.wifi_signal_strength;
        document.getElementById("inf_wifi_remarks").innerHTML = response.data.wifi_signal_remarks;
        document.getElementById("inf_fld_lvl_a").innerHTML = response.data.ultr_fld_level_alert_a + " cm";
        document.getElementById("inf_fld_lvl_b").innerHTML = response.data.ultr_fld_level_alert_b + " cm";
        document.getElementById("inf_fld_lvl_c").innerHTML = response.data.ultr_fld_level_alert_c + " cm";

        if (response.data.fld_alert_status == "FLDLVLA") {
            document.getElementById("inf_fld_status").innerHTML = "Yellow alert level";

        } else if (response.data.fld_alert_status == "FLDLVLB") {
            document.getElementById("inf_fld_status").innerHTML = "Orange alert level";

        } else if (response.data.fld_alert_status == "FLDLVLC") {
            document.getElementById("inf_fld_status").innerHTML = "Red alert level";

        } else if (response.data.fld_alert_status == "FLDNRML") {
            document.getElementById("inf_fld_status").innerHTML = "Normal water level";
        }
        if (response.data.is_water_overflow == false) {
            document.getElementById("inf_is_overflowed").innerHTML = "Not overflowing";
        } else {
            document.getElementById("inf_is_overflowed").innerHTML = "Water overflow";
        }

        if (response.data.conn_sensor_sync == true) {
            document.getElementById("inf_sensor_sync").innerHTML = "Enabled";
        } else {
            document.getElementById("inf_sensor_sync").innerHTML = "Disabled";
        }


    }, function (response) {

    });

}