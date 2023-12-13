export interface ResponseData {
  status: string;
  message: string;
  data: any;
}

export interface CheckAuth {
  message: string;
  statusCode: string;
}

export interface AddressProvince {
  _id: string;
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  code: string;
  isDeleted: boolean;
}

export interface AddressDistrict {
  _id: string;
  name: string;
  slug: string;
  type: string;
  name_with_type: string;
  path: string;
  path_with_type: string;
  code: string;
  parent_code: string;
  isDeleted: boolean;
}

export interface PointHubTrans {
  id: string;
  name: string;
  province: string;
  cityDistrict: string;
  address: string;
  numberPhone: string;
  status: string;
}

export interface PointForm {
  name: string;
  province: string;
  cityDistrict: string;
  address: string;
  numberPhone: string;
  status: string;
}
