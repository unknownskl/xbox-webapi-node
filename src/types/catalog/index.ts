export interface CatalogSearchResponse {
    Results:          Result[];
    TotalResultCount: number;
}

export interface Result {
    ProductFamilyName: ProductFamilyName;
    Products:          Product[];
}

export enum ProductFamilyName {
    Apps = "Apps",
    Games = "Games",
}

export interface Product {
    BackgroundColor:    string;
    Height:             number;
    ImageType:          ImageType;
    Width:              number;
    PlatformProperties: any[];
    Icon:               string;
    ProductId:          string;
    Type:               Type;
    Title:              string;
}

export enum ImageType {
    BoxArt = "BoxArt",
    Logo = "Logo",
    Tile = "Tile",
}

export enum Type {
    Application = "Application",
    Durable = "Durable",
    Game = "Game",
}
