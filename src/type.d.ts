type Role = "SUPERUSER" | "ADMIN" | "USER";

interface INavItem {
  id: string;
  name: string;
  href?: string;
  index?: boolean;
  icon?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
  role: string;
  children?: INavItem[];
}

interface SelectedOption {
  value: string;
  label: string;
}

type TChildren = {
  children: ReactNode;
};

interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

interface AuthContextType {
  auth: IAuth | null;
  setAuth: React.Dispatch<React.SetStateAction<IAuth | null>>;
  persist: boolean;
  setPersist: (value: boolean) => void;
}

interface IAuth {
  user: string;
  pwd: string;
  roles: Role;
  accessToken: string;
}
type TAllowRoles = {
  allowedRoles: string[];
};

/*=========================================
                                            
              Responses

=========================================*/

type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

type Pageable = {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

type ResponseBody<T> = {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
};

type ResponseData<T> = {
  timestamp: string;
  body: ResponseBody<T>;
  is_successful: boolean;
};

type ResponseDataNoPagination<T> = {
  timestamp: string;
  body: T[];
  is_successful: boolean;
};

type ResponseDataNoArray<T> = {
  timestamp: string;
  body: T;
  is_successful: boolean;
};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  mobile: string;
  email: string | null;
  national_code: null | string;
  status: string;
  last_login_at: string;
};

type Transaction = {
  id: number;
  amount: number;
  currency: null;
  status: "created" | "gatewayInit" | "paid" | "reversed" | "success";
  gateway_type: "ezpay";
  created_at: string;
};

type IAutomaticRegistration = {
  keyName: string;
  value: string;
  type: string;
};
type IFieldConfig = {
  fieldName: string;
  readOnly: boolean;
  mandatory: boolean;
  available: boolean;
};

interface IBanner {
  id: number;
  name: string;
  width: number;
  height: number;
  position: "UP" | "MID" | "BOT" | "";
  firstB64Image: string;
  enable: boolean;
}
interface IBannerPUT {
  id: number;
  height: number;
  position: "UP" | "MID" | "BOT" | "";
  enable: boolean;
  banner_name: string;
  actionType: "delete" | "activate" | "";
}
interface IBannerImg extends IBanner {
  b64Images: string[];
}

interface IAddressUser {
  longAndLat: string;
  number: number;
  postalCode: string;
  addressName: string;
  phoneNo: string;
  unit: number;
}

/*=========================================
                                            
              packages

=========================================*/
interface MyJwtPayload extends JwtPayload {
  id: string | null;
  email: string | null;
  mobile: string | null;
  roles: Role[];
}

interface INeshan {
  status: string;
  neighbourhood: string;
  municipality_zone: string;
  state: string;
  city: string;
  in_traffic_zone: boolean;
  in_odd_even_zone: boolean;
  route_name: string;
  route_type: string;
  place: string;
  district: string;
  formatted_address: string;
  village: unknown;
  county: string;
}

/*=========================================
                                            
              Responses(new)

=========================================*/

interface RootResponseNew<T> {
  _embedded: T;
  _links: Links;
  page: Page;
}

interface userSearchArr {
  userSearchResponseList: UserSearchResponseList[];
}

interface UserSearchResponseList {
  userId: string;
  username: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  status: number;
}

interface Links {
  self: Self;
}

interface Self {
  href: string;
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface IPostUserStatus {
  userStatus?: number;
}

interface ILoginNew {
  userId: string;
  accessToken: string;
  refreshToken: string;
}
interface IAddressUserNew {
  id: string;
  name: string;
  plaque: number;
  contactNumber: string;
  postalCode: string;
  unit: string;
  latAndLong: string;
  detail: string;
}

interface ITagSearchResponse {
  id: string;
  name: string;
  type: number;
  status: number;
}

interface ITagSearchResponseList {
  tagSearchResponseList: ITagSearchResponse[];
}

interface ICategorySearchResponseList {
  categorySearchResponseList: ICategorySearchResponse[];
}

interface ICategorySearchResponse {
  id: string;
  name: string;
  description: string;
  images: string[];
  tags: { id: string; name: string }[];
}

interface ProductSearchResponseList {
  productSearchResponseList: ProductSearchResponse[];
}

interface ProductSearchResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  discountType: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  status: number;
  count: number;
  thresholdCount: number;
  categories: {
    id: string;
    name: string;
  }[];
  images: string[];
  tags: {
    id: string;
    name: string;
  }[];
  additional: unknown[];
}
