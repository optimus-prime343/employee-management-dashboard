import { forwardRef, useMemo } from 'react'
import QRCode, { QRCodeProps } from 'react-qr-code'

export interface TeamQRCodeProps extends Omit<QRCodeProps, 'value' | 'ref'> {
  teamId: string
}
export const TeamQRCode = forwardRef<SVGSVGElement, TeamQRCodeProps>(
  ({ teamId, ...rest }, ref) => {
    const qrRedirectURL = useMemo<string>(() => {
      const url = new URL(
        process.env.NEXT_PUBLIC_VERCEL_URL ?? 'http://localhost:3000'
      )
      url.searchParams.append('teamId', teamId)
      return url.toString()
    }, [teamId])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // displays only type error , doesn't affect the functionality on runtime
    return <QRCode {...rest} ref={ref} value={qrRedirectURL} />
  }
)
TeamQRCode.displayName = 'TeamQRCode'
