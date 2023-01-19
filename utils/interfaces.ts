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

export interface ProductInfo {
  name: string;
  price: number;
  category: string;
  about: string[];
}

export interface CartItem {
  name: string;
  quantity: number;
  category: string;
  price: number;
}
