import { DocumentData } from "firebase/firestore";

export interface SignUpForm extends HTMLFormControlsCollection {
  firstName: {
    value: string;
  };
  lastName: {
    value: string;
  };
  email: {
    value: string;
  };
  password: {
    value: string;
  };
}

export interface LogInForm extends HTMLFormControlsCollection {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
}

export interface NewItemForm extends HTMLFormControlsCollection {
  productName: {
    value: string;
  };
  category: {
    value: string;
  };
  price: {
    value: string;
  };
  about0: {
    value: string;
  };
  about1: {
    value: string;
  };
  about2: {
    value: string;
  };
  about3: {
    value: string;
  };
  file: {
    files: FileList;
  };
}

export interface ProductInfo {
  name: string;
  price: number;
  category: string;
  about?: string[];
  uid?: string;
  imgUrl?: string;
  quantity?: number;
}

export interface UserInterface extends DocumentData {
  firstName: string;
  lastName: string;
  uid: string;
  usertype: "seller" | "customer";
}

export interface CheckedItems {
  checked: boolean;
  name: string;
  category: string;
}

export interface NavSearch extends HTMLFormControlsCollection {
  search: {
    value: string;
  };
}
