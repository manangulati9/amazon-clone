import React from "react";
import Link from "next/link";
export default function () {
  return (
    <footer className="text-white h-full">
      <button
        className="bg-[#37475a] hover:bg-[#485769] w-full text-xs p-3"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        Back to top
      </button>
      <div className="flex sm:justify-evenly items-top py-7 bg-[#232f3e] sm:flex-row flex-col gap-6 p-5 items-baseline">
        <div>
          <h2 className="font-emberBd mb-3">Get To Know Us</h2>
          <Link
            href="https://www.aboutamazon.in/?utm_source=gateway&utm_medium=footer"
            className="hover:underline text-sm text-gray-200 block"
          >
            About Us
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://amazon.jobs/"
          >
            Careers
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://press.aboutamazon.in/?utm_source=gateway&utm_medium=footer"
          >
            Press Releases
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazon.science/"
          >
            Amazon Science
          </Link>
        </div>
        <div>
          <h2 className="font-emberBd mb-3">Connect with Us</h2>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazon.in/gp/redirect.html/ref=footer_fb?location=http://www.facebook.com/AmazonIN&token=2075D5EAC7BB214089728E2183FD391706D41E94&6"
          >
            Facebook
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazon.in/gp/redirect.html/ref=footer_twitter?location=http://twitter.com/AmazonIN&token=A309DFBFCB1E37A808FF531934855DC817F130B6&6"
          >
            Twitter
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazon.in/gp/redirect.html?location=https://www.instagram.com/amazondotin&token=264882C912E9D005CB1D9B61F12E125D5DF9BFC7&source=standards"
          >
            Instagram
          </Link>
        </div>
        <div>
          <h2 className="font-emberBd mb-3">Make Money with Us</h2>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazon.in/b/?node=2838698031&ld=AZINSOANavDesktopFooter_C&ref_=nav_footer_sell_C"
          >
            Sell on Amazon
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://accelerator.amazon.in/?ref_=map_1_b2b_GW_FT"
          >
            Sell under Amazon Accelerator
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://brandservices.amazon.in/?ref=AOINABRLGNRFOOT&ld=AOINABRLGNRFOOT"
          >
            Protect and Build Your Brand
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://sell.amazon.in/grow-your-business/amazon-global-selling.html?ld=AZIN_Footer_V1&ref=AZIN_Footer_V1"
          >
            Amazon Global Selling
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://affiliate-program.amazon.in/?utm_campaign=assocshowcase&utm_medium=footer&utm_source=GW&ref_=footer_assoc"
          >
            Become an Affiliate
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://services.amazon.in/services/fulfilment-by-amazon/benefits.html/ref=az_footer_fba?ld=AWRGINFBAfooter"
          >
            Fulfilment by Amazon
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://advertising.amazon.in/?ref=Amz.in"
          >
            Advertise Your Products
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazonpay.in/merchant"
          >
            Amazon Pay on Merchants
          </Link>
        </div>
        <div>
          <h2 className="font-emberBd mb-3">Let Us Help You</h2>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazon.in/gp/help/customer/display.html?nodeId=GDFU3JS5AL6SYHRD&ref_=footer_covid"
          >
            COVID-19 and Amazon
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazon.in/gp/css/homepage.html?ref_=footer_ya"
          >
            Your Account
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazon.in/gp/css/returns/homepage.html?ref_=footer_hy_f_4"
          >
            Returns Centre
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazon.in/gp/help/customer/display.html?nodeId=201083470&ref_=footer_swc"
          >
            100% Purchase Protection
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazon.in/gp/browse.html?node=6967393031&ref_=footer_mobapp"
          >
            Amazon App Download
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazon.in/gp/BIT/theamazonapp/ref=footer_assistant_download_copy"
          >
            Amazon Assistant Download
          </Link>
          <Link
            className="hover:underline text-sm text-gray-200 block"
            href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200507590&ref_=footer_gw_m_b_he"
          >
            Help
          </Link>
        </div>
      </div>
      <div className="text-center bg-[#131a22] py-3">
        <div className="flex justify-center gap-4 mb-1 ">
          <Link
            className="hover:underline text-xs"
            href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200545940&ref_=footer_cou"
          >
            Conditions of Use & Sale
          </Link>
          <Link
            className="hover:underline text-xs"
            href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200534380&ref_=footer_privacy"
          >
            Privacy Notice{" "}
          </Link>
          <Link
            className="hover:underline text-xs"
            href="https://www.amazon.in/gp/help/customer/display.html?nodeId=202075050&ref_=footer_iba"
          >
            Interest-Based Ads
          </Link>
        </div>
        <p className="text-xs">
          @ 1996-2022 Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
}
