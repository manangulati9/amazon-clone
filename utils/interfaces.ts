export interface SignUpForm extends HTMLFormControlsCollection {
  name: {
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
