import { Button, Drawer, DrawerProps, Group, Stack } from '@mantine/core'
import { IconDownload, IconPrinter } from '@tabler/icons-react'
import { useCallback, useRef } from 'react'

import { TeamQRCode } from '@/components/team/team-qr-code'
import { TeamWithMembers } from '@/hooks/team'

export interface TeamInfoDrawerProps extends DrawerProps {
  team: TeamWithMembers
}
export function TeamInfoDrawer({ team, ...rest }: TeamInfoDrawerProps) {
  const qrRef = useRef<SVGSVGElement | null>(null)
  const handlePrint = useCallback(() => {
    const qrSvg = qrRef.current
    if (qrSvg !== null) {
      const printWindow = window.open('', '', 'height=400,width=800')
      printWindow?.document.write(qrSvg.outerHTML)
      printWindow?.document.close()
      printWindow?.focus()
      printWindow?.print()
      printWindow?.close()
    }
  }, [])
  const handleDownload = useCallback(() => {
    const qrSvg = qrRef.current
    if (qrSvg !== null) {
      const svgData = qrSvg.outerHTML
      const preface = '<?xml version="1.0" standalone="no"?>'
      const svgBlob = new Blob([preface, svgData], {
        type: 'image/svg+xml;charset=utf-8',
      })
      const svgUrl = URL.createObjectURL(svgBlob)
      const downloadLink = document.createElement('a')
      downloadLink.href = svgUrl
      downloadLink.download = `team-${team.id}-qr-code.svg`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }, [team.id])
  return (
    <Drawer {...rest}>
      <Stack>
        <TeamQRCode ref={qrRef} teamId={team.id.toString()} />
        <Group>
          <Button leftIcon={<IconPrinter />} onClick={handlePrint}>
            Print
          </Button>
          <Button
            leftIcon={<IconDownload />}
            onClick={handleDownload}
            variant='outline'
          >
            Download
          </Button>
        </Group>
      </Stack>
    </Drawer>
  )
}
