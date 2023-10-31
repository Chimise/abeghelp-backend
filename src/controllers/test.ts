import { Request, Response } from 'express';
import AppError from 'src/common/utils/appError';
import { catchAsync } from 'src/middlewares';
import { addEmailToQueue } from 'src/queues/emailQueue';

export const test = catchAsync(async (req: Request, res: Response) => {
	if (req.body) throw new AppError('Test error', 400);

	addEmailToQueue({
		type: 'passwordResetSuccessful',
		data: {
			to: 'obcbeats@gmail.com',
			priority: 'high',
		},
	});
	return res.status(200).json({
		status: 'success',
		message: 'Test route',
	});
});
