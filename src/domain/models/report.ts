export class Report {
    constructor(
        public totalComments: number,
        public monthlyComments: number[],
        public totalEarnings: number,
        public monthlyMemberships: number[],
        public packagesByStatus: { [key: string]: number },
        public monthlyPackageStatus: { [key: string]: number[] },
        public totalPackages: number
    ) {}
}
