import { db, auth, storage } from "../firebase/firebase";
import { FormEvent } from "react";
import {
  setDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  CheckedItems,
  LogInForm,
  NewItemForm,
  ProductInfo,
  SignUpForm,
} from "./interfaces";
import { emailSchema, passwordSchema } from "./schemas";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const usersColRef = collection(db, "users");
const productsColRef = collection(db, "products");
const validProductCategories = [
  "smartphones",
  "clothes",
  "watches",
  "gaming accesories",
  "toys",
  "air conditioners",
  "microwaves",
  "washing machines",
  "refrigerators",
  "books",
  "trimmers",
  "kitchen appliances",
  "coooking utensils",
  "dinner sets",
  "kitchen organsier",
];

export async function signUp(e: FormEvent, usrType: string) {
  e.preventDefault();
  if (e.target) {
    try {
      const { firstName, lastName, email, password } = (
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

export async function signIn(e: FormEvent) {
  e.preventDefault();
  if (e.target) {
    try {
      const { email, password } = (e.target as HTMLFormElement)
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

export async function getUserData() {
  if (auth.currentUser) {
    const uid = auth.currentUser?.uid;
    const q = query(usersColRef, where("uid", "==", uid));
    const querySnap = await getDocs(q);
    const userData = querySnap.docs[0].data();
    return userData;
  } else {
    return null;
  }
}

export function handleProductAdd(e: FormEvent<HTMLFormElement>) {
  if (e.target) {
    e.preventDefault();
    try {
      const {
        productName,
        category,
        price,
        about0,
        about1,
        about2,
        about3,
        file,
      } = (e.target as HTMLFormElement).elements as NewItemForm;
      const prodName = productName.value
        .trim()
        .replaceAll(" ", "-")
        .toLowerCase();
      const prodDocRef = doc(db, "products", prodName);
      setDoc(prodDocRef, {
        name: prodName,
        category: category.value.toLowerCase(),
        price: parseInt(price.value.replaceAll(",", "")),
        about: [
          about0.value.trim(),
          about1.value.trim(),
          about2.value.trim(),
          about3.value.trim(),
        ],
        uid: auth.currentUser!.uid,
      });
      const prodImg = file.files[0];
      if (!prodImg) return;
      const storageRef = ref(
        storage,
        `${category.value.toLowerCase()}/${prodName}.jpg`
      );
      uploadBytes(storageRef, prodImg);
    } catch (error) {
      alert(`An error has occured: ${error}`);
    }
  }
}

export async function getSellerProducts() {
  const uid = auth.currentUser?.uid;
  const q = query(productsColRef, where("uid", "==", uid));
  const querySnap = await getDocs(q);
  if (!querySnap.empty) {
    const prodData: ProductInfo[] = [];
    querySnap.forEach((doc) => {
      prodData.push(doc.data() as ProductInfo);
    });
    return prodData;
  } else {
    return null;
  }
}

export async function handleProductUpdate(
  e: FormEvent<HTMLFormElement>,
  name: string
) {
  if (e.target) {
    e.preventDefault();
    try {
      const {
        productName,
        category,
        price,
        about0,
        about1,
        about2,
        about3,
        file,
      } = (e.target as HTMLFormElement).elements as NewItemForm;
      const prodName = productName.value
        .trim()
        .replaceAll(" ", "-")
        .toLowerCase();
      const q = query(productsColRef, where("name", "==", name));
      const querySnap = await getDocs(q);
      const prodDocRef = querySnap.docs[0].ref;
      await updateDoc(prodDocRef, {
        name: prodName,
        category: category.value.toLowerCase(),
        price: parseInt(price.value.replaceAll(",", "")),
        about: [
          about0.value.trim(),
          about1.value.trim(),
          about2.value.trim(),
          about3.value.trim(),
        ],
        uid: auth.currentUser!.uid,
      });
      const oldImgRef = ref(
        storage,
        `${category.value.toLowerCase()}/${prodName}.jpg`
      );
      await deleteObject(oldImgRef);
      const prodImg = file.files[0];
      if (!prodImg) return;
      const storageRef = ref(storage, `${category.value}/${prodName}.jpg`);
      uploadBytes(storageRef, prodImg);
    } catch (error) {
      alert(`An error has occured: ${error}`);
    }
  }
}

export async function handleProdDelete(checkedItems: CheckedItems[]) {
  if (checkedItems.length !== 0) {
    try {
      checkedItems.forEach(async (item) => {
        const oldImgRef = ref(
          storage,
          `${item.category.toLowerCase()}/${item.name}.jpg`
        );
        await Promise.all([
          deleteDoc(doc(db, "products", item.name)),
          deleteObject(oldImgRef),
        ]);
      });
    } catch (error) {
      alert(`An error has occured: ${error}`);
    }
  }
}

export async function handleNavSearch(searchQuery: string) {
  try {
    if (validProductCategories.includes(searchQuery)) {
      const q = query(productsColRef, where("category", "==", searchQuery));
      const querySnap = await getDocs(q);
      const products = await Promise.all(
        querySnap.docs.map(async (doc) => {
          const data = doc.data() as ProductInfo;
          data.imgUrl = await getImgUrl(data.category, data.name);
          return data;
        })
      );
      return products;
    }
  } catch (error) {
    alert(`An error has occured: ${error}`);
  }
}

export async function getImgUrl(category: string, name: string) {
  let imgUrl = "";
  try {
    const imageRef = ref(storage, `${category}/${name}.jpg`);
    imgUrl = await getDownloadURL(imageRef);
  } catch (error) {}
  return imgUrl;
}

export function toTitleCase(str: string) {
  return !str.includes("iphone")
    ? str
        .replaceAll("-", " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        .replace("5g", "5G")
        .replace("gb", "GB")
    : str
        .replaceAll("-", " ")
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        .replace("Iphone", "iPhone")
        .replace("5g", "5G")
        .replace("gb", "GB");
}

export async function handleAuthChange(user: User | null) {
  if (user) {
    const uid = user.uid;
    const userColRef = collection(db, "users");
    const q = query(userColRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
  } else {
    return null;
  }
}

export function getDay(date: number) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date];
}

export function getMonth(monNum: number) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return month[monNum];
}
