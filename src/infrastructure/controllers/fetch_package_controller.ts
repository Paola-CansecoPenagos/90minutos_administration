import { Request, Response } from 'express';
import { FetchPackage } from '../../application/usecases/fetch_package';
import { PackageRepository } from '../repositories/fetch_package_repository';

export class FetchPackageController {
    async fetchPackage(req: Request, res: Response) {
        const repository = new PackageRepository();
        const useCase = new FetchPackage(repository);
        try {
            await useCase.execute();
            res.status(200).send({ message: 'Data fetched and saved successfully' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({ message: 'Failed to fetch and save data', error: error.message });
            } else {
                res.status(500).send({ message: 'An unexpected error occurred' });
            }
        }
    }
}
