import React from 'react'
import styled from '@emotion/styled'
import Flex from 'components/Flex'
import theme from 'components/theme'
import ImageExif from 'interfaces/ImageExif'

type Props = { exif?: ImageExif }
type ExifProps = { label: string; value: unknown }

const Exif = ({ label, value }: ExifProps): JSX.Element | null => {
  return typeof value === 'object' ? null : (
    <StyledExif>
      <strong>{label}</strong>: {value}
    </StyledExif>
  )
}

const SidebarExif = ({ exif }: Props): JSX.Element => (
  <StyledExifList>
    {exif
      ? Object.keys(exif)
          .sort()
          .map((key: string) => <Exif key={key} label={key} value={exif[key]} />)
      : 'No exif data found'}
  </StyledExifList>
)

export default SidebarExif

const StyledExifList = styled(Flex)`
  background: ${theme.color.aeroBlue};
  padding: 1rem 1.2rem;
  font-size: 0.8rem;
`

const StyledExif = styled('p')`
  margin: 0 0 0.5rem;
`
