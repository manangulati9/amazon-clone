import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";

interface VerifyEmailProps {
	href: string;
}

export default function VerifyEmail({ href }: VerifyEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Amazon Clone Email Verification</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={coverSection}>
						<Section style={imageSection}>
							<Img
								src="https://gtsqetcjzlgmnjxsbmns.supabase.co/storage/v1/object/public/assets/amazon-logo.png"
								width="155"
								height="60"
								alt="logo"
							/>
						</Section>
						<Section style={upperSection}>
							<Heading style={h1}>Verify your email address</Heading>
							<Text style={mainText}>
								Thanks for starting the new Amazon Clone account creation
								process. We want to make sure it&apos;s really you. Please click
								the following link to verify your account. If you don&apos;t
								want to create an account, you can ignore this message.
							</Text>
							<Section style={verificationSection}>
								<Link href={href} target="_blank" style={link}>
									Verify account
								</Link>
								<Text style={validityText}>
									(This link is valid for 10 minutes)
								</Text>
							</Section>
						</Section>
						<Hr />
						<Section style={lowerSection}>
							<Text style={cautionText}>
								Amazon Clone will never email you and ask you to disclose or
								verify your password, credit card, or banking account number.
							</Text>
						</Section>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: "#fff",
	color: "#212121",
};

const container = {
	padding: "20px",
	margin: "0 auto",
	backgroundColor: "#eee",
};

const h1 = {
	color: "#333",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "20px",
	fontWeight: "bold",
	marginBottom: "15px",
};

const link = {
	color: "#2754C5",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "16px",
	fontWeight: "bold",
	textDecoration: "underline",
};

const text = {
	color: "#333",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	fontSize: "14px",
	margin: "24px 0",
};

const imageSection = {
	backgroundColor: "#252f3d",
	display: "flex",
	padding: "20px 0",
	alignItems: "center",
	justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const validityText = {
	...text,
	margin: "0px",
	textAlign: "center" as const,
};

const verificationSection = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	textAlign: "center" as const,
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
