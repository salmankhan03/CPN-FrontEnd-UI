
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
        <div className=''>
            <div className='custom-container'>
                <div className='container mt-5'>
                    <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(privacyPolicyData) }} />
                </div>
            </div>
            <div className='mt-2'>
                <FooterComponents></FooterComponents>
            </div>

        </div>
    )
}
export default PrivacyPolicy