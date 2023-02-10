// import { get_host } from './global_env.js';
var base_ip_to_scan;
var fetch_man_route = "/show_device_logs_json_global";
var device_list;
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  
  $("#preloader").hide();
  
  networkinterface.getWiFiIPAddress(onSuccess, onError);
  // networkinterface.getCarrierIPAddress( onSuccess, onError );
  
  // alert('device scanner');
  // setInterval(display_list_of_devices, 5000);
}

function onSuccess( ipInformation ) {
  // alert( "IP: " + ipInformation.ip + " subnet:" + ipInformation.subnet );
  // ipInformation.ip
  // alert(ipInformation.ip);
  const ip = String(ipInformation.ip);
  const octets = ip.split(".");
  const firstThreeOctets = octets.slice(0, 3).join(".");
  // Output: "192.168.1"
  
  const startIp = 1;
  const endIp = 255;
  
  
  for (let i = startIp; i <= endIp; i++) {
    const ip_scanning = "http://" + firstThreeOctets + "." + i + fetch_man_route;
    const ip_base_scan = firstThreeOctets + "." + i; 
    
    cordova.plugin.http.setRequestTimeout(1.5);
    var tmp_txt = "";
    const options = {
      method: 'get',
      responseType: 'json'
    };
    $("#scan_status").html(ip_base_scan +  " scanning");
    // "device_ip" : response.data.disp_device_local_ip,

    cordova.plugin.http.sendRequest(ip_scanning, options, function(response) {
      let device_obj = {
        "device_ip" : ip_base_scan,
        "device_name" : response.data.device_name
      };  
      
      // alert(ip_base_scan + " is pass");
      // alert(device_obj.device_name);
      add_to_list_of_devices(device_obj);
    }, function(response){
      // $("#scan_status").html(ip_base_scan +  "=F");
    });
  }
  $("#scan_status").html(tmp_txt);
  
  
  
}

function onError( error ) {
  // Note: onError() will be called when an IP address can't be
  // found, e.g. WiFi is disabled, no SIM card, Airplane mode
  alert( error );
}


function add_to_list_of_devices(device_obj_tmp){
  // alert(device_obj_tmp.device_name + " is added");
  // perform add to node
  

  let device_instance = ""+
  "<a href='device_initialize.html?ipaddress=" +String(device_obj_tmp.device_ip) + "'>" + 
  "<div class='d-flex px-3 mb-3'>" + 
  "<div class='align-self-center'>" +
  " <span class='icon icon-m rounded-m bg-fade-mint-light shadow-0 shadow-bg-s text-center color-white me-3'> " +
  "<i class='fa-solid color-mint-dark  fa-microchip font-20'></i> " + 
  " </span>" + 
  " </div> " + 
  "<div class='align-self-center me-auto'>" + 
  " <h4 class='font-16 mb-n1'>" + device_obj_tmp.device_name + "</h4>" + 
  " <p class='mb-0 mt-n2'><span class='color-theme opacity-30 font-13 font-400' id='scan_status'> " + device_obj_tmp.device_ip + "</span></p>" + 
  " </div></div></a>";
  
  $("#device_list").append(device_instance);
  // $("ul").append(" <li class='list-group-item'>" + device_obj_tmp.device_name +  " " +  device_obj_tmp.device_name +  "</li>");
  device_list.push(device_obj_tmp);
  
}


function display_list_of_devices(){
  //exampleFormControlTextarea1
  const stringifiedArray = JSON.stringify(device_list);
  alert(stringifiedArray);
}