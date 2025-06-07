declare module "get-ascii-image" {
  interface AsciiImageOptions {
    maxWidth?: number;
    maxHeight?: number;
  }

  function getAsciiImage(
    imageUrl: string,
    options?: AsciiImageOptions,
  ): Promise<string>;

  export default getAsciiImage;
}
