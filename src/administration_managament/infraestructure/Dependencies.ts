import { GetAllPackageCommentRequest } from "./services/GetAllPackageCommentRequest";
import { GetAllPackageRatingRequest } from "./services/GetAllPackageRatingRequest";
import { GetAllPackagesRequest } from "./services/GetAllPackagesRequest";
import { GetAllPaymentsMembersRequest } from "./services/GetAllPaymentsMembersRequest";
import { GetAllPaymentsPackageRequest } from "./services/GetAllPaymentsPackageRequest";

export async function initGetAllPackageCommentRequest() {
    const requestInstance = new GetAllPackageCommentRequest();
    await requestInstance.receiveMessage();
}
export async function initGetAllPackageRatingRequest() {
    const requestInstance = new GetAllPackageRatingRequest();
    await requestInstance.receiveMessage();
}

export async function initGetAllPackagesRequest() {
    const requestInstance = new GetAllPackagesRequest();
    await requestInstance.receiveMessage();
}


export async function initGetAllPaymentsPackageRequest() {
    const requestInstance = new GetAllPaymentsPackageRequest();
    await requestInstance.receiveMessage();
}

export async function initGetAllPaymentsMembersRequest() {
    const requestInstance = new GetAllPaymentsMembersRequest();
    await requestInstance.receiveMessage();
}