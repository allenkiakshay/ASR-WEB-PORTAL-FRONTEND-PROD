import React from "react"
import styled from "styled-components";

import { CallIcon, EmailIcon, LocationIcon } from "./Icons"

const Footer = () => {
    return(
        <React.Fragment>
            <Container>
                <Leftsection>
                    <EmailId>
                        <EmailIcon />
                        &nbsp; krrishab@cse.iitb.ac.in
                    </EmailId>
                    <Phone>
                        <CallIcon />
                        &nbsp; +91 XXXXX - XXXXX
                    </Phone>
                    <Address>
                        <LocationIcon />
                        &nbsp; 4WJ8+48M, Main Gate Rd,
                        <br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp; IIT BOMBAY Area, Powai,
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp; Mumbai, Maharashtra, India
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp; Pincode: -400076
                    </Address>
                </Leftsection>
                <Centersection>
                    <h1>Tools</h1>
                    <br />
                    <ul>
                        <li>Video to multi language Text conversion</li>
                        <br />
                        <li>Translate Text from one language to other</li>
                        <br />
                        <li>Convert Text to Speech</li>
                        <br />
                        <li>Convert Video from one language to other</li>
                        <br />
                        <li>Convert Youtube video to another language</li>
                    </ul>
                </Centersection>

                <Rightsection>
                <h1>About</h1>
                    <br />
                    <ul>
                        <li>About Us</li>
                        <br />
                        <li>Tutorials</li>
                        <br />
                        <li>Terms and Conditions</li>
                        <br />
                        <li>Privacy Policy</li>
                    </ul>
                </Rightsection>

                <Bottomsection>
                        &#169; 2023 Allrights reserved
                </Bottomsection>
            </Container>
        </React.Fragment>
    )
}

export default Footer;


const Container = styled.div`
  max-width: 99%;
  height: fit-content;
  padding: 2rem;
  margin: auto;
  margin-top: 150px;
  color: var(--footer-font-color);
  background: var(--footer-bg-color);
  border: 1.5px solid black;
  user-select: none;
  display: grid;
  svg {
    height: 20px;
    width: 20px;
  }
  @media (min-width: 600px) {
    grid-template-rows: 1fr;
  }
  @media (min-width: 801px) {
    grid-template-columns: 16fr 16fr 16fr;
  }
`

const Leftsection = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 50px;
  font-size: 16px;
`

const Centersection = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 50px;
  font-size: 16px;
`

const Rightsection = styled.div`
text-align: left;
display: flex;
flex-direction: column;
padding: 50px;
font-size: 16px;
`


const Bottomsection = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  font-size: 12px;
`

const EmailId = styled.div`
  text-align: left;
  padding: 5px;
`
const Phone = styled.div`
  text-align: left;
  padding: 5px;
`

const Address = styled.div`
  text-align: left;
  padding: 5px;
`