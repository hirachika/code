var staffJson   = JSON.stringify(data);
var jsonObject  = JSON.parse(staffJson);

function staff(id){
  for (var i = 0; i < jsonObject.length; i++) {
    if(id < 12){
      console.log(jsonObject[id-1].name);
      return;
    }
    else{
      console.log('null');
      return;
    }
  }
}

staff(1);
staff(5);
staff(999);