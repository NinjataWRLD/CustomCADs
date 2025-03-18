import { createFileRoute } from '@tanstack/react-router';
import UploadProduct from '@/app/private/creator/upload-product';

export const Route = createFileRoute('/(private)/_creator/upload-product')({
	component: UploadProduct,
});
