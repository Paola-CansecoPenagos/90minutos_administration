/*export class Report {
    totalPackages: number;
    packagesByStatus: { [key: string]: number };
  
    constructor(totalPackages: number, packagesByStatus: { [key: string]: number }) {
      this.totalPackages = totalPackages;
      this.packagesByStatus = packagesByStatus;
    }
  }

*/

// src/domain/entities/report.ts
export class Report {
  totalPackages: number;
  packagesByStatus: { [key: string]: number };
  totalMemberships: number;
  membershipsByType: { [key: string]: number };
  membershipsByStatus: { [key: string]: number };

  constructor(totalPackages: number, packagesByStatus: { [key: string]: number }, totalMemberships: number, membershipsByType: { [key: string]: number }, membershipsByStatus: { [key: string]: number }) {
      this.totalPackages = totalPackages;
      this.packagesByStatus = packagesByStatus;
      this.totalMemberships = totalMemberships;
      this.membershipsByType = membershipsByType;
      this.membershipsByStatus = membershipsByStatus;
  }
}
