export interface Provider {
    createdAt?: Date;
    description?: string;
    email?: string;
    geoEnabled?: boolean;
    handle?: string;
    id?: string;
    image?: string;
    expireAt?: string;
    name?: string;
    providerType?: Provider.ProviderTypeEnum;
    secure?: boolean;
    updatedAt?: Date;
    url?: string;
}
export namespace Provider {
    export type ProviderTypeEnum = 'SELF' | 'TWITTER' | 'LINKEDIN';
    export const ProviderTypeEnum = {
        SELF: 'SELF' as ProviderTypeEnum,
        TWITTER: 'TWITTER' as ProviderTypeEnum,
        LINKEDIN: 'LINKEDIN' as ProviderTypeEnum
    };
}
