import Image from "next/image";
import amznLogo from "../../public/assets/Amazon_logo.svg";
import {
  Avatar,
  Checkbox,
  Dropdown,
  Navbar,
  Sidebar,
  Table,
} from "flowbite-react";
import Link from "next/link";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiArrowSmRight,
} from "react-icons/hi";
import { auth } from "../../firebase/firebase";
import { CheckUserType } from "../../utils/functions";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
export default function () {
  if (!auth.currentUser)
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
  let userType = "";
  CheckUserType().then((res) => (userType = res));
  if (userType === "customer")
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
  return (
    <div>
      <SellerNavbar />
      <div className="flex gap-4 mt-3 pl-3 pr-7 overflow-auto">
        <SellerSidebar />
        <ProductTable />
      </div>
    </div>
  );
}

function SellerNavbar() {
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
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/seller/dashboard" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/seller/dashboard">About</Navbar.Link>
        <Navbar.Link href="/seller/dashboard">Services</Navbar.Link>
        <Navbar.Link href="/seller/dashboard">Pricing</Navbar.Link>
        <Navbar.Link href="/seller/dashboard">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

function SellerSidebar() {
  const router = useRouter();
  return (
    <div className="w-fit rounded-lg shadow-lg flex flex-col">
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/seller/dashboard" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>

            <Sidebar.Item href="" icon={HiInbox} label="3">
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item icon={HiArrowSmRight}>
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
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

function ProductTable() {
  return (
    <div className="flex flex-col gap-12 w-full">
      <Table hoverable={true} className="overflow-auto">
        <Table.Head>
          <Table.HeadCell className="!p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <TableItem />
          <TableItem />
          <TableItem />
        </Table.Body>
      </Table>
      <ButtonGroup />
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="flex w-full gap-7 items-center justify-center text-white ">
      <button className="rounded-2xl bg-[#ffd814] hover:bg-[#f7ca00] text-black p-2 py-2 px-8 shadow-md">
        Add new product
      </button>
      <button className="rounded-2xl  bg-red-600 hover:bg-red-500 py-2 px-8 shadow-md">
        Delete
      </button>
      <button className="rounded-2xl  bg-green-600 hover:bg-green-500 py-2 px-8 shadow-md">
        Save changes
      </button>
    </div>
  );
}

function TableItem({}) {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="!p-4">
        <Checkbox />
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        Apple MacBook Pro 17"
      </Table.Cell>
      <Table.Cell>Laptop</Table.Cell>
      <Table.Cell>$2999</Table.Cell>
      <Table.Cell>
        <Link
          href=""
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Edit
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}
