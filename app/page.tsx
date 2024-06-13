'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Alert } from 'react-bootstrap'
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
          data.map((item: any) => (
            <Card key={item.text} className='md:w-96'>
              <div className='card-body'>
                <p>{item.text}</p>
              </div>
            </Card>
          ))
        )}

        </Col>
      </Row>
    </Container>
  )
}
