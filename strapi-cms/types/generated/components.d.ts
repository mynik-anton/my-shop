import type { Schema, Struct } from "@strapi/strapi";

export interface BlocksBanner extends Struct.ComponentSchema {
  collectionName: "components_blocks_banners";
  info: {
    displayName: "Banner";
    icon: "dashboard";
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    image: Schema.Attribute.Media<"images" | "files"> &
      Schema.Attribute.Required;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksBlockBanners extends Struct.ComponentSchema {
  collectionName: "components_blocks_block_banners";
  info: {
    displayName: "BlockBanners";
    icon: "dashboard";
  };
  attributes: {
    blockBanners: Schema.Attribute.Component<"blocks.banner", true>;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "blocks.banner": BlocksBanner;
      "blocks.block-banners": BlocksBlockBanners;
    }
  }
}
