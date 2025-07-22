import React from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import "./Contact.css";
import Header from "@/footer/Header";
import Footer from "@/footer/Footer";
import { Button } from "@/components/ui/button";

const Contact = () => {
  // Office location coordinates (Prestige Medical Health Science)
  const officeLocation = {
    lat: 12.9716, // Bangalore latitude
    lng: 77.5946, // Bangalore longitude
    address:
      "Prestige Medical Health Science, 97/1 1st Block 1st Cross HBR, Bangalore 560-043",
  };

  return (
    <div className="contact-us-page">
      <Header />

      <main className="contact-main">
        <Container>
          <Row className="justify-content-between">
            {/* Contact Form Column */}
            <Col lg={7} className="mb-5 mb-lg-0">
              <Card className="contact-form-card">
                <Card.Body>
                  <h2 className="section-title">Have Any Questions For Us?</h2>
                  <p className="section-subtitle">
                    Various versions have evolved over the years, sometimes by
                    accident, sometimes on purpose injected humour and the like.
                  </p>

                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formName" className="mb-3">
                          <Form.Label>Your Name*</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formEmail" className="mb-3">
                          <Form.Label>Your Email*</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group controlId="formSubject" className="mb-3">
                      <Form.Label>Your Subject**</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter subject"
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formMessage" className="mb-3">
                      <Form.Label>Your Message**</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter your message"
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formAgreement" className="mb-4">
                      <Form.Check
                        type="checkbox"
                        label='By clicking you agree to use our "Form" terms & condition'
                        required
                      />
                    </Form.Group>

                    <Button className="submit-btn w-full" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Contact Info Column */}
            <Col lg={4}>
              <Card className="contact-info-card">
                <Card.Body>
                  <div className="contact-info-section">
                    <h3 className="info-title">Visit Our Office</h3>
                    <p className="info-content">
                      Prestige medical health science
                      <br />
                      97/1 1st Block 1st Cross HBR
                      <br />
                      Bangalore 560-043
                    </p>
                  </div>

                  <div className="contact-info-section">
                    <h3 className="info-title">Call Us Anytime</h3>
                    <p className="info-content">
                      <a href="tel:+91988649994">+91 988649994</a>
                    </p>
                  </div>

                  <div className="contact-info-section">
                    <h3 className="info-title">For Queries</h3>
                    <p className="info-content">
                      <a href="mailto:drshan@thefuturemed.com">
                        drshan@thefuturemed.com
                      </a>
                    </p>
                  </div>
                </Card.Body>
              </Card>

              {/* Map Section */}
            </Col>
              <Card className="mt-4 map-card">
                <Card.Body>
                  <h3 className="info-title">Our Location</h3>
                  <div className="map-container">
                    <iframe
                      title="Office Location"
                      width="100%"
                      height="300"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src={`https://maps.google.com/maps?q=${officeLocation.lat},${officeLocation.lng}&z=15&output=embed`}
                    />
                  </div>
                  <div className="text-center mt-3">
                    <Button
                      variant="outline"
                      className="directions-btn"
                      asChild
                    >
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${officeLocation.lat},${officeLocation.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
