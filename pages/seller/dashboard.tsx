import { CheckedItems, UserInterface } from "../../utils/interfaces";
import {
  getSellerProducts,
  handleProdDelete,
  handleProductAdd,
  handleProductUpdate,
  toTitleCase,
} from "../../utils/functions";
import Image from "next/image";
import amznLogo from "../../public/assets/Amazon_logo.svg";
import {
  Avatar,
  Checkbox,
  Dropdown,
  Modal,
  Navbar,
  Table,
} from "flowbite-react";
import Link from "next/link";
import { auth } from "../../firebase/firebase";
import { getUserData } from "../../utils/functions";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ProductInfo } from "../../utils/interfaces";

export default function () {
  if (!auth.currentUser) {
    return <SignInRequest />;
  }
  const [userData, setuserData] = useState<UserInterface>();
  useEffect(() => {
    (async () => {
      const data = (await getUserData()) as UserInterface;
      setuserData(data);
    })();
  }, []);
  if (userData && userData.usertype === "customer") return <SignInRequest />;
  return (
    <div className="font-emberRg">
      <SellerNavbar userData={userData} />
      <div className="flex gap-4 mt-3 pl-3 pr-7 overflow-auto">
        <ProductTable />
      </div>
    </div>
  );
}

function SellerNavbar({ userData }: { userData: UserInterface | undefined }) {
  const router = useRouter();
  const sellerName = userData?.firstName + " " + userData?.lastName;
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <Image
          src={amznLogo}
          className="mr-3 h-6 w-auto sm:h-9"
          alt="Flowbite Logo"
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm font-emberBd">{sellerName}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <button
              onClick={async () => {
                try {
                  await signOut(auth);
                  router.push("/seller/login");
                } catch (error) {
                  alert("An error has occured");
                  console.log(error);
                }
              }}
            >
              Sign out
            </button>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/seller/dashboard" active={true}>
          Home
        </Navbar.Link>
        <button>About</button>
        <button>Services</button>
        <button>Pricing</button>
        <button>Contact</button>
      </Navbar.Collapse>
    </Navbar>
  );
}

function ProductTable() {
  const [prodData, setprodData] = useState<ProductInfo[]>([]);
  const [prodChanges, setprodChanges] = useState(0);
  const [showModal, setshowModal] = useState(false);
  const [action, setaction] = useState("");
  const [updateProdName, setupdateProdName] = useState("");
  const [checkedItems, setcheckedItems] = useState<CheckedItems[]>([]);
  const [delBtnShow, setdelBtnShow] = useState(checkedItems.length !== 0);
  const [mainCheck, setmainCheck] = useState(false);
  useEffect(() => {
    (async () => {
      const data = await getSellerProducts();
      if (data) {
        setprodData(data);
      }
    })();
  }, [prodChanges]);

  useEffect(() => {
    setdelBtnShow(checkedItems.length !== 0);
  }, [checkedItems]);

  useEffect(() => {
    const inputs = Object.values(document.getElementsByTagName("input")).slice(
      1
    );
    if (mainCheck) {
      inputs.forEach((item) => {
        item.checked = true;
      });
      setcheckedItems(
        prodData.map((item) => {
          const checkItem = {
            checked: true,
            name: item.name,
            category: item.category,
          };
          return checkItem;
        })
      );
    } else {
      inputs.forEach((item) => {
        item.checked = false;
      });
      setcheckedItems([]);
    }
  }, [mainCheck]);

  return (
    <div className="flex flex-col gap-12 w-full">
      <Table hoverable={true} className="overflow-auto">
        <Table.Head>
          <Table.HeadCell className="!p-4">
            <Checkbox
              defaultChecked={mainCheck}
              onClick={() => {
                setmainCheck(mainCheck ? false : true);
              }}
            />
          </Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {prodData?.map((prod) => {
            return (
              <TableItem
                key={prod.name}
                name={prod.name}
                category={prod.category}
                price={prod.price}
                setupdateProdName={setupdateProdName}
                setaction={setaction}
                setshowModal={setshowModal}
                setcheckedItems={setcheckedItems}
                checkedItems={checkedItems}
              />
            );
          })}
        </Table.Body>
      </Table>
      <ButtonGroup
        setmodalShow={setshowModal}
        setaction={setaction}
        delBtnShow={delBtnShow}
        checkedItems={checkedItems}
        setprodChanges={setprodChanges}
        prodChanges={prodChanges}
        setdelBtnShow={setdelBtnShow}
      />
      <ProdModal
        modalShow={showModal}
        setmodalShow={setshowModal}
        action={action}
        prodUpdateName={updateProdName}
        setprodChanges={setprodChanges}
        prodChanges={prodChanges}
      />
    </div>
  );
}

function ButtonGroup({
  setmodalShow,
  setaction,
  setprodChanges,
  setdelBtnShow,
  delBtnShow,
  checkedItems,
  prodChanges,
}: {
  setmodalShow: Dispatch<SetStateAction<boolean>>;
  setaction: Dispatch<SetStateAction<string>>;
  setprodChanges: Dispatch<SetStateAction<number>>;
  setdelBtnShow: Dispatch<SetStateAction<boolean>>;
  delBtnShow: boolean;
  checkedItems: CheckedItems[];
  prodChanges: number;
}) {
  return (
    <div className="flex w-full gap-7 items-center justify-center text-white ">
      <button
        onClick={() => {
          setmodalShow(true);
          setaction("new");
        }}
        className="rounded-2xl bg-[#ffd814] hover:bg-[#f7ca00] text-black p-2 py-2 px-8 shadow-md"
      >
        Add new product
      </button>
      <button
        className={`rounded-2xl bg-red-600 hover:bg-red-500 py-2 px-8 shadow-md ${
          delBtnShow ? "block" : "hidden"
        }`}
        onClick={async () => {
          await handleProdDelete(checkedItems);
          setprodChanges(prodChanges + 1);
          setdelBtnShow(false);
        }}
      >
        Delete
      </button>
    </div>
  );
}

function TableItem({
  name,
  category,
  price,
  setupdateProdName,
  setaction,
  setshowModal,
  setcheckedItems,
  checkedItems,
}: {
  name: string;
  category: string;
  price: number;
  checkedItems: CheckedItems[];
  setupdateProdName: Dispatch<SetStateAction<string>>;
  setaction: Dispatch<SetStateAction<string>>;
  setshowModal: Dispatch<SetStateAction<boolean>>;
  setcheckedItems: Dispatch<SetStateAction<CheckedItems[]>>;
}) {
  const [checked, setchecked] = useState(false);
  useEffect(() => {
    if (checked) {
      setcheckedItems([
        ...checkedItems,
        { checked: checked, name: name, category: category },
      ]);
    } else {
      setcheckedItems(
        checkedItems.filter((item) => {
          return item.name !== name;
        })
      );
    }
  }, [checked]);
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="!p-4">
        <Checkbox
          defaultChecked={checked}
          onClick={() => {
            setchecked(checked ? false : true);
          }}
        />
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {toTitleCase(name)}
      </Table.Cell>
      <Table.Cell>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Table.Cell>
      <Table.Cell>₹{price.toLocaleString()}</Table.Cell>
      <Table.Cell>
        <button
          onClick={() => {
            setupdateProdName(name);
            setaction("update");
            setshowModal(true);
          }}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Edit
        </button>
      </Table.Cell>
    </Table.Row>
  );
}

function ProdModal({
  modalShow,
  setmodalShow,
  action,
  prodUpdateName,
  setprodChanges,
  prodChanges,
}: {
  modalShow: boolean;
  setmodalShow: Dispatch<SetStateAction<boolean>>;
  setprodChanges: Dispatch<SetStateAction<number>>;
  action: string;
  prodUpdateName: string;
  prodChanges: number;
}) {
  const formRef = useRef<any>(null);
  const [title, settitle] = useState("");
  const [btnName, setbtnName] = useState("");
  useEffect(() => {
    if (action === "new") {
      settitle("Add a new product");
      setbtnName("Add item");
    } else {
      settitle(`Update ${prodUpdateName.replaceAll("-", " ")}`);
      setbtnName("Update item");
    }
  });
  return (
    <Modal
      show={modalShow}
      size="md"
      popup={true}
      onClose={() => setmodalShow(false)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-6 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <form
            onSubmit={async (e) => {
              action === "new"
                ? handleProductAdd(e)
                : await handleProductUpdate(e, prodUpdateName);
              setprodChanges(prodChanges + 1);
              formRef.current.reset();
              setmodalShow(false);
            }}
            className="flex flex-col gap-1"
            ref={formRef}
          >
            <div>
              <div className="mb-2 block">
                <label htmlFor="productName" className="text-sm font-emberBd">
                  Product name
                </label>
              </div>
              <input
                id="productName"
                required
                className="border border-gray-500 rounded w-full py-1 px-3 text-sm h-fit"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="category" className="text-sm font-emberBd">
                  Category
                </label>
              </div>
              <input
                id="category"
                required
                className="border border-gray-500 rounded w-full py-1 px-3 text-sm h-fit"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label htmlFor="price" className="text-sm font-emberBd">
                  Price
                </label>
              </div>
              <input
                id="price"
                required
                className="border border-gray-500 rounded w-full py-1 px-3 text-sm h-fit"
              />
            </div>
            <label htmlFor="about" className="text-sm font-emberBd">
              Product description
            </label>
            <div className="flex flex-col gap-2" id="about">
              <input
                id="about0"
                required
                className="border border-gray-500 rounded w-full py-1 px-3 text-sm h-fit"
              />
              <input
                id="about1"
                required
                className="border border-gray-500 rounded w-full py-1 px-3 text-sm h-fit"
              />
              <input
                id="about2"
                required
                className="border border-gray-500 rounded w-full py-1 px-3 text-sm h-fit"
              />
              <input
                id="about3"
                required
                className="border border-gray-500 rounded w-full py-1 px-3 text-sm h-fit"
              />
            </div>
            <div className="mb-2 block">
              <label htmlFor="file" className="text-sm font-emberBd">
                Upload product image
              </label>
              <input type="file" name="file" required accept=".jpg" />
            </div>
            <div className="w-full my-5">
              <button
                type="submit"
                className="rounded-2xl bg-[#ffd814] hover:bg-[#f7ca00] p-2 shadow-md w-full text-center"
              >
                {btnName}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function SignInRequest({}) {
  return (
    <div className="grid place-items-center min-h-[20rem] font-emberBd text-2xl">
      <p>Please sign in as seller to view dashboard</p>
      <Link
        href="/seller/login"
        className="bg-gradient-to-t from-yellow-300 to-yellow-100 rounded hover:to-yellow-200 w-48 py-1.5 border-orange-300 border text-sm text-center mt-4"
      >
        Sign in
      </Link>
    </div>
  );
}
