export interface SearchStoreModel<T extends Record<PropertyKey, any>> {
    data: T[]
    sanitized: T[]
    targetSearch: string
};

type FiltersType = [
    {
        filterType: string  
        maxPrice: string      
        minPrice: string
        tickSize: string
    },

    {
        filterType: string
        maxQty: string
        minQty: string
        stepSize: string
    },

    {
        filterType: string
        maxQty: string
        minQty: string
        stepSize: string
    },

    {
        filterType: string
        limit: number
    },

    {
        filterType: string
        limit: number
    },

    {
        filterType: string
        notional: string
    },

    {
        filterType: string
        multiplierDecimal: string
        multiplierDown: string
        multiplierUp: string
   
    },
];

export type SymbolTypes = {
    symbol: string
    pair: string
    contractType: string
    deliveryDate: number
    onboardDate: number
    status: string
    maintMarginPercent: string
    requiredMarginPercent: string
    baseAsset: string
    quoteAsset: string
    marginAsset: string
    pricePrecision: number
    quantityPrecision: number
    baseAssetPrecision: number
    quotePrecision: number
    underlyingType: string
    underlyingSubType: string[],
    settlePlan: number
    triggerProtect: string
    liquidationFee: string
    marketTakeBound: string
    maxMoveOrderLimit: number,
    filters: FiltersType,
    orderTypes: string[],
    timeInForce: string[]

};

export type CandaleTypes = {
    time: string
    open: number
    high: number
    low: number
    close: number
}

export type SavedChartsType = {
    id: number
    created_at: string
    user_uid: string
    data_array: string
}