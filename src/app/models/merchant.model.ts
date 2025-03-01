export interface IMerchant {
    merchantId:       number;
    businessName:     string;
    city:             string;
    phone:            string;
    email:            string;
    registrationDate: Date;
    status:           string;
    lastUpdated:      Date;
    updatedByUser:    number;
    establishments:   any[];
}

export interface IBodyMerchant {
    businessName: string;
    city:         string;
    phone:        string;
    email:        string;
    status:       string;
}