import type { Video } from "../hooks/useData";

const ASSETS_BASE_URL = "https://storage.cloud.google.com/jefftube";

export function getThumbnailUrl(video: Video): string {
  if (video.hasThumbnail) {
    return `${ASSETS_BASE_URL}/thumbnails/${video.filename.replace(/\.(mp4|mov)$/, "")}.jpg`;
  }
  return `https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/IDogLights2.JPG/250px-IDogLights2.JPG`;
}

export function getVideoUrl(filename: string): string {
  return `${ASSETS_BASE_URL}/${filename}`;
}
