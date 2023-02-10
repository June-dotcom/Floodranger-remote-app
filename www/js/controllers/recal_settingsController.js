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
        
       
        $("#base_water_lvl_val").val(response.data.baseWaterLvl);
        $("#flood_alert_lvl_a_val").val(response.data.ultr_fld_level_alert_a);
        $("#flood_alert_lvl_b_val").val(response.data.ultr_fld_level_alert_b);
        $("#flood_alert_lvl_c_val").val(response.data.ultr_fld_level_alert_c);
       
    }, function (response) {
        
    });
    
}


$("#btn_submit_calib").click(function () {
    let sbmtd_bs_wt_lvl = $("#base_water_lvl_val").val();
    let sbmtd_fld_lvl_a = $("#flood_alert_lvl_a_val").val();
    let sbmtd_fld_lvl_b = $("#flood_alert_lvl_b_val").val();
    let sbmtd_fld_lvl_c = $("#flood_alert_lvl_c_val").val();
    
    set_recal_sensor(sbmtd_bs_wt_lvl, sbmtd_fld_lvl_a, sbmtd_fld_lvl_b, sbmtd_fld_lvl_c);
});
 

function set_recal_sensor(bs_wt_lvl, lvl_a, lvl_b, lvl_c) {
    const opt_submit_recal = {
      method: 'post',
      data: { base_water_level: bs_wt_lvl, 
              flevel_a: lvl_a,
              flevel_b: lvl_b,
              flevel_c: lvl_c
             }   
     };

    cordova.plugin.http.sendRequest(submit_recal_url, opt_submit_recal, function(response) {
      // prints 200
        Swal.fire('Sucessfully submitted','Device will restart shortly', 'success');
      restart_device();
    }, function(response) {
        Swal.fire('Changes error',
        'Please check your configuration', 
        'error'
        );
     
    });

    // ons.notification.alert(sbmtd_bs_wt_lvl + "\n" + sbmtd_fld_lvl_a + "\n" + sbmtd_fld_lvl_b + "\n" + sbmtd_fld_lvl_c);
  }