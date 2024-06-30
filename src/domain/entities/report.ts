export class Report {
    totalPackages: number;
    packagesByStatus: { [key: string]: number };
  
    constructor(totalPackages: number, packagesByStatus: { [key: string]: number }) {
      this.totalPackages = totalPackages;
      this.packagesByStatus = packagesByStatus;
    }
  }