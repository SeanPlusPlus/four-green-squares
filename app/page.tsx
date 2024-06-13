'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Alert, Button, ButtonGroup } from 'react-bootstrap'
import axios from 'axios'
import LoadingIcon from './LoadingIcon'

export default function Home() {
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data')
        setData(response?.data?.events)
      } catch (err) {
        setError('Error fetching data. Please reload the page.')
      }
    }

    fetchData()
  }, [])

  const handleClick = (i: any, n: any) => {
    console.log(i, n)
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

        {data.length === 0 && error === '' && (
          <LoadingIcon />
        )}


        {data.length > 0 && (
          <>
          <Alert variant="primary" className="no-bottom-padding-margin">
            Order these events from earliest to most recent
          </Alert>
          {
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
            ))}
          </>
        )}

        </Col>
      </Row>
    </Container>
  )
}
