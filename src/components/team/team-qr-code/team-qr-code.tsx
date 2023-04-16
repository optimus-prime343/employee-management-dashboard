import { forwardRef, useMemo } from 'react'
import QRCode, { QRCodeProps } from 'react-qr-code'

export interface TeamQRCodeProps extends Omit<QRCodeProps, 'value' | 'ref'> {
  name: string
  password: string
}
export const TeamQRCode = forwardRef<SVGSVGElement, TeamQRCodeProps>(
  ({ name, password, ...rest }, ref) => {
    const qrRedirectURL = useMemo<string>(() => {
      const url = new URL(process.env.VERCEL_URL ?? 'http://localhost:3000')
      url.searchParams.append('name', name)
      url.searchParams.append('password', password)
      return url.toString()
    }, [name, password])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // displays only type error , doesn't affect the functionality on runtime
    return <QRCode ref={ref} {...rest} value={qrRedirectURL} />
  }
)
TeamQRCode.displayName = 'TeamQRCode'
