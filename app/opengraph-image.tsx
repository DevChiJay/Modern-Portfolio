import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'DevChi Portfolio'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #000, #333)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: 48,
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 20 }}>
          DevChi
        </div>
        <div style={{ fontSize: 36, textAlign: 'center' }}>
          Modern & Minimal Portfolio
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
