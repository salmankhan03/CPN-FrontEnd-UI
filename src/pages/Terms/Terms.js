
import React, { useEffect, useState } from 'react';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
const TermsAndCondition = () => {
    return (
        <div className='custom-header'>
            <div className='container'>
                <div className='row '>
                    <div className='text-center font-weight-bold'>
                        <h3>TERMS & CONDITIONS</h3>
                    </div>
                </div>
                <div className='mt-3'>
                    <p class="font-weight-bold" >TERMS OF USE</p>
                    <p>
                        Canadian Pinnacle Nutritech Inc. works hard to ensure that you have great places to research sports nutrition products and the lifestyles related to them. Canadian Pinnacle Nutritech Inc. is proud of its online efforts and is committed to maintaining the highest standards possible. This Terms of Use document allows our valued customers to feel comfortable knowing that Canadian Pinnacle Nutritech Inc. recognizes and supports the rights of responsible users.
                    </p>
                    <p className='mt-2'>
                        The website cpnhealth.ca (hereinafter, “Site”) is owned and operated by Canadian Pinnacle Nutritech Inc. (hereinafter “Canadian Pinnacle Nutritech”). This website is for your personal, non-commercial use only. The Site is not intended to offer any medical advice or opinions, either implied or explicit, and should not be used as such or as a substitute for advice from a healthcare practitioner. While the Site may offer information about cpn.ca products, consumers should always read the label before taking the purchased product and should consult a healthcare practitioner before starting any diet or exercise program.
                    </p>
                    <p className='mt-2'>
                        The material contained within the Site is intended for residents of Canada only and shall only be construed and evaluated according to Canadian law. This material is void outside Canada and where prohibited by law or regulation. Do not proceed to view this Site if you are not a legal resident of Canada.
                    </p>
                    <p className="font-weight-bold" >ACCEPTANCE OF TERMS OF USE</p>
                    <p>By using, visiting, or browsing the Site, you accept, without limitation or qualification, these Terms of Use and agree, without limitation, to the terms of our Privacy Statement. If you do not agree to these Terms of Use and Privacy Statement, please do not use our services or visit our Site. These Terms of Use constitute the entire agreement between Canadian Pinnacle Nutritech and you, and supersedes all prior or contemporaneous agreements, representations, warranties, and understandings with respect to the Site, the content, products, or services provided by or through the Site, and the subject matter of these Terms of Use.</p>
                    <p className="font-weight-bold" >CHANGES TO THE TERMS OF USE</p>
                    <p>
                        Canadian Pinnacle Nutritech reserves the right, at its discretion, to change, modify, add, or remove portions of these terms at any time. You are bound by such revisions and should therefore periodically visit this page to determine the then-current Terms of Use to which you are bound. You can review the most current version of the Terms of Use at any time by clicking on the “Terms of Use” hyperlink located at the bottom of the pages on the Site. By using the Site, you signify your acceptance of this Terms of Use. Your use of the Site after changes are made signifies your assent to be bound by the Terms of Use and Privacy Statement as they exist at that time.
                    </p>
                    <p className="font-weight-bold" >TECHNICAL INFORMATION</p>
                    <p>
                        As part of the standard operation of our Site, we may collect other information from visitors to our Site, including, but not limited to, their browser type (e.g., Netscape or Internet Explorer), operating system (e.g., Windows or Macintosh), IP address, and the domain name from which they accessed the site (e.g., lycos.com). In addition, we may collect information about visitors’ browsing behaviour, such as the dates and times they visit our Site, the areas or pages of our Site that they visit, the amount of time spent viewing our Site, the number of times the visitor returns to our Site, and other click-stream data. We may use cookies (small text files that are stored on the hard drives of visitors’ computers when they access our Site) to collect this information as well as for other purposes, including, but not limited to, recognizing prior users, retrieving information previously provided by visitors to the Site, remembering passwords of individuals, and for direction to certain areas of our Site.
                    </p>
                    <p className='mt-2'>
                        Visitors to our Site are always free to decline cookies, but in doing so, they may not be able to use certain features on our Site. The “Help” segment of the toolbar on most browsers explains how to configure a browser to not accept new cookies, how to have the browser inform users when they receive a new cookie, and how to erase cookies from their hard drives.
                    </p>
                    <p className='mt-2'>
                        We may also use Web beacons to track information about visitors after they leave the Site, to access cookies, to count page visits, as part of our e-mail campaigns, and to otherwise facilitate visitors’ online experience. In addition, we may contract with third parties that place cookies, Web beacons or other tools on our site to assist us in collecting information about our visitors.
                    </p>
                    <p className='mt-2'>
                        We may combine the technical information that we collect with the personal information that we collect about our visitors.
                    </p>
                    <p className="font-weight-bold" >USE OF IN FORMATION</p>
                    <p className='mt-2'>
                        Canadian Pinnacle Nutritech may use this personal information for the following purposes:
                    </p>
                    <ul style={{ listStyleType: 'disc' }}>
                        <li>To confirm your identity</li>
                        <li>To understand your needs</li>
                        <li>To fulfill product order requests</li>
                        <li>To respond to requests for product information</li>
                        <li>To meet any legal and regulatory requirements</li>
                        <li>To administer online contests</li>
                        <li>To fulfill other purposes consistent with these purposes</li>
                    </ul>
                    <p className='font-weight-bold'>ACCESS TO YOUR INFORMATION</p>
                    <p>Canadian Pinnacle Nutritech permits the reasonable right of access and review of your personal information held by us and will endeavour to provide the information in question within a reasonable time, generally no later than 30 days following the request.</p>
                    <p className='mt-2'>Canadian Pinnacle Nutritech reserves the right to decline to provide access to your personal information where the information requested (1) would disclose personal information, including opinions, about another individual or about a deceased individual or business confidential information of Canadian Pinnacle Nutritech or a third party; (2) would interfere with contractual or other negotiations of Canadian Pinnacle Nutritech or a third party; (3) is subject to solicitor-client, litigation or other legal privilege; (4) is not readily retrievable and the burden or cost of providing would be disproportionate to the nature or value of the information; (5) does not exist, is not held, or cannot be found by Canadian Pinnacle Nutritech; (6) may harm or interfere with law enforcement activities and other investigative or regulatory functions of a body authorized by law to perform such functions; or (7) may be withheld or is requested to be withheld under applicable legislation.</p>
                    <p className='mt-2'>Where information will not or cannot be disclosed, you will be provided with the reasons for non-disclosure. Canadian Pinnacle Nutritech will not charge you for verifying or correcting your information, however, to the extent permitted by applicable law, there may be a minimal charge imposed if you request a copy of records.</p>
                    <p className='font-weight-bold'>CONTACT US</p>
                    <p>If you have any questions about this Privacy Statement or the practices or activities associated with our Site, or if you’d like to have access to or correct your personal information in our database(s) or remove yourself from our database(s), please contact us at 200-3071 No 5 Rd Richmond, BC V6X 2T4, Canada</p>

                </div>
            </div>
            <div className='mt-2'>
                <FooterComponents></FooterComponents>
            </div>

        </div>
    )
}
export default TermsAndCondition