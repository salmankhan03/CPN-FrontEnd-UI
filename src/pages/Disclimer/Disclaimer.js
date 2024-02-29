
import React, { useEffect, useState } from 'react';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useSelector } from 'react-redux';
const Disclaimer = () => {
    const templateList = useSelector(state => state.TemplateReducer.templateList);
    const [content, setContent]= useState()
    useEffect(()=>{
        let data= templateList?.find((x)=>x?.name === "DISCLAIMER")
        setContent(data?.template)
    },[templateList])
    return (
        <div className='custom-header'>
            <div className='container'>
            <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(content) }} />

                {/* <div className='row '>
                    <div className='text-center font-weight-bold'>
                        <h3>DISCLAIMER</h3>
                    </div>
                </div>
                <div className='mt-3'>
                    <p class="font-weight-bold" >DISCLAIMERS REGARDING INFORMATION AND PRODUCTS</p>
                    <p>
                        This Site contains information that Canadian Pinnacle Nutritech provides solely and exclusively for informational purposes and is not meant to substitute for the advice of your physician or other healthcare professional. We may also provide links to third party websites for informational purposes only. Canadian Pinnacle Nutritech is not responsible for, and shall not be liable for, your or any other person’s actions or decisions taken in reliance on the information contained on this Site or on third party sites. Canadian Pinnacle Nutritech does not make any representations or warranties about the information provided on this Site, nor does it recommend or endorse any specific product or service. You are ultimately responsible for making your own health-related decisions.
                    </p>
                    <p className='mt-2'>
                        Consult with a healthcare professional before using any medication or nutritional, herbal, or homeopathic product, before starting any diet, exercise or supplement program, before adopting any treatment for a health problem, or if you have or suspect you might have a health problem. Our products should not be confused with prescription medicines and should not be used as a substitute for medically-supervised therapy. Please carefully read all information provided with Our products including labeling and packaging.
                    </p>
                    <p className='mt-2'>
                        If you experience a reaction to a Canadian Pinnacle Nutritech product, or if a medical condition otherwise arises or persists, you are strongly advised to promptly see your physician or other medical professional. You should also consult with your physician or other healthcare provider regarding any potential interactions between any medication you are currently taking and nutritional supplements.
                    </p>
                    <p className='mt-2'>
                        The Information and Products on This Site May Contain Statements That Have Not Been Evaluated by Health Canada. These Products Are Not Intended to Diagnose, Treat, Cure, or Prevent Any Disease.
                    </p>            
                </div> */}
            </div>
            <div className='mt-2'>
                <FooterComponents></FooterComponents>
            </div>

        </div>
    )
}
export default Disclaimer