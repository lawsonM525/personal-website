import sharp from "sharp"

export const coverUploadLimit = 2 * 1024 * 1024
export const coverStoredLimit = 1024 * 1024

// Decode and re-encode raster input: filenames, EXIF and embedded source data
// never become part of the published image. Never accept SVG or animation.
export async function normalizeCover(input: Buffer) {
  if (!input.length || input.length > coverUploadLimit) throw new RangeError("Choose an image under 10 MB. Try a smaller screenshot if it won’t upload.")
  const jpeg = input[0] === 0xff && input[1] === 0xd8 && input[2] === 0xff
  const png = input.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  const webp = input.toString("ascii", 0, 4) === "RIFF" && input.toString("ascii", 8, 12) === "WEBP"
  if (!jpeg && !png && !webp) throw new RangeError("Choose a JPG, PNG or WebP image.")
  const image = sharp(input, { limitInputPixels: 24_000_000, animated: false, failOn: "warning" })
  const metadata = await image.metadata()
  if ((metadata.pages || 1) > 1) throw new RangeError("Choose a still image rather than an animation.")
  if (!metadata.width || !metadata.height || Math.min(metadata.width, metadata.height) < 180 || Math.max(metadata.width, metadata.height) < 320) throw new RangeError("Choose an image at least 320 × 180 pixels so people can see your project.")
  const { data, info } = await image.rotate().resize(1600, 1600, { fit: "inside", withoutEnlargement: true }).webp({ quality: 80 }).toBuffer({ resolveWithObject: true })
  if (data.length > coverStoredLimit) throw new RangeError("That image is still too large. Try a simpler screenshot.")
  return { data, width: info.width, height: info.height }
}
