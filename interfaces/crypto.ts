export interface Currency {
    logo_url: any;
    id: string;
    symbol: string;
    name: string;
    slug: string;
    color: string;
    image_url: string;
    listed?: boolean;
    description: string;
    exponent: number;
    unit_price_scale: number;
    transaction_unit_price_scale: number;
    address_regex: string;
    resource_urls?: CurrencyUrl[];
    base: string;
    currency: string;
    rank: number;
    market_cap: string;
    percent_change: number;
    launched_at?: string;
    latest: string;
    latest_price: Latestprice;
    circulating_supply: string;
    volume_24h: string;
    tradable_on_wallet?: boolean;
}

export interface Latestprice {
    amount: Amount;
    timestamp: string;
    percent_change: Percentchange;
}

export interface Percentchange {
    hour: number;
    day: number;
    week: number;
    month: number;
    year: number;
    all: number;
}

export interface Amount {
    amount: string;
    currency: string;
    scale: string;
}

export interface CurrencyUrl {
    type: string;
    icon_url: string;
    title: string;
    link: string;
}

// export interface Coin {
//     amount: string;
//     base: string;
//     currency: string;
// }

export interface Coin {
    ask: string;
    bid: string;
    volume: string;
    trade_id: number;
    price: string;
    size: string;
    time: string;
    rfq_volume: string;
}


export interface Ticker {
    timestamp: string;
    price: number;
    volume_24hr: number;
    market_cap: number;
}