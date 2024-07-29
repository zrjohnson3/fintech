export interface Currency {
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

interface Latestprice {
    amount: Amount;
    timestamp: string;
    percent_change: Percentchange;
}

interface Percentchange {
    hour: number;
    day: number;
    week: number;
    month: number;
    year: number;
    all: number;
}

interface Amount {
    amount: string;
    currency: string;
    scale: string;
}

interface CurrencyUrl {
    type: string;
    icon_url: string;
    title: string;
    link: string;
}