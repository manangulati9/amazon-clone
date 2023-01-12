import { db } from "../firebase/firebase";
import { FormEvent } from "react";
import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { LogInForm, SignUpForm } from "./interfaces";
import { emailSchema, passwordSchema } from "./schemas";

export function UserSignUp(e: FormEvent) {
  e.preventDefault();
  if (e.target) {
    try {
      const { name, email, password }: SignUpForm = (
        e.target as HTMLFormElement
      ).elements as SignUpForm;
      const userLoginRef = doc(db, "user", name.value);
      setDoc(userLoginRef, {
        name: name.value,
        email: emailSchema.parse(email.value),
        password: passwordSchema.parse(password.value),
      });
    } catch (error) {
      alert("Invalid email or password");
      console.log({ message: error });
    }
  }
}

// TODO: Implement LoginUser func

export async function UserSignIn(e: FormEvent) {
  e.preventDefault();
  if (e.target) {
    try {
      const { email, password }: LogInForm = (e.target as HTMLFormElement)
        .elements as LogInForm;
      const usrEmail = emailSchema.parse(email.value);
      const usrPwd = passwordSchema.parse(password.value);
      const userColRef = collection(db, "user");
      const q = query(
        userColRef,
        where("email", "==", usrEmail),
        where("password", "==", usrPwd)
      );
      const user = await getDocs(q);
      if (user.size === 1) {
        LoginUser();
      }
    } catch (error) {
      alert("Invalid email or password");
      console.log({ message: error });
    }
  }
}
