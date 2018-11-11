export function date () {
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  if(month<10) {
    month = '0' + month
  };
  if(day<10){
    day = '0' + date.getDate()
  };
  return year + '-' + month + '-' + day
}

export function dateFormat(date) {
  let dateAc=date.split(".")
  return dateAc[2] + "-" + dateAc[1] + "-" + dateAc[0]
}


export function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
        return false;
  }
  return true;
}
