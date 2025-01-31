import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import child_process from 'child_process';
import { env } from 'process';

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

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		port: 5173,
		https: {
			key: fs.readFileSync(keyFilePath),
			cert: fs.readFileSync(certFilePath),
		},
	},
});
