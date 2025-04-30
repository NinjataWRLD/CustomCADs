/// <reference types="vitest/config" />
import { defineConfig, UserConfig } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import child_process from 'child_process';
import { env } from 'process';

let config: UserConfig = {
	plugins: [
		TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
		react(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		assetsInlineLimit: 0,
	},
	test: {
		globals: true,
		environment: 'jsdom',
	},
};

if (process.env.NODE_ENV === 'development') {
	const baseFolder =
		env.APPDATA !== undefined && env.APPDATA !== ''
			? `${env.APPDATA}/ASP.NET/https`
			: `${env.HOME}/.aspnet/https`;

	const certificateName = 'customcads';
	const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
	const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

	if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
		if (
			child_process.spawnSync(
				'dotnet',
				[
					'dev-certs',
					'https',
					'--export-path',
					certFilePath,
					'--format',
					'Pem',
					'--no-password',
				],
				{ stdio: 'inherit' },
			).status !== 0
		) {
			throw new Error('Could not create certificate.');
		}
	}

	config = {
		...config,
		server: {
			port: 5173,
			https: {
				key: fs.readFileSync(keyFilePath),
				cert: fs.readFileSync(certFilePath),
			},
		},
	};
}

// https://vitejs.dev/config/
export default defineConfig(config);
