
import React, { useEffect, useState } from 'react';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useSelector } from 'react-redux';
const PrivacyPolicy = () => {
    const templateList = useSelector(state => state.TemplateReducer.templateList);
    const [privacyPolicyData, setPrivacyPolicyData]= useState()
    useEffect(()=>{
        let data= templateList?.find((x)=>x?.name === "Privacy policy")
       setPrivacyPolicyData(data?.template)
    },[templateList])
    return (
        <div className='custom-header'>
            <div className='container'>
            <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(privacyPolicyData) }} />
                {/* <div className='row '>
                    <div className='text-center font-weight-bold'>
                        <h3>PRIVACY POLICY</h3>
                    </div>
                </div>
                <div className='mt-3'>
                    <p class="font-weight-bold" >INTRODUCTION</p>
                    <p>
                        Canadian Pinnacle Nutritech Inc. (“Canadian Pinnacle Nutritech“) respects and understands consumers’ concerns about the privacy of their personal information. Canadian Pinnacle Nutritech is a leading company that understands the need to treat consumers’ information in a responsible manner. This Privacy Statement explains Canadian Pinnacle Nutritech’s commitment not only to your privacy, but to you as a valued customer. To that end, we have created this Privacy Statement to explain the types of personal and non-personal information we collect through the website cpnhealth.ca. We will discuss how we use this information and to whom and under what circumstances we disclose such information.
                    </p>
                    <p className='mt-2'>
                        By using this Site, you agree, without limitation, to the practices described in this Privacy Statement and the Site’s Terms of Use. If you do not agree to the terms of this Privacy Statement or our Site’s Terms of Use, please do not visit our Site.
                    </p>
                    <p className="font-weight-bold" >INFORMATION COLLECTED</p>
                    <p className="font-weight-bold" >PERSONAL INFORMATION</p>
                    <p>
                        In general, we may collect personal information from visitors to the Site if they (1) sign up to receive newsletters; (2) contact us (including our Webmaster, customer service representatives, or other employees); (3) complete a registration form, survey, or poll; (4) participate in a sweepstakes or contest; (5) make product or service inquiries; or (6) purchase products. In connection with these activities, we may collect personal information, including, but not limited to, name, mailing address, e-mail address, telephone number, age range, birth date, gender, username, password, credit card number, and credit card expiration date. We may combine visitors’ personal information with information that we collect from other online and offline sources. This information may include, for example: (1) information we receive from visitors when they call us, redeem coupons or complete our surveys or other forms; (2) information visitors submit to us at our retail locations or special events; and (3) updated contact and other information about our visitors that we may receive from third parties.
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

                </div> */}
            </div>
            <div className='mt-2'>
                <FooterComponents></FooterComponents>
            </div>

        </div>
    )
}
export default PrivacyPolicy