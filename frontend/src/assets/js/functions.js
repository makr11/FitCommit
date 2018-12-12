export function pad (padTo, pos, padWith) {
  padTo = padTo.toString()
  if(padTo.length<pos){
    return padWith.repeat(pos - padTo.length) + padTo
  }else{
    return padTo
  }
}

export function date () {
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  return year + '-' + pad(month, 2, "0") + '-' + pad(day, 2, "0")
}

export function dateDiff (later, earlier) {
  later = new Date(later).getTime();
  earlier = new Date(earlier).getTime();
  if(later >= earlier){
    let timeDiff = Math.abs(later - earlier);
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  }else{
    diffDays = 0;
  }
  return diffDays
}

export function addToDate (date, add) {
  date = new Date(date);
  let newDate = new Date(date.setTime(date.getTime() + add * 86400000));
  return newDate.getFullYear() + "-" + pad(newDate.getMonth()+1, 2, "0") + "-" + pad(newDate.getDate(), 2, "0")
}

export function dateFormat(date) {
  let dateAc=date.split(".")
  return dateAc[2] + "-" + dateAc[1] + "-" + dateAc[0]
}

export function dateFormatView(date) {
  date = date.split("-")
  return date[2] + "." + date[1] + "." + date[0]
}

export function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
        return false;
  }
  return true;
}
