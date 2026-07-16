const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#eef2ff" offset="20%" />
      <stop stop-color="#ccd5f3" offset="50%" />
      <stop stop-color="#eef2ff" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#eef2ff" />
  <rect width="${w}" height="${h}" fill="url(#g)" />
</svg>`;

const toBase64 = (str: string) =>
  Buffer.from(str).toString("base64");

export const blurPlaceholder = (width = 800, height = 600) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;
