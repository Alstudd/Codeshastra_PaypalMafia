"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia } from "wagmi/chains";

export const config = createConfig(
	getDefaultConfig({
		chains: [sepolia],
		transports: {
			[sepolia.id]: http(
				`https://eth-sepolia.g.alchemy.com/v2/epmRQeqj-86LNH5mnC1blApnysegqAuI`
			),
		},
		walletConnectProjectId: "",
		appName: "LearnBlocks",
	})
);

const queryClient = new QueryClient();

export default function Web3Provider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider>{children}</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
