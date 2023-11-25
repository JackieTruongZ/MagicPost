
interface Address {
  id: number;
  name: string;
  code: number;
}

export const generateNameOfTransHub = (province: string, cityDistrict: string, name: string) => {
  if (
    indexingProvince(province) == '404' ||
    indexingCityDistrict(cityDistrict) ==
    '404'
  ) {
   return '404';
  }
  return `${name}_${indexingProvince(province)}_${indexingCityDistrict(cityDistrict)}`;
}

export const indexingProvince = (strProvince: string): string => {
  function findCodeByName(name: string): number | undefined {
    const province: Address = PROVINCE_ENUM.find((p: Address) => p.name.toLowerCase() === name.toLowerCase());
    if (province === undefined){
      console.log(province);
      return 404;
    }
    return province.code;
  }
  return findCodeByName(strProvince).toString();
}

export const indexingCityDistrict = (strCityDistrict: string): string => {
  function findCodeByName(name: string): number {
    const cityDistrict: Address = CITY_DISTRICT_ENUM.find((p: Address) => p.name.toLowerCase() === name.toLowerCase());
    if (cityDistrict === undefined){
      console.log(cityDistrict);
      return 404;
    }
    return cityDistrict.code;
  }
  return findCodeByName(strCityDistrict).toString();
}

export const PROVINCE_ENUM: Address[] = [
  {"id": 1, "name": "an giang", "code": 52},
  {"id": 2, "name": "bà rịa - vũng tàu", "code": 43},
  {"id": 3, "name": "bắc giang", "code": 98},
  {"id": 4, "name": "bắc kạn", "code": 97},
  {"id": 5, "name": "bạc liêu", "code": 94},
  {"id": 6, "name": "bắc ninh", "code": 99},
  {"id": 7, "name": "bến tre", "code": 71},
  {"id": 8, "name": "bình Định", "code": 77},
  {"id": 9, "name": "bình dương", "code": 61},
  {"id": 10, "name": "bình phước", "code": 93},
  {"id": 11, "name": "bình thuận", "code": 86},
  {"id": 12, "name": "cà mau", "code": 69},
  {"id": 13, "name": "cần thơ", "code": 66},
  {"id": 14, "name": "cao bằng", "code": 11},
  {"id": 15, "name": "Đà nẵng", "code": 43},
  {"id": 16, "name": "Đắk lắk", "code": 47},
  {"id": 17, "name": "Đắk nông", "code": 48},
  {"id": 18, "name": "Điện biên", "code": 27},
  {"id": 19, "name": "Đồng nai", "code": 39},
  {"id": 20, "name": "Đồng tháp", "code": 66},
  {"id": 21, "name": "gia lai", "code": 81},
  {"id": 22, "name": "hà giang", "code": 23},
  {"id": 23, "name": "hà nam", "code": 90},
  {"id": 24, "name": "hà nội", "code": 29},
  {"id": 64, "name": "hà nội 01", "code": 30},
  {"id": 65, "name": "hà nội 02", "code": 31},
  {"id": 66, "name": "hà nội 03", "code": 32},
  {"id": 67, "name": "hà nội 04", "code": 33},
  {"id": 25, "name": "hà tĩnh", "code": 38},
  {"id": 26, "name": "hải dương", "code": 34},
  {"id": 27, "name": "hải phòng", "code": 15},
  {"id": 68, "name": "hải phòng 01", "code": 16},
  {"id": 28, "name": "hậu giang", "code": 95},
  {"id": 29, "name": "hòa bình", "code": 28},
  {"id": 30, "name": "hưng yên", "code": 89},
  {"id": 31, "name": "khánh hòa", "code": 79},
  {"id": 32, "name": "kiên giang", "code": 68},
  {"id": 33, "name": "kon tum", "code": 82},
  {"id": 34, "name": "lai châu", "code": 25},
  {"id": 35, "name": "lâm Đồng", "code": 49},
  {"id": 36, "name": "lạng sơn", "code": 12},
  {"id": 37, "name": "lào cai", "code": 24},
  {"id": 38, "name": "long an", "code": 62},
  {"id": 39, "name": "nam Định", "code": 18},
  {"id": 40, "name": "nghệ an", "code": 37},
  {"id": 41, "name": "ninh bình", "code": 35},
  {"id": 42, "name": "ninh thuận", "code": 85},
  {"id": 43, "name": "phú thọ", "code": 19},
  {"id": 44, "name": "phú yên", "code": 78},
  {"id": 45, "name": "quảng bình", "code": 73},
  {"id": 46, "name": "quảng nam", "code": 92},
  {"id": 47, "name": "quảng ngãi", "code": 76},
  {"id": 48, "name": "quảng ninh", "code": 14},
  {"id": 49, "name": "quảng trị", "code": 74},
  {"id": 50, "name": "sóc trăng", "code": 83},
  {"id": 51, "name": "sơn la", "code": 26},
  {"id": 52, "name": "tây ninh", "code": 70},
  {"id": 53, "name": "thái bình", "code": 17},
  {"id": 54, "name": "thái nguyên", "code": 20},
  {"id": 55, "name": "thanh hóa", "code": 36},
  {"id": 56, "name": "thừa thiên huế", "code": 75},
  {"id": 57, "name": "tiền giang", "code": 63},
  {"id": 58, "name": "tp hồ chí minh", "code": 50},
  {"id": 69, "name": "tp hồ chí minh 01", "code": 51},
  {"id": 70, "name": "tp hồ chí minh 02", "code": 52},
  {"id": 71, "name": "tp hồ chí minh 03", "code": 53},
  {"id": 72, "name": "tp hồ chí minh 04", "code": 54},
  {"id": 73, "name": "tp hồ chí minh 05", "code": 55},
  {"id": 74, "name": "tp hồ chí minh 06", "code": 56},
  {"id": 75, "name": "tp hồ chí minh 07", "code": 57},
  {"id": 76, "name": "tp hồ chí minh 08", "code": 58},
  {"id": 77, "name": "tp hồ chí minh 09", "code": 59},
  {"id": 59, "name": "trà vinh", "code": 84},
  {"id": 60, "name": "tuyên quang", "code": 22},
  {"id": 61, "name": "vĩnh long", "code": 64},
  {"id": 62, "name": "vĩnh phúc", "code": 88},
  {"id": 63, "name": "yên bái", "code": 21}
]

export const CITY_DISTRICT_ENUM : Address[] = [
  {"id": 1, "name": "an giang", "code": 52},
  {"id": 2, "name": "bà rịa - vũng tàu", "code": 43},
  {"id": 3, "name": "bắc giang", "code": 98},
  {"id": 4, "name": "bắc kạn", "code": 97},
  {"id": 5, "name": "bạc liêu", "code": 94},
  {"id": 6, "name": "bắc ninh", "code": 99},
  {"id": 7, "name": "bến tre", "code": 71},
  {"id": 8, "name": "bình Định", "code": 77},
  {"id": 9, "name": "bình dương", "code": 61},
  {"id": 10, "name": "bình phước", "code": 93},
  {"id": 11, "name": "bình thuận", "code": 86},
  {"id": 12, "name": "cà mau", "code": 69},
  {"id": 13, "name": "cần thơ", "code": 66},
  {"id": 14, "name": "cao bằng", "code": 11},
  {"id": 15, "name": "Đà nẵng", "code": 43},
  {"id": 16, "name": "Đắk lắk", "code": 47},
  {"id": 17, "name": "Đắk nông", "code": 48},
  {"id": 18, "name": "Điện biên", "code": 27},
  {"id": 19, "name": "Đồng nai", "code": 39},
  {"id": 20, "name": "Đồng tháp", "code": 66},
  {"id": 21, "name": "gia lai", "code": 81},
  {"id": 22, "name": "hà giang", "code": 23},
  {"id": 23, "name": "hà nam", "code": 90},
  {"id": 24, "name": "hà nội", "code": 29},
  {"id": 64, "name": "hà nội 01", "code": 30},
  {"id": 65, "name": "hà nội 02", "code": 31},
  {"id": 66, "name": "hà nội 03", "code": 32},
  {"id": 67, "name": "hà nội 04", "code": 33},
  {"id": 25, "name": "hà tĩnh", "code": 38},
  {"id": 26, "name": "hải dương", "code": 34},
  {"id": 27, "name": "hải phòng", "code": 15},
  {"id": 68, "name": "hải phòng 01", "code": 16},
  {"id": 28, "name": "hậu giang", "code": 95},
  {"id": 29, "name": "hòa bình", "code": 28},
  {"id": 30, "name": "hưng yên", "code": 89},
  {"id": 31, "name": "khánh hòa", "code": 79},
  {"id": 32, "name": "kiên giang", "code": 68},
  {"id": 33, "name": "kon tum", "code": 82},
  {"id": 34, "name": "lai châu", "code": 25},
  {"id": 35, "name": "lâm Đồng", "code": 49},
  {"id": 36, "name": "lạng sơn", "code": 12},
  {"id": 37, "name": "lào cai", "code": 24},
  {"id": 38, "name": "long an", "code": 62},
  {"id": 39, "name": "nam Định", "code": 18},
  {"id": 40, "name": "nghệ an", "code": 37},
  {"id": 41, "name": "ninh bình", "code": 35},
  {"id": 42, "name": "ninh thuận", "code": 85},
  {"id": 43, "name": "phú thọ", "code": 19},
  {"id": 44, "name": "phú yên", "code": 78},
  {"id": 45, "name": "quảng bình", "code": 73},
  {"id": 46, "name": "quảng nam", "code": 92},
  {"id": 47, "name": "quảng ngãi", "code": 76},
  {"id": 48, "name": "quảng ninh", "code": 14},
  {"id": 49, "name": "quảng trị", "code": 74},
  {"id": 50, "name": "sóc trăng", "code": 83},
  {"id": 51, "name": "sơn la", "code": 26},
  {"id": 52, "name": "tây ninh", "code": 70},
  {"id": 53, "name": "thái bình", "code": 17},
  {"id": 54, "name": "thái nguyên", "code": 20},
  {"id": 55, "name": "thanh hóa", "code": 36},
  {"id": 56, "name": "thừa thiên huế", "code": 75},
  {"id": 57, "name": "tiền giang", "code": 63},
  {"id": 58, "name": "tp hồ chí minh", "code": 50},
  {"id": 69, "name": "tp hồ chí minh 01", "code": 51},
  {"id": 70, "name": "tp hồ chí minh 02", "code": 52},
  {"id": 71, "name": "tp hồ chí minh 03", "code": 53},
  {"id": 72, "name": "tp hồ chí minh 04", "code": 54},
  {"id": 73, "name": "tp hồ chí minh 05", "code": 55},
  {"id": 74, "name": "tp hồ chí minh 06", "code": 56},
  {"id": 75, "name": "tp hồ chí minh 07", "code": 57},
  {"id": 76, "name": "tp hồ chí minh 08", "code": 58},
  {"id": 77, "name": "tp hồ chí minh 09", "code": 59},
  {"id": 59, "name": "trà vinh", "code": 84},
  {"id": 60, "name": "tuyên quang", "code": 22},
  {"id": 61, "name": "vĩnh long", "code": 64},
  {"id": 62, "name": "vĩnh phúc", "code": 88},
  {"id": 63, "name": "yên bái", "code": 21}
]