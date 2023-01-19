import { db, auth } from "../firebase/firebase";
import { FormEvent } from "react";
import {
  setDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { LogInForm, ProductInfo, SignUpForm } from "./interfaces";
import { emailSchema, passwordSchema } from "./schemas";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export async function SignUp(e: FormEvent, usrType: string) {
  e.preventDefault();
  if (e.target) {
    try {
      const { firstName, lastName, email, password }: SignUpForm = (
        e.target as HTMLFormElement
      ).elements as SignUpForm;
      const userProfileRef = doc(db, "users", firstName.value);
      const usrEmail = emailSchema.parse(email.value);
      const usrPwd = passwordSchema.parse(password.value);
      const userCred = await createUserWithEmailAndPassword(
        auth,
        usrEmail,
        usrPwd
      );
      const user = userCred.user;
      setDoc(userProfileRef, {
        firstName: firstName.value,
        lastName: lastName.value,
        uid: user.uid,
        usertype: usrType,
      });
    } catch (error) {
      alert("Invalid email or password");
      console.log({ message: error });
    }
  }
}

export async function SignIn(e: FormEvent) {
  e.preventDefault();
  if (e.target) {
    try {
      const { email, password }: LogInForm = (e.target as HTMLFormElement)
        .elements as LogInForm;
      const usrEmail = emailSchema.parse(email.value);
      const usrPwd = passwordSchema.parse(password.value);
      await signInWithEmailAndPassword(auth, usrEmail, usrPwd);
    } catch (error) {
      alert("Invalid email or password");
      console.log({ message: error });
    }
  }
}

export async function CheckUserType() {
  const uid = auth.currentUser?.uid;
  const usersColRef = collection(db, "users");
  const q = query(usersColRef, where("uid", "==", uid));
  const querySnap = await getDocs(q);
  const userType: string = querySnap.docs[0].data().usertype;
  return userType;
}
