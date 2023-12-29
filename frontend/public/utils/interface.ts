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

export interface UserInfor {
  UserPoint: any;
  firstName: string;
  lastName: string;
  username: string;
}

export interface UserInforFull {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface UserPoint {
  hubId: string;
  transId: string;
  type: number;
}

export interface UserUserPoint {
  UserPoint: UserPoint;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface UserRole {
  roleId: number;
}

export interface UserRolePointInfor {
  user: User;
  userRole: UserRole;
  userPoint: UserPoint;
}

export interface UserRoleInfor {
  id: number;
  roleId: number;
  userId: number;
  role: Role;
  user: UserInforFull;
}

export interface Order {
  createdAt: string;
  id: string;
  userId: number;
}

export interface Road {
  id: string;
  locationPointId: string;
  nextLocationPointId: string;
  status: string;
}

export interface InforOrder {
    id: number;
    orderId: string;
    description: string;
    senderName: string;
    senderNumber: string;
    senderAddress: string;
    senderPostCode: string;
    receiverName: string;
    receiverNumber: string;
    receiverAddress: string;
    receiverPostCode: string;
    mass: string;
    typeGoods: string;
    baseFee: number;
    additionalFee: number;
    VAT: number;
    cost: number;
    Othercharge: number;
    reveiverCOD: number;
    reveicerOthercharge: number;
}

export interface AllOrderInforWithRoad {
  order: Order;
  road: Road;
}

export interface OrderAllInfor {
  order: Order;
  inforOder: InforOrder;
  road: Road;
}
