// import React from "react";
// import { Container, Row, Col, Form, Card } from "react-bootstrap";
// import "./Contact.css";
// import Header from "@/footer/Header";
// import Footer from "@/footer/Footer";
// import { Button } from "@/components/ui/button";

// const Contact = () => {
//   // Office location coordinates (Prestige Medical Health Science)
//   const officeLocation = {
//     lat: 12.9716, // Bangalore latitude
//     lng: 77.5946, // Bangalore longitude
//     address:
//       "Prestige Medical Health Science, 97/1 1st Block 1st Cross HBR, Bangalore 560-043",
//   };

//   return (
//     <div className="contact-us-page">
//       <Header />

//       <main className="contact-main">
//         <Container>
//           <Row className="justify-content-between">
//             {/* Contact Form Column */}
//             <Col lg={7} className="mb-5 mb-lg-0">
//               <Card className="shadow-sm mb-4">
//                 <Card.Body>
//                   <h2 className="section-title">Have Any Questions For Us?</h2>
//                   <p className="section-subtitle">
//                     Various versions have evolved over the years, sometimes by
//                     accident, sometimes on purpose injected humour and the like.
//                   </p>

//                   <Form>
//                     <Row>
//                       <Col md={6}>
//                         <Form.Group controlId="formName" className="mb-3">
//                           <Form.Label>Your Name *</Form.Label>
//                           <Form.Control
//                             type="text"
//                             placeholder="Enter your name"
//                             required
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col md={6}>
//                         <Form.Group controlId="formEmail" className="mb-3">
//                           <Form.Label>Your Email *</Form.Label>
//                           <Form.Control
//                             type="email"
//                             placeholder="Enter your email"
//                             required
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     <Form.Group controlId="formSubject" className="mb-3">
//                       <Form.Label>Your Subject *</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter subject"
//                         required
//                       />
//                     </Form.Group>

//                     <Form.Group controlId="formMessage" className="mb-3">
//                       <Form.Label>Your Message *</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         rows={5}
//                         placeholder="Enter your message"
//                         required
//                       />
//                     </Form.Group>

//                     <Form.Group controlId="formAgreement" className="mb-4">
//                       <Form.Check
//                         type="checkbox"
//                         label='By clicking you agree to use our "Form" terms & condition'
//                         required
//                       />
//                     </Form.Group>

//                     <Button className="submit-btn w-full" type="submit">
//                       Submit
//                     </Button>
//                   </Form>
//                 </Card.Body>
//               </Card>
//               <Card className="shadow-sm">
//                 <Card.Body>
//                   <div className="contact-info-section">
//                     <h3 className="info-title">India Office</h3>
//                     <p className="info-content">
//                       6/8 Wheelers Road, D Costa Layout
//                       <br />
//                       Cox Town, Bangalore-560005
//                     </p>
//                     <p className="info-content">
//                       <a href="tel:+91988649994">+91 988-649-9994</a>
//                     </p>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* Contact Info Column */}
//             {/* <Col lg={4}>
//               <Card className="contact-info-card">
//                 <Card.Body>
//                   <div className="contact-info-section">
//                     <h3 className="info-title">Visit Our Office</h3>
//                     <p className="info-content">
//                       Prestige medical health science
//                       <br />
//                       97/1 1st Block 1st Cross HBR
//                       <br />
//                       Bangalore 560-043
//                     </p>
//                   </div>

//                   <div className="contact-info-section">
//                     <h3 className="info-title">Call Us Anytime</h3>
//                     <p className="info-content">
//                       <a href="tel:+91988649994">+91 988649994</a>
//                     </p>
//                   </div>

//                   <div className="contact-info-section">
//                     <h3 className="info-title">For Queries</h3>
//                     <p className="info-content">
//                       <a href="mailto:drshan@thefuturemed.com">
//                         drshan@thefuturemed.com
//                       </a>
//                     </p>
//                   </div>
//                 </Card.Body>
//               </Card>

//             </Col> */}
//             <Col lg={4}>
//               <Card className="shadow-sm mb-4">
//                 <Card.Body>
//                   <div className="contact-info-section">
//                     <h3 className="info-title">UK Office</h3>
//                     <p className="info-content">
//                       128 City Road
//                       <br />
//                       London, EC1V 2NX
//                     </p>
//                   </div>
//                 </Card.Body>
//               </Card>
//               <Card className="shadow-sm mb-4">
//                 <Card.Body>
//                   <div className="contact-info-section">
//                     <h3 className="info-title">Dubai Office</h3>
//                     <p className="info-content">
//                       Al Quasis,
//                       <br />
//                       Rag business hub,
//                       <br />
//                       Dubai.
//                       <br />
//                       <br />
//                       <a href="tel:+971504649918">+971 504-649-918</a>
//                     </p>
//                   </div>
//                 </Card.Body>
//               </Card>
//               <Card className="shadow-sm mb-4">
//                 <Card.Body>
//                   <div className="contact-info-section">
//                     <h3 className="info-title">USA Office</h3>
//                     <p className="info-content">
//                       Pmhs Tech Solutions Llc
//                       <br />
//                       30 N Gould St Ste 48505
//                       <br />
//                       Sheridan, WY 82801
//                       <br />
//                       <br />
//                       <a href="tel:+13073104473">+1 307-310-4473</a>
//                     </p>
//                   </div>
//                 </Card.Body>
//               </Card>
//               <Card className="shadow-sm mb-4">
//                 <Card.Body>
//                   <div className="contact-info-section">
//                     <h3 className="info-title">Email</h3>
//                     <p className="info-content">
//                       <a href="mailto:drshan@pmhstechsolutions.com">
//                         drshan@pmhstechsolutions.com
//                       </a>
//                     </p>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//             {/* Map Section */}
//             {/* <Card className="mt-4 map-card">
//                 <Card.Body>
//                   <h3 className="info-title">Our Location</h3>
//                   <div className="map-container">
//                     <iframe
//                       title="Office Location"
//                       width="100%"
//                       height="300"
//                       frameBorder="0"
//                       scrolling="no"
//                       marginHeight={0}
//                       marginWidth={0}
//                       src={`https://maps.google.com/maps?q=${officeLocation.lat},${officeLocation.lng}&z=15&output=embed`}
//                     />
//                   </div>
//                   <div className="text-center mt-3">
//                     <Button
//                       variant="outline"
//                       className="directions-btn"
//                       asChild
//                     >
//                       <a
//                         href={`https://www.google.com/maps/dir/?api=1&destination=${officeLocation.lat},${officeLocation.lng}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         Get Directions
//                       </a>
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card> */}
//             <Card className="mt-4 map-card">
//               <Card.Body>
//                 <h3 className="info-title">Our Location</h3>
//                 <div className="map-container">
//                   <iframe
//                     title="PMHS Health Care Physio Rehab Services Location"
//                     width="100%"
//                     height="300"
//                     frameBorder="0"
//                     scrolling="no"
//                     marginHeight={0}
//                     marginWidth={0}
//                     src="https://maps.google.com/maps?q=13.000886,77.623536&z=15&output=embed"
//                   />
//                 </div>
//                 <div className="text-center mt-3">
//                   <Button variant="outline" className="directions-btn" asChild>
//                     <a
//                       href="https://www.google.com/maps/dir/?api=1&destination=PMHS+Health+Care+Physio+Rehab+Services,+6%2F8+high+street+D+Costa+layout+wheelers+road,+6,+extension,+Bengaluru,+Karnataka+560006"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Get Directions
//                     </a>
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Row>
//         </Container>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Contact;


import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Alert } from "react-bootstrap";
import "./Contact.css";
import Header from "@/footer/Header";
import Footer from "@/footer/Footer";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });
  const api_key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eWZyamZneWRsZGpkcWVsaXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNzQxNzUsImV4cCI6MjA2Mzk1MDE3NX0.AIsRdTcohJH6VHHhpsYpFJriMN0qJ_tqd6dxHtd7o_c";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!agreed) {
//     setSubmitStatus({
//       success: false,
//       message: "Please agree to the terms and conditions",
//     });
//     return;
//   }

//   setIsSubmitting(true);
//   setSubmitStatus({ success: false, message: "" });

//   try {
//     const response = await fetch(
//       `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-us-email`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
//           "Content-Type": "application/json",
//           // Add these headers if needed:
//           apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
//         },
//         body: JSON.stringify(formData),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(
//         errorData.message || `HTTP error! status: ${response.status}`
//       );
//     }

//     const data = await response.json();

//     setSubmitStatus({
//       success: true,
//       message:
//         data.message ||
//         "Thank you for your message! We'll get back to you soon.",
//     });

//     // Reset form
//     setFormData({
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//       phone: "",
//     });
//     setAgreed(false);
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     setSubmitStatus({
//       success: false,
//       message:
//         error instanceof Error
//           ? error.message
//           : "An error occurred while sending your message",
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!agreed) {
    setSubmitStatus({
      success: false,
      message: "Please agree to the terms and conditions",
    });
    return;
  }

  setIsSubmitting(true);
  setSubmitStatus({ success: false, message: "" });

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-us-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Remove Authorization header and use only apikey
          Authorization: `Bearer ${api_key}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    setSubmitStatus({
      success: true,
      message:
        data.message ||
        "Thank you for your message! We'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
      phone: "",
    });
    setAgreed(false);
  } catch (error) {
    console.error("Error submitting form:", error);
    setSubmitStatus({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while sending your message",
    });
  } finally {
    setIsSubmitting(false);
  }
};
return (
  <div className="contact-us-page">
    <Header />

    <main className="contact-main">
      <Container>
        <Row className="justify-content-between">
          {/* Contact Form Column */}
          <Col lg={7} className="mb-5 mb-lg-0">
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h2 className="section-title">Have Any Questions For Us?</h2>
                <p className="section-subtitle">
                  Various versions have evolved over the years, sometimes by
                  accident, sometimes on purpose injected humour and the like.
                </p>

                {submitStatus.message && (
                  <Alert variant={submitStatus.success ? "success" : "danger"}>
                    {submitStatus.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Your Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Your Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="formPhone" className="mb-3">
                    <Form.Label>Your Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* <Form.Group controlId="formSubject" className="mb-3">
                      <Form.Label>Your Subject *</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        placeholder="Enter subject"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group> */}

                  <Form.Group controlId="formMessage" className="mb-3">
                    <Form.Label>Your Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={5}
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formAgreement" className="mb-4">
                    <Form.Check
                      type="checkbox"
                      label={
                        <>
                          By clicking you agree to our{" "}
                          <a
                            href="/terms-of-service"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            terms & conditions
                          </a>
                        </>
                      }
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                    />
                  </Form.Group>

                  <Button
                    className="submit-btn w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="contact-info-section">
                  <h3 className="info-title">India Office</h3>
                  <p className="info-content">
                    {/* 6/8 Wheelers Road, D Costa Layout
                    <br />
                    Cox Town, Bangalore-560005 */}
                    THEFUTUREMED Global LLC
                    <br />8 The Green Suite B, Dover, Delaware 19901
                  </p>
                  <p className="info-content">
                    <a href="tel:+91988649994">+91 988-649-9994</a>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <div className="contact-info-section">
                  <h3 className="info-title">UK Office</h3>
                  <p className="info-content">
                    128 City Road
                    <br />
                    London, EC1V 2NX
                  </p>
                </div>
              </Card.Body>
            </Card>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <div className="contact-info-section">
                  <h3 className="info-title">Dubai Office</h3>
                  <p className="info-content">
                    Al Quasis,
                    <br />
                    Rag business hub,
                    <br />
                    Dubai.
                    <br />
                    <br />
                    <a href="tel:+971504649918">+971 504-649-918</a>
                  </p>
                </div>
              </Card.Body>
            </Card>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <div className="contact-info-section">
                  <h3 className="info-title">USA Office</h3>
                  <p className="info-content">
                    Pmhs Tech Solutions Llc
                    <br />
                    30 N Gould St Ste 48505
                    <br />
                    Sheridan, WY 82801
                    <br />
                    <br />
                    <a href="tel:+13073104473">+1 307-310-4473</a>
                  </p>
                </div>
              </Card.Body>
            </Card>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <div className="contact-info-section">
                  <h3 className="info-title">Email</h3>
                  <p className="info-content">
                    <a href="mailto:drshan@pmhstechsolutions.com">
                      drshan@pmhstechsolutions.com
                    </a>
                  </p>
                  <p className="info-content">
                    <a href="mailto: support@thefuturemed.com">
                      support@thefuturemed.com
                    </a>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Card className="mt-4 map-card">
            <Card.Body>
              <h3 className="info-title">Our Location</h3>
              <div className="map-container">
                <iframe
                  title="PMHS Health Care Physio Rehab Services Location"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://maps.google.com/maps?q=13.000886,77.623536&z=15&output=embed"
                />
              </div>
              <div className="text-center mt-3">
                <Button variant="outline" className="directions-btn" asChild>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=PMHS+Health+Care+Physio+Rehab+Services,+6%2F8+high+street+D+Costa+layout+wheelers+road,+6,+extension,+Bengaluru,+Karnataka+560006"
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