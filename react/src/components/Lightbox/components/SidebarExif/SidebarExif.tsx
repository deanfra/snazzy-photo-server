import React from 'react'
import styled from '@emotion/styled'
import Flex from 'components/Flex'
import ImageExif from 'interfaces/ImageExif'

type Props = {exif: ImageExif;}
type ExifProps = {label: string; value: unknown;}

const Exif = ({label, value}: ExifProps): JSX.Element | null => {
  return typeof value === 'object' ? null 
  : <StyledExif>{label}: {value}</StyledExif>
}

const SidebarExif = ({ exif }: Props): JSX.Element => <StyledSidebarExif>
    { Object.keys(exif).sort().map((key:string) => <Exif label={key} value={exif[key]} />) }
  </StyledSidebarExif>

export default SidebarExif

const StyledExif = styled('p')`
  margin: 1rem 0 0;
`

const StyledSidebarExif = styled(Flex)`
  position: fixed;
  height: calc(100vh - 2rem);
  margin: 5rem 1rem 1rem;
  right: 0;
  width: 20rem;
  overflow-y: auto;
  z-index: 3;
`
