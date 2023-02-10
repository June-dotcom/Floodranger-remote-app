

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // $("#preloader").hide();
    
    // document.addEventListener("backbutton", onBackKeyDown, false);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ipAddress_tmp = urlParams.get('ipaddress');
    // alert(ipAddress_tmp);


    let global_host_store = window.localStorage;
// let value = storage.getItem("host_global"); // Pass a key name to get its value.

    let host_append_ip = "http://" + ipAddress_tmp;
    global_host_store.setItem("host_global", host_append_ip);

    location.href = "home.html";
    
}


