import { Container, Row, Col, Card } from 'react-bootstrap'

const cards = [
  {
    year: 1966,
    text: "The first artificial heart was successfully implanted in a human. This groundbreaking medical achievement marked a significant advancement in cardiac surgery.",
  },
  {
    year: 1975,
    text: "The Vietnam War officially ended with the Fall of Saigon on April 30, marking the capture of the South Vietnamese capital by the People's Army of Vietnam and the Viet Cong. This event led to the unconditional surrender of South Vietnam and the reunification of Vietnam under communist control.",
  },
  {
    year: 1981,
    text: "The first launch of the Space Shuttle program occurred with the successful mission of Columbia. This marked a new era in reusable spacecraft for NASA.",
  },
  {
    year: 1983,
    text: "The Nintendo Entertainment System (NES) was released in Japan. It revolutionized the video game industry and became a global phenomenon.",
  },
]


export default function Home() {
  return (
    <Container>
      <Row>
        <Col className="d-grid justify-content-center gap-2">
          { cards.map((card) => (
            <Card key={card.text} style={{ width: '18rem' }}>
              <div className='card-body'>
                <p>{card.text}</p>
              </div>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  )
}
