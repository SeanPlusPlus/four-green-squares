'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Alert, Button, ButtonGroup } from 'react-bootstrap'
import axios from 'axios'
import LoadingIcon from './LoadingIcon'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState('')
  const [ordered, setOrdered] = useState([null, null, null, null])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data')
        setData(response?.data?.events)
        setLoading(false)
      } catch (err) {
        setError('Error fetching data. Please reload the page.')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateIndex = (array: any, idx: number, newValue: any): any => {
    // empty slot in ordered
    return array.map((item: any, index: any) => (index === idx ? newValue : item));
  }

  const handleClick = (item: any, pos: any, orderedSet = false) => {
    const idx = pos - 1
    const occupied = ordered[idx]
    const updated = updateIndex(ordered, idx, item)

    setOrdered(updated)

    const filteredData = data.filter((i) => (i.id !== item.id))
    if (occupied) {
      setData(filteredData.concat(occupied))
    } else {
      setData(filteredData)
    }
  }

  return (
    <Container>
      <Row>
        <Col className="d-grid justify-content-center gap-2">

          {error.length > 0 && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          {loading === true && (
            <LoadingIcon />
          )}

          {loading === false && (
            <>
              <Alert variant="primary" className="no-bottom-padding-margin md:w-96">
                Order these events from earliest to latest
              </Alert>

              {ordered.map((item: any, i: number) => (
                item && (
                  <Card key={item.text} className='md:w-96'>
                    <div className='card-body'>
                      <p>{item.text}</p>
                      <div className="custom-button-group float-right">
                        {[1, 2, 3, 4].map((buttonNumber) => (
                          <Button 
                            key={buttonNumber} 
                            variant={i + 1 === buttonNumber ? "primary" : "secondary"}
                            onClick={() => handleClick(item, buttonNumber, true)}
                          >
                            {buttonNumber}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </Card>
                )
              ))}
            </>
          )}

          {data.length > 0 && (
            data.map((item: any) => (
              <Card key={item.text} className='md:w-96'>
                <div className='card-body'>
                  <p>{item.text}</p>
                  <div className="custom-button-group float-right">
                    {[1, 2, 3, 4].map((buttonNumber) => (
                      <Button 
                        key={buttonNumber} 
                        variant="dark" 
                        onClick={() => handleClick(item, buttonNumber)}
                      >
                        {buttonNumber}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  )
}
