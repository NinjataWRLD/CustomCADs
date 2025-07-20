import { v4 as uuidv4 } from 'uuid';

export default {
	HEADER: 'Idempotency-Key' as const,
	NEW_KEY: uuidv4,
};
