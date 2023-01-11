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
  HiViewBoards,
  HiInbox,
  HiUser,
  HiShoppingBag,
  HiArrowSmRight,
  HiTable,
} from "react-icons/hi";
export default function () {
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
  return (
    <div className="w-fit rounded-lg shadow-lg flex flex-col">
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiViewBoards}
              label="Pro"
              labelColor="alternative"
            >
              Kanban
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox} label="3">
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
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
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="!p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </Table.Cell>

            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <Link
                href=""
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="!p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Magic Mouse 2
            </Table.Cell>

            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <Link
                href=""
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <div className="flex w-full gap-7 items-center justify-center text-white ">
        <button className="rounded-2xl  bg-red-600 hover:bg-red-500 py-2 px-8 shadow-md">
          Delete
        </button>
        <button className="rounded-2xl  bg-green-600 hover:bg-green-500 py-2 px-8 shadow-md">
          Save changes
        </button>
      </div>
    </div>
  );
}
