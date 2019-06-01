export default {
  diffDay: function (startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime(); //时间相差毫秒数

    //计算出相差天数
    var days = Math.floor(diff / (24 * 3600 * 1000));
    return days;
  },
  getDate: function (str) {
    var oDate = new Date(str);
    var oYear = oDate.getFullYear();
    var oMonth = oDate.getMonth() + 1;
    var oDay = oDate.getDate();
    var oHour = oDate.getHours();
    var oMin = oDate.getMinutes();
    var oSen = oDate.getSeconds();
    var oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //最后拼接时间
    return oTime;
  },
  formatDate: function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (String(month).length == 1) {
      month = "0" + month;
    }
    if (String(day).length == 1) {
      day = "0" + day;
    }
    return year + '-' + month + '-' + day;
  },
  formatDateTime: function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (String(month).length == 1) {
      month = "0" + month;
    }
    if (String(day).length == 1) {
      day = "0" + day;
    }
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    if (String(hour).length == 1) {
      hour = "0" + hour;
    }
    if (String(min).length == 1) {
      min = "0" + min;
    }
    if (String(sec).length == 1) {
      sec = "0" + sec;
    }
    return year + '-' + month + '-' + day + " " + hour + ":" + min + ":" + sec;
  },
  formatTime: function (time, format = 'YY-MM-DD hh:mm:ss') {
    var date = new Date(time);
    var year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
    var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
      return '0' + index;
    }); ////开个长度为10的数组 格式为 00 01 02 03
    var newTime = format.replace(/YY/g, year)
      .replace(/MM/g, preArr[month] || month)
      .replace(/DD/g, preArr[day] || day)
      .replace(/hh/g, preArr[hour] || hour)
      .replace(/mm/g, preArr[min] || min)
      .replace(/ss/g, preArr[sec] || sec);

    return newTime;
  },
  getBetweenDateStr: function (start, end) {
    var result = [];
    var beginDay = start.split("-");
    var endDay = end.split("-");
    var diffDay = new Date();
    var endDate = new Date();
    var dateList = new Array;
    var i = 0;
    diffDay.setDate(beginDay[2]);
    diffDay.setMonth(beginDay[1] - 1);
    diffDay.setFullYear(beginDay[0]);
    //获取结束时候的毫秒值
    endDate.setDate(endDay[2]);
    endDate.setMonth(endDay[1] - 1);
    endDate.setFullYear(endDay[0]);
    var diffTime = endDate.getTime();
    if (String(beginDay[1]).length == 1) {
      beginDay[1] = "0" + beginDay[1]
    };
    if (String(beginDay[2]).length == 1) {
      beginDay[2] = "0" + beginDay[2]
    };
    result.push(beginDay[0] + "-" + beginDay[1] + "-" + beginDay[2]);
    while (i == 0) {
      var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
      diffDay.setTime(countDay);
      if (diffTime < countDay) {
        break;
      }
      dateList[2] = diffDay.getDate();
      dateList[1] = diffDay.getMonth() + 1;
      dateList[0] = diffDay.getFullYear();
      if (String(dateList[1]).length == 1) {
        dateList[1] = "0" + dateList[1]
      };
      if (String(dateList[2]).length == 1) {
        dateList[2] = "0" + dateList[2]
      };
      result.push(dateList[0] + "-" + dateList[1] + "-" + dateList[2]);
    };
    return result;
  },
}