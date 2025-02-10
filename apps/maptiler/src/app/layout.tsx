import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Container, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ApolloWrapper } from "@/utils/ApolloWrapper";
import { SnackbarWrapper } from "@/components/SnackbarWrapper";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export const metadata: Metadata = {
	title: "MapTiler Task",
	description: "Nextjs + GraphQL",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} flex h-full min-h-screen flex-col antialiased`}>
				<ApolloWrapper> 
					<AppRouterCacheProvider>
						<ThemeProvider theme={theme}>
							<Navbar />
							<Container
								maxWidth="md"
								sx={{ paddingTop: "3rem", flex: 1 }}>
								{children}
							</Container>
							<Footer />
						</ThemeProvider>
					</AppRouterCacheProvider>

					<SnackbarWrapper/>	
				</ApolloWrapper>
			</body>
		</html>
	);
}
