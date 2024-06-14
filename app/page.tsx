'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col,  Alert } from 'react-bootstrap'
import axios from 'axios'
import LoadingIcon from './LoadingIcon'
import App from './App'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data')
        setData(response?.data?.events)
        console.log(response?.data)
        setLoading(false)
      } catch (err) {
        setError('Error fetching data. Please reload the page.')
        setLoading(false)
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

          {loading === true && (
            <LoadingIcon />
          )}

          {data.length > 0 && (
            <>
              <Alert variant="primary" className="no-bottom-padding-margin md:w-96">
                Order these events from earliest to latest
              </Alert>

              <App data={data} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}
