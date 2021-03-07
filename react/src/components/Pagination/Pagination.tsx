import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from '@emotion/styled'
import Flex from '../Flex'
import Button from 'components/Button'

type Props = {
  pageSize: number
  setPageSize: Dispatch<SetStateAction<number>>
}
const Pagination = ({setPageSize, pageSize}: Props): JSX.Element => {
  const [basePageSize] = useState(pageSize)

  const onClick = () => {
    pageSize += basePageSize
    setPageSize(pageSize)
  }
  
  return <Flex>
    <Button onClick={onClick}>Load more</Button>
  </Flex>
}

export default Pagination
